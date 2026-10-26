import type { IncomingMessage, ServerResponse } from "http";
import { createClient } from "@supabase/supabase-js";

interface SignupNotificationRequest extends IncomingMessage {
  body?: unknown;
}

interface SignupNotificationBody {
  userId?: unknown;
}

function getText(value: unknown, maxLength = 200) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, maxLength) : "";
}

export default async function handler(req: SignupNotificationRequest, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  const body = req.body as SignupNotificationBody | undefined;
  const userId = getText(body?.userId, 64);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "A valid signup user ID is required." }));
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.FOUNDER_TELEGRAM_CHAT_ID;
  if (!supabaseUrl || !serviceRoleKey || !telegramBotToken || !telegramChatId) {
    console.error("New customer notifications are missing server configuration.");
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Signup notifications are not configured." }));
    return;
  }

  try {
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await admin.auth.admin.getUserById(userId);
    if (error) {
      if (error.status === 404) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Signup account was not found." }));
        return;
      }
      throw error;
    }

    const user = data.user;
    const createdAt = user ? new Date(user.created_at).getTime() : Number.NaN;
    if (!user || !Number.isFinite(createdAt) || Date.now() - createdAt < 0 || Date.now() - createdAt > 15 * 60 * 1000) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "A recent signup account was not found." }));
      return;
    }

    const metadata = user.user_metadata ?? {};
    const fullName = getText(metadata.full_name);
    const businessName = getText(metadata.business_name);
    const category = getText(metadata.business_category);
    const city = getText(metadata.business_city);
    const phone = getText(metadata.phone, 24);
    const email = getText(user.email, 254);
    if (
      !fullName ||
      !businessName ||
      !category ||
      !city ||
      !/^[+()\d .-]{7,24}$/.test(phone) ||
      phone.replace(/\D/g, "").length < 7 ||
      !email
    ) {
      res.statusCode = 422;
      res.end(JSON.stringify({ error: "The signup is missing required business details." }));
      return;
    }

    if (user.app_metadata.telegram_new_customer_notified_at) {
      res.statusCode = 200;
      res.end(JSON.stringify({ notified: true, duplicate: true }));
      return;
    }

    const isMobileAuth =
      user.email?.endsWith("@mobile.zentap.in") || metadata.registration_method === "mobile";
    const plan = getText(metadata.selected_plan, 80) || "Not selected";
    const emailStatus = isMobileAuth
      ? "✅ Mobile Verified (Instant Access)"
      : user.email_confirmed_at
        ? "Confirmed"
        : "Confirmation pending";

    const message = [
      "🚀 *New Zentap Merchant Registration*",
      `👤 *Name:* ${fullName}`,
      `🏬 *Business:* ${businessName}`,
      `🏷️ *Category:* ${category}`,
      `📍 *City:* ${city}`,
      `📱 *Mobile / WhatsApp:* \`${phone}\``,
      `🔑 *Auth Identifier:* \`${email}\``,
      `💳 *Plan:* ${plan}`,
      `⚡ *Status:* ${emailStatus}`,
    ].join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    const telegramResult = (await telegramResponse.json()) as { ok?: boolean };
    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error("Telegram rejected a new customer notification:", telegramResponse.status);
      res.statusCode = 502;
      res.end(JSON.stringify({ error: "Telegram could not deliver the signup notification." }));
      return;
    }

    // Auto-confirm mobile registrations so merchants can sign in immediately with mobile number
    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      ...(isMobileAuth ? { email_confirm: true } : {}),
      app_metadata: {
        ...user.app_metadata,
        telegram_new_customer_notified_at: new Date().toISOString(),
      },
    });
    if (updateError) {
      console.error("Signup notification was sent, but update marker could not be saved.");
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ notified: true, mobileVerified: isMobileAuth }));
  } catch (error) {
    console.error(
      "Failed to send new customer notification:",
      error instanceof Error ? error.name : "Unknown error",
    );
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Could not send the signup notification." }));
  }
}

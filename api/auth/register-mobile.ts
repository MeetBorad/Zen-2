import type { IncomingMessage, ServerResponse } from "http";
import { createClient } from "@supabase/supabase-js";

interface RegisterRequest extends IncomingMessage {
  body?: any;
}

export default async function handler(req: RegisterRequest, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  let payload: any = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = {};
    }
  } else if (!payload) {
    let rawBody = "";
    for await (const chunk of req) {
      rawBody += chunk;
    }
    try {
      payload = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      payload = {};
    }
  }

  const {
    phone,
    password,
    name,
    businessName,
    businessCategory,
    businessCity,
    reportEmail,
    plan,
  } = payload;

  const cleanDigits = String(phone || "").replace(/\D/g, "");
  if (cleanDigits.length < 10) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Please provide a valid 10-digit mobile number." }));
    return;
  }

  if (!password || password.length < 6) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Password must be at least 6 characters." }));
    return;
  }

  const last10 = cleanDigits.slice(-10);
  const authEmail = `${last10}@mobile.zentap.in`;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.FOUNDER_TELEGRAM_CHAT_ID;

  if (!supabaseUrl || !serviceRoleKey) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Server authentication is not configured." }));
    return;
  }

  try {
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Check if user already exists with this mobile email
    const { data: existingUsers } = await admin.auth.admin.listUsers({ perPage: 100 });
    const userAlreadyExists = existingUsers?.users?.find(
      (u) =>
        u.email?.toLowerCase() === authEmail.toLowerCase() ||
        String(u.user_metadata?.phone || "").replace(/\D/g, "").endsWith(last10)
    );

    if (userAlreadyExists) {
      // User exists. Update password and confirm if requested
      const { error: updateError } = await admin.auth.admin.updateUserById(
        userAlreadyExists.id,
        {
          password,
          email_confirm: true,
          user_metadata: {
            ...userAlreadyExists.user_metadata,
            full_name: name || userAlreadyExists.user_metadata?.full_name,
            business_name: businessName || userAlreadyExists.user_metadata?.business_name,
            business_category: businessCategory || userAlreadyExists.user_metadata?.business_category,
            business_city: businessCity || userAlreadyExists.user_metadata?.business_city,
            phone: `+91 ${last10}`,
            report_email: reportEmail || userAlreadyExists.user_metadata?.report_email,
            registration_method: "mobile",
          },
        }
      );

      if (updateError) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: updateError.message }));
        return;
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, authEmail, updated: true }));
      return;
    }

    // Create brand new pre-confirmed mobile user
    const { data: newUser, error: createError } = await admin.auth.admin.createUser({
      email: authEmail,
      password,
      email_confirm: true, // AUTO-CONFIRMED!
      user_metadata: {
        full_name: name,
        business_name: businessName,
        business_category: businessCategory,
        business_city: businessCity,
        phone: `+91 ${last10}`,
        report_email: reportEmail || null,
        registration_method: "mobile",
        selected_plan: plan || "Growth ₹2,999",
      },
    });

    if (createError) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: createError.message }));
      return;
    }

    // Send Telegram Notification to Founder
    if (telegramBotToken && telegramChatId) {
      try {
        const message = [
          "🚀 *New Zentap Merchant Registration*",
          `👤 *Name:* ${name || "Merchant"}`,
          `🏬 *Business:* ${businessName || "New Business"}`,
          `🏷️ *Category:* ${businessCategory || "General"}`,
          `📍 *City:* ${businessCity || "Gujarat"}`,
          `📱 *Mobile / WhatsApp:* \`+91 ${last10}\``,
          `🔑 *Auth ID:* \`${authEmail}\``,
          `💳 *Plan:* ${plan || "Growth ₹2,999"}`,
          `⚡ *Status:* ✅ Mobile Verified (Instant Access)`,
        ].join("\n");

        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: "Markdown",
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(8_000),
        });
      } catch (tgErr) {
        console.error("Telegram notification error:", tgErr);
      }
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, authEmail, userId: newUser.user?.id }));
  } catch (err: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message || "Registration failed." }));
  }
}

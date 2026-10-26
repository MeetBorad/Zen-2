import type { IncomingMessage, ServerResponse } from "http";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const config = { api: { bodyParser: false } };

interface RazorpayWebhookEvent {
  event?: string;
  payload?: {
    subscription?: {
      entity?: {
        id?: string;
      };
    };
  };
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  if (!webhookSecret) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Razorpay webhook verification is not configured." }));
    return;
  }
  if (typeof signature !== "string" || !/^[a-f\d]{64}$/i.test(signature)) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "Missing or invalid webhook signature." }));
    return;
  }

  let rawBody = "";
  for await (const chunk of req) {
    rawBody += chunk;
  }

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest();
  const receivedSignature = Buffer.from(signature, "hex");
  if (!crypto.timingSafeEqual(expectedSignature, receivedSignature)) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid signature" }));
    return;
  }

  let eventData: RazorpayWebhookEvent;
  try {
    eventData = JSON.parse(rawBody || "{}");
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Malformed payload." }));
    return;
  }

  try {
    const { event, payload } = eventData;
    console.log(`[Razorpay Webhook Received] Event: ${event}`);

    switch (event) {
      case "subscription.activated":
      case "subscription.charged": {
        const sub = payload?.subscription?.entity;
        console.log(`✅ Subscription ${sub?.id} paid. Merchant features enabled.`);
        await updateSubscription(sub?.id, {
          status: "active",
          last_payment_status: event === "subscription.charged" ? "paid" : "authorized",
        });
        break;
      }

      case "payment.failed":
      case "subscription.halted": {
        const sub = payload?.subscription?.entity;
        console.warn(`⚠️ Subscription ${sub?.id} payment failed. Auto-reply paused.`);
        await updateSubscription(sub?.id, {
          status: "halted",
          last_payment_status: "failed",
        });
        break;
      }

      case "subscription.cancelled": {
        const sub = payload?.subscription?.entity;
        console.log(`❌ Subscription ${sub?.id} cancelled by merchant.`);
        await updateSubscription(sub?.id, {
          status: "cancelled",
          last_payment_status: "cancelled",
        });
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "success", received: event }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Webhook could not be processed." }));
    console.error("Razorpay webhook processing failed:", err);
  }
}

async function updateSubscription(
  razorpaySubscriptionId: string | undefined,
  update: { status: "active" | "halted" | "cancelled"; last_payment_status: string },
) {
  if (!razorpaySubscriptionId) return;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase service credentials are not configured for Razorpay webhooks.");
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await adminClient
    .from("subscriptions")
    .update(update)
    .eq("razorpay_subscription_id", razorpaySubscriptionId)
    .select("id")
    .maybeSingle();
  if (error) throw error;
  if (!data) console.warn(`No local subscription found for Razorpay ID ${razorpaySubscriptionId}.`);
}

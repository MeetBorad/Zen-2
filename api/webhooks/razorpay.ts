import type { IncomingMessage, ServerResponse } from "http";
import crypto from "crypto";

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"] as string;

  let rawBody = "";
  for await (const chunk of req) {
    rawBody += chunk;
  }

  // 1. Verify Webhook Signature if secret configured
  if (webhookSecret && signature) {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid signature" }));
      return;
    }
  }

  try {
    const eventData = JSON.parse(rawBody || "{}");
    const event = eventData.event;
    const payload = eventData.payload;

    console.log(`[Razorpay Webhook Received] Event: ${event}`);

    switch (event) {
      case "subscription.activated":
      case "subscription.charged": {
        const sub = payload?.subscription?.entity;
        console.log(`✅ Subscription ${sub?.id} paid. Merchant features enabled.`);
        // Here you update Supabase: status = 'active'
        break;
      }

      case "payment.failed":
      case "subscription.halted": {
        const sub = payload?.subscription?.entity;
        console.warn(`⚠️ Subscription ${sub?.id} payment failed. Auto-reply paused.`);
        // Here you update Supabase: status = 'halted'
        break;
      }

      case "subscription.cancelled": {
        const sub = payload?.subscription?.entity;
        console.log(`❌ Subscription ${sub?.id} cancelled by merchant.`);
        // Here you update Supabase: status = 'cancelled'
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "success", received: event }));
  } catch (err: any) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Malformed payload", message: err.message }));
  }
}

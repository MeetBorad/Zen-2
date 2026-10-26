import type { IncomingMessage, ServerResponse } from "http";
import { createClient } from "@supabase/supabase-js";

interface CancelRequest extends IncomingMessage {
  body?: unknown;
}

interface CancelBody {
  subscriptionId?: unknown;
}

export default async function handler(req: CancelRequest, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  const authorization = req.headers.authorization;
  const accessToken = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!accessToken) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "Staff sign-in is required." }));
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!supabaseUrl || !anonKey || !serviceRoleKey || !razorpayKeyId || !razorpayKeySecret) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Subscription management is not configured on the server." }));
    return;
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: authData, error: authError } = await authClient.auth.getUser(accessToken);
  if (authError || !authData.user) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "Your staff session is invalid or expired. Sign in again." }));
    return;
  }
  if (authData.user.app_metadata.role !== "staff") {
    res.statusCode = 403;
    res.end(JSON.stringify({ error: "Staff authorization is required." }));
    return;
  }

  const body = req.body as CancelBody | undefined;
  if (typeof body?.subscriptionId !== "string" || !body.subscriptionId.trim()) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "A subscription ID is required." }));
    return;
  }

  try {
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: subscription, error: queryError } = await adminClient
      .from("subscriptions")
      .select("razorpay_subscription_id, status")
      .eq("id", body.subscriptionId.trim())
      .maybeSingle();
    if (queryError) throw queryError;
    if (!subscription) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Subscription not found." }));
      return;
    }
    if (!subscription.razorpay_subscription_id) {
      res.statusCode = 409;
      res.end(JSON.stringify({ error: "This record has no Razorpay subscription ID." }));
      return;
    }
    if (subscription.status === "cancelled") {
      res.statusCode = 409;
      res.end(JSON.stringify({ error: "This subscription is already cancelled." }));
      return;
    }

    const razorpayResponse = await fetch(
      `https://api.razorpay.com/v1/subscriptions/${encodeURIComponent(subscription.razorpay_subscription_id)}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cancel_at_cycle_end: true }),
      },
    );
    const razorpayResult = (await razorpayResponse.json()) as {
      error?: { description?: string };
    };
    if (!razorpayResponse.ok) {
      res.statusCode = 502;
      res.end(
        JSON.stringify({
          error: razorpayResult.error?.description ?? "Razorpay could not schedule the cancellation.",
        }),
      );
      return;
    }

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Cancellation scheduled. The subscription status will update after Razorpay confirms it.",
      }),
    );
  } catch (error) {
    console.error("Failed to schedule subscription cancellation:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Could not schedule subscription cancellation." }));
  }
}

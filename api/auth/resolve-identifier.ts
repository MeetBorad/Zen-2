import type { IncomingMessage, ServerResponse } from "http";
import { createClient } from "@supabase/supabase-js";

interface ResolveRequest extends IncomingMessage {
  body?: unknown;
}

export default async function handler(req: ResolveRequest, res: ServerResponse) {
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

  let rawBody = "";
  for await (const chunk of req) {
    rawBody += chunk;
  }

  let identifier = "";
  try {
    const parsed = rawBody ? JSON.parse(rawBody) : req.body;
    identifier = String(parsed?.identifier || "").trim();
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid JSON body." }));
    return;
  }

  if (!identifier) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Identifier is required." }));
    return;
  }

  // 1. If it's already an email, return as-is
  if (identifier.includes("@")) {
    res.statusCode = 200;
    res.end(JSON.stringify({ authEmail: identifier.toLowerCase() }));
    return;
  }

  // 2. Clean phone number
  const cleanDigits = identifier.replace(/\D/g, "");
  if (cleanDigits.length < 10) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Please enter a valid 10-digit mobile number." }));
    return;
  }
  const last10 = cleanDigits.slice(-10);
  const defaultMobileEmail = `${last10}@mobile.zentap.in`;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    // If service role not configured, fallback to mobile domain
    res.statusCode = 200;
    res.end(JSON.stringify({ authEmail: defaultMobileEmail }));
    return;
  }

  try {
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await admin.auth.admin.listUsers({ perPage: 100 });
    if (error || !data?.users) {
      res.statusCode = 200;
      res.end(JSON.stringify({ authEmail: defaultMobileEmail }));
      return;
    }

    // A: Look for user with exact ${last10}@mobile.zentap.in
    const directMobileUser = data.users.find(
      (u) => u.email?.toLowerCase() === defaultMobileEmail.toLowerCase()
    );
    if (directMobileUser && directMobileUser.email) {
      res.statusCode = 200;
      res.end(JSON.stringify({ authEmail: directMobileUser.email }));
      return;
    }

    // B: Look for user whose metadata.phone contains last10
    const matchedByPhone = data.users.find((u) => {
      const uPhone = String(u.user_metadata?.phone || "").replace(/\D/g, "");
      return uPhone.endsWith(last10);
    });

    if (matchedByPhone && matchedByPhone.email) {
      res.statusCode = 200;
      res.end(JSON.stringify({ authEmail: matchedByPhone.email }));
      return;
    }

    // C: Default fallback
    res.statusCode = 200;
    res.end(JSON.stringify({ authEmail: defaultMobileEmail }));
  } catch (err) {
    res.statusCode = 200;
    res.end(JSON.stringify({ authEmail: defaultMobileEmail }));
  }
}

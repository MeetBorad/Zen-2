-- ==============================================================================
-- ZENTAP SAAS DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. MERCHANTS (Tenants)
CREATE TABLE IF NOT EXISTS merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,                       -- e.g. "virat-gold" -> zentap.in/r/virat-gold
  name TEXT NOT NULL,                              -- e.g. "Virat Gold Palace"
  category TEXT NOT NULL,                          -- e.g. "Jewellery Showroom"
  city TEXT NOT NULL,                              -- e.g. "Ahmedabad (Nikol)"
  phone TEXT NOT NULL,                             -- WhatsApp alert phone number
  email TEXT,
  google_place_id TEXT,                            -- e.g. "ChIJsb1wW-SGXjkRe7qGdU1713c"
  google_review_url TEXT NOT NULL,                 -- Direct Google review dialog link
  auto_reply_mode TEXT DEFAULT 'mode_b',           -- 'draft_only', 'mode_b' (auto 4-5★), 'full_auto'
  plan TEXT DEFAULT 'Growth ₹2,999',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. GOOGLE CREDENTIALS (Encrypted OAuth Tokens)
CREATE TABLE IF NOT EXISTS google_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  refresh_token_encrypted TEXT NOT NULL,
  access_token TEXT,
  token_expires_at TIMESTAMPTZ,
  account_id TEXT,
  location_id TEXT,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. REVIEWS STREAM
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  google_review_id TEXT UNIQUE,
  author_name TEXT NOT NULL,
  author_photo_url TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_language TEXT DEFAULT 'en',               -- 'en', 'gu', 'hi'
  review_timestamp TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. REPLIES ENGINE
CREATE TABLE IF NOT EXISTS replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  ai_draft_text TEXT NOT NULL,
  final_reply_text TEXT,
  reply_mode_used TEXT,
  status TEXT DEFAULT 'pending',                   -- 'pending', 'approved', 'posted_to_google', 'rejected'
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. STANDEES & SCANS (Hardware Tracking)
CREATE TABLE IF NOT EXISTS standees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  serial_number TEXT UNIQUE,
  size TEXT DEFAULT 'A6 Acrylic',
  nfc_chip_type TEXT DEFAULT 'NTAG213',
  shipping_address TEXT,
  courier_name TEXT,                               -- e.g. "BlueDart Express"
  tracking_number TEXT,
  delivery_status TEXT DEFAULT 'ordered',          -- 'ordered', 'in_production', 'dispatched', 'delivered'
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS standee_scans (
  id BIGSERIAL PRIMARY KEY,
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  channel TEXT DEFAULT 'qr',                       -- 'qr' or 'nfc'
  device_os TEXT,                                  -- 'android', 'ios', 'other'
  scanned_at TIMESTAMPTZ DEFAULT now()
);

-- 6. RAZORPAY SUBSCRIPTIONS & BILLING
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_customer_id TEXT,
  plan_amount_inr INT DEFAULT 2999,
  billing_frequency TEXT DEFAULT 'monthly',
  status TEXT DEFAULT 'trial',                     -- 'trial', 'active', 'halted', 'cancelled'
  trial_ends_at TIMESTAMPTZ DEFAULT (now() + interval '14 days'),
  next_billing_at TIMESTAMPTZ,
  last_payment_status TEXT DEFAULT 'authorized',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. PRIVATE FEEDBACKS (Anti-Gating Compliant Loop)
CREATE TABLE IF NOT EXISTS private_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 3),
  customer_name TEXT,
  customer_phone TEXT,
  feedback_text TEXT NOT NULL,
  status TEXT DEFAULT 'unread',                    -- 'unread', 'in_progress', 'resolved'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE standees ENABLE ROW LEVEL SECURITY;
ALTER TABLE standee_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_feedbacks ENABLE ROW LEVEL SECURITY;

-- Public review pages only need these public fields. Keep private merchant
-- data available to staff only.
DROP POLICY IF EXISTS "Public can view merchant details by slug" ON merchants;
DROP POLICY IF EXISTS "Anonymous can view public merchant details" ON merchants;
CREATE POLICY "Anonymous can view public merchant details"
  ON merchants FOR SELECT TO anon
  USING (true);

REVOKE SELECT ON TABLE public.merchants FROM anon, PUBLIC;
GRANT SELECT (slug, name, category, city, google_review_url, is_active)
  ON TABLE public.merchants TO anon;
GRANT SELECT, UPDATE ON TABLE public.merchants TO authenticated;

DROP POLICY IF EXISTS "Staff can manage merchants" ON merchants;
CREATE POLICY "Staff can manage merchants"
  ON merchants FOR ALL TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'staff')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'staff');

REVOKE ALL ON TABLE public.subscriptions FROM anon, PUBLIC;
GRANT SELECT ON TABLE public.subscriptions TO authenticated;
DROP POLICY IF EXISTS "Staff can view subscriptions" ON subscriptions;
CREATE POLICY "Staff can view subscriptions"
  ON subscriptions FOR SELECT TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'staff');

-- Allow public to record standee scans
DROP POLICY IF EXISTS "Public can log scans" ON standee_scans;
CREATE POLICY "Public can log scans"
  ON standee_scans FOR INSERT TO anon
  WITH CHECK (true);

-- Allow public to submit private feedback
DROP POLICY IF EXISTS "Public can submit private feedback" ON private_feedbacks;
CREATE POLICY "Public can submit private feedback"
  ON private_feedbacks FOR INSERT TO anon
  WITH CHECK (true);

-- ==============================================================================
-- SEED DATA: ANCHOR CLIENT (Virat Gold Palace, Nikol)
-- ==============================================================================
INSERT INTO merchants (slug, name, category, city, phone, google_place_id, google_review_url, auto_reply_mode, plan)
VALUES (
  'virat-gold',
  'Virat Gold Palace',
  'Jewellery Showroom',
  'Ahmedabad (Nikol)',
  '+91 8788416911',
  'ChIJsb1wW-SGXjkRe7qGdU1713c',
  'https://www.google.com/search?q=virat+jewellers+nikol#lrd=0x395e86e45b70bdb3:0x77d77b4d7586ba7b,3,,,,',
  'mode_b',
  'Growth ₹2,999'
) ON CONFLICT (slug) DO NOTHING;

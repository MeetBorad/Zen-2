export interface Merchant {
  id: string
  slug: string
  name: string
  category: string
  city: string
  phone: string
  email: string | null
  google_place_id: string | null
  google_review_url: string
  auto_reply_mode: 'draft_only' | 'mode_b' | 'full_auto'
  plan: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GoogleCredentials {
  id: string
  merchant_id: string
  refresh_token_encrypted: string
  access_token: string | null
  token_expires_at: string | null
  account_id: string | null
  location_id: string | null
  last_synced_at: string | null
  created_at: string
}

export interface Review {
  id: string
  merchant_id: string
  google_review_id: string
  author_name: string
  author_photo_url: string | null
  rating: number
  review_text: string | null
  review_language: 'en' | 'gu' | 'hi'
  review_timestamp: string | null
  created_at: string
}

export interface Reply {
  id: string
  review_id: string
  ai_draft_text: string
  final_reply_text: string | null
  reply_mode_used: string | null
  status: 'pending' | 'approved' | 'posted_to_google' | 'rejected'
  posted_at: string | null
  created_at: string
}

export interface Standee {
  id: string
  merchant_id: string
  serial_number: string | null
  size: string
  nfc_chip_type: string
  shipping_address: string | null
  courier_name: string | null
  tracking_number: string | null
  delivery_status: 'ordered' | 'in_production' | 'dispatched' | 'delivered'
  delivered_at: string | null
  created_at: string
}

export interface StandeeScan {
  id: number
  merchant_id: string
  channel: 'qr' | 'nfc'
  device_os: 'android' | 'ios' | 'other' | null
  scanned_at: string
}

export interface Subscription {
  id: string
  merchant_id: string
  razorpay_subscription_id: string | null
  razorpay_customer_id: string | null
  plan_amount_inr: number
  billing_frequency: string
  status: 'trial' | 'active' | 'halted' | 'cancelled'
  trial_ends_at: string | null
  next_billing_at: string | null
  last_payment_status: string
  created_at: string
}

export interface PrivateFeedback {
  id: string
  merchant_id: string
  rating: number
  customer_name: string | null
  customer_phone: string | null
  feedback_text: string
  status: 'unread' | 'in_progress' | 'resolved'
  created_at: string
}

export type Tables = {
  merchants: Merchant
  google_credentials: GoogleCredentials
  reviews: Review
  replies: Reply
  standees: Standee
  standee_scans: StandeeScan
  subscriptions: Subscription
  private_feedbacks: PrivateFeedback
}
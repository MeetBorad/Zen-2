/* ------------------------------------------------------------------ *
 *  Zentap Founder Command Center — illustrative prototype data.
 *  Every figure here is a placeholder. None of it is live business data.
 * ------------------------------------------------------------------ */

export type Severity = "critical" | "high" | "medium" | "low";
export type Stage = "artwork" | "ack" | "production" | "dispatch" | "tracking" | "delivered";

export const money = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

export type WorkspaceId =
  | "customers"
  | "revenue"
  | "reviews"
  | "scans"
  | "orders"
  | "health"
  | "pipeline"
  | "tasks";

export const WORKSPACES: { id: WorkspaceId; label: string; short: string; blurb: string }[] = [
  { id: "customers", label: "Customers", short: "Customers", blurb: "Every merchant, one record" },
  { id: "revenue", label: "Revenue & Billing", short: "Revenue", blurb: "MRR, trials, failed payments" },
  { id: "reviews", label: "Reviews & AI", short: "Reviews", blurb: "Google + AI reply engine" },
  { id: "scans", label: "Scans & Standee", short: "Scans", blurb: "NFC / QR engagement" },
  { id: "orders", label: "Orders & Delivery", short: "Orders", blurb: "Print fulfilment tracking" },
  { id: "health", label: "System Health", short: "Health", blurb: "Errors before customers feel them" },
  { id: "pipeline", label: "Sales Pipeline", short: "Pipeline", blurb: "Lead → trial → paid" },
  { id: "tasks", label: "Tasks & Alerts", short: "Tasks", blurb: "Your daily action centre" },
];

export type CustomerRow = {
  business: string;
  category: string;
  city: string;
  merchantId: string;
  plan: "Pilot" | "Growth ₹2,999" | "Scale ₹7,499";
  trial: string;
  google: "connected" | "pending" | "expired";
  standee: "delivered" | "in production" | "not ordered";
  scans: number;
  reviews: number;
  lastActivity: string;
  risk?: "onboarding stalled" | "payment due" | "standee idle";
};

export const CUSTOMERS: CustomerRow[] = [
  {
    business: "Virat Gold Palace",
    category: "Jewellery Showroom",
    city: "Ahmedabad (Nikol)",
    merchantId: "zt_vgp_001",
    plan: "Growth ₹2,999",
    trial: "Converted",
    google: "connected",
    standee: "delivered",
    scans: 48,
    reviews: 34,
    lastActivity: "Just now",
  },
  {
    business: "Aditi's Bake Studio",
    category: "Bakery",
    city: "Pune",
    merchantId: "zt_abs_4821",
    plan: "Growth ₹2,999",
    trial: "Converted",
    google: "connected",
    standee: "delivered",
    scans: 412,
    reviews: 38,
    lastActivity: "6 min ago",
  },
  {
    business: "Nirvana Salon & Spa",
    category: "Salon",
    city: "Bengaluru",
    merchantId: "zt_nss_1907",
    plan: "Growth ₹2,999",
    trial: "Day 11 of 14",
    google: "connected",
    standee: "in production",
    scans: 186,
    reviews: 21,
    lastActivity: "42 min ago",
    risk: "payment due",
  },
  {
    business: "Iron Works Fitness",
    category: "Gym",
    city: "Hyderabad",
    merchantId: "zt_iwf_7734",
    plan: "Scale ₹7,499",
    trial: "Converted",
    google: "connected",
    standee: "delivered",
    scans: 903,
    reviews: 74,
    lastActivity: "1 hr ago",
  },
  {
    business: "Cafe Koramangala Co.",
    category: "Café",
    city: "Bengaluru",
    merchantId: "zt_ckc_2255",
    plan: "Pilot",
    trial: "Day 3 of 14",
    google: "pending",
    standee: "not ordered",
    scans: 12,
    reviews: 0,
    lastActivity: "Yesterday",
    risk: "onboarding stalled",
  },
  {
    business: "Dr. Rao Dental Care",
    category: "Clinic",
    city: "Chennai",
    merchantId: "zt_rdc_6612",
    plan: "Growth ₹2,999",
    trial: "Converted",
    google: "connected",
    standee: "delivered",
    scans: 268,
    reviews: 33,
    lastActivity: "2 hrs ago",
  },
  {
    business: "Sharma Electricals",
    category: "Retail",
    city: "Jaipur",
    merchantId: "zt_shm_3310",
    plan: "Pilot",
    trial: "Day 12 of 14",
    google: "connected",
    standee: "in production",
    scans: 41,
    reviews: 6,
    lastActivity: "4 hrs ago",
    risk: "standee idle",
  },
  {
    business: "Le Petit Patisserie",
    category: "Bakery",
    city: "Mumbai",
    merchantId: "zt_lpp_8842",
    plan: "Growth ₹2,999",
    trial: "Converted",
    google: "expired",
    standee: "delivered",
    scans: 517,
    reviews: 46,
    lastActivity: "5 hrs ago",
    risk: "payment due",
  },
  {
    business: "Urban Click Studio",
    category: "Photography",
    city: "Delhi NCR",
    merchantId: "zt_ucs_9904",
    plan: "Pilot",
    trial: "Day 6 of 14",
    google: "connected",
    standee: "not ordered",
    scans: 74,
    reviews: 9,
    lastActivity: "Today, 9:10 AM",
  },
];

export type ReviewItem = {
  business: string;
  author: string;
  stars: number;
  status: "published" | "awaiting approval" | "draft" | "failed" | "private feedback";
  channel: "AI reply" | "Founder reply" | "Private";
  text: string;
  ago: string;
};

export const REVIEWS: ReviewItem[] = [
  {
    business: "Virat Gold Palace",
    author: "Ramesh Patel",
    stars: 5,
    status: "published",
    channel: "AI reply",
    text: "વિરાટ ગોલ્ડ પેલેસ નિકોલ ખાતે ખૂબ જ સરસ અનુભવ રહ્યો. ૯૧૬ હોલમાર્ક દાગીના અને સ્ટાફનું વર્તન ઉત્તમ છે.",
    ago: "8 min ago",
  },
  {
    business: "Virat Gold Palace",
    author: "Pooja Shah",
    stars: 5,
    status: "published",
    channel: "AI reply",
    text: "Bought wedding antique jewelry. Best designs in Nikol and very transparent billing and making charges!",
    ago: "25 min ago",
  },
  {
    business: "Virat Gold Palace",
    author: "Bhavik Soni",
    stars: 4,
    status: "awaiting approval",
    channel: "AI reply",
    text: "Great showroom and courteous staff. Delivery of customized ring took 2 extra days but finish was immaculate.",
    ago: "1 hr ago",
  },
  {
    business: "Iron Works Fitness",
    author: "Karthik R.",
    stars: 5,
    status: "published",
    channel: "AI reply",
    text: "Best trainers in the area. Equipment is always clean and the staff remembers your name.",
    ago: "12 min ago",
  },
  {
    business: "Aditi's Bake Studio",
    author: "Meghna S.",
    stars: 5,
    status: "published",
    channel: "AI reply",
    text: "Ordered a birthday cake last minute and it was perfect. Thank you Aditi!",
    ago: "38 min ago",
  },
  {
    business: "Dr. Rao Dental Care",
    author: "Suresh P.",
    stars: 4,
    status: "awaiting approval",
    channel: "AI reply",
    text: "Painless root canal, though the waiting time was a bit long on Saturday.",
    ago: "1 hr ago",
  },
  {
    business: "Nirvana Salon & Spa",
    author: "Anonymous customer",
    stars: 2,
    status: "private feedback",
    channel: "Private",
    text: "Appointment started 25 minutes late and no one informed me at the front desk.",
    ago: "2 hrs ago",
  },
  {
    business: "Le Petit Patisserie",
    author: "Aline D.",
    stars: 5,
    status: "draft",
    channel: "AI reply",
    text: "The croissants taste like Paris. My weekend ritual now.",
    ago: "3 hrs ago",
  },
  {
    business: "Urban Click Studio",
    author: "Rohit V.",
    stars: 5,
    status: "failed",
    channel: "AI reply",
    text: "Professional team, delivered our brand shoot two days early.",
    ago: "4 hrs ago",
  },
];

export type AlertItem = {
  title: string;
  customer: string;
  severity: Severity;
  detail: string;
  ago: string;
  resolved: boolean;
};

export const ALERTS: AlertItem[] = [
  {
    title: "Razorpay webhook signature rejected",
    customer: "3 subscriptions",
    severity: "critical",
    detail: "4 webhook events returned 401. Renewals for Apr may not be marked paid.",
    ago: "8 min ago",
    resolved: false,
  },
  {
    title: "Google Business Profile token expired",
    customer: "Le Petit Patisserie",
    severity: "high",
    detail: "OAuth refresh failed (invalid_grant). AI replies are queued, not publishing.",
    ago: "32 min ago",
    resolved: false,
  },
  {
    title: "AI reply job failed after 3 retries",
    customer: "Urban Click Studio",
    severity: "medium",
    detail: "Model timeout at reply generation. Review moved to manual approval queue.",
    ago: "1 hr ago",
    resolved: false,
  },
  {
    title: "Print partner did not acknowledge order",
    customer: "Sharma Electricals",
    severity: "medium",
    detail: "A6 artwork created 26 hrs ago, no printer acknowledgement received.",
    ago: "2 hrs ago",
    resolved: false,
  },
  {
    title: "Broken redirect on /review/zt_ckc_2255",
    customer: "Cafe Koramangala Co.",
    severity: "high",
    detail: "Landing route returned 404 for 14 QR scans before auto-recovery.",
    ago: "5 hrs ago",
    resolved: true,
  },
  {
    title: "Nightly database vacuum completed",
    customer: "Platform",
    severity: "low",
    detail: "Row-level security policies verified across 42 merchant schemas.",
    ago: "9 hrs ago",
    resolved: true,
  },
];

export type OrderRow = {
  business: string;
  stage: Stage;
  qty: number;
  courier: string;
  eta: string;
};

export const ORDERS: OrderRow[] = [
  { business: "Virat Gold Palace", stage: "delivered", qty: 2, courier: "BlueDart Express", eta: "Delivered to Nikol Showroom" },
  { business: "Aditi's Bake Studio", stage: "delivered", qty: 4, courier: "BlueDart", eta: "Delivered Apr 8" },
  { business: "Nirvana Salon & Spa", stage: "dispatch", qty: 6, courier: "Delhivery", eta: "ETA Apr 12" },
  { business: "Iron Works Fitness", stage: "production", qty: 10, courier: "—", eta: "ETA Apr 14" },
  { business: "Sharma Electricals", stage: "ack", qty: 3, courier: "—", eta: "Awaiting printer" },
  { business: "Urban Click Studio", stage: "artwork", qty: 2, courier: "—", eta: "Artwork queued" },
  { business: "Dr. Rao Dental Care", stage: "tracking", qty: 5, courier: "Shadowfax", eta: "Out for delivery" },
];

export const STAGES: { id: Stage; label: string }[] = [
  { id: "artwork", label: "Artwork created" },
  { id: "ack", label: "Printer ack" },
  { id: "production", label: "In production" },
  { id: "dispatch", label: "Dispatched" },
  { id: "tracking", label: "In transit" },
  { id: "delivered", label: "Delivered" },
];

export type Lead = {
  name: string;
  category: string;
  value: number;
  stage: "new" | "demo" | "trial" | "paid";
  owner: string;
};

export const LEADS: Lead[] = [
  { name: "Glow Aesthetics Clinic", category: "Clinic", value: 2999, stage: "new", owner: "Inbound · IG" },
  { name: "Masala Junction", category: "Restaurant", value: 2999, stage: "new", owner: "Cold outreach" },
  { name: "FitZone Arena", category: "Gym", value: 7499, stage: "demo", owner: "Referral" },
  { name: "Bloom Florists", category: "Retail", value: 2999, stage: "demo", owner: "WhatsApp" },
  { name: "Zen Dental Studio", category: "Clinic", value: 2999, stage: "trial", owner: "Inbound · Google" },
  { name: "The Loft Cowork", category: "Coworking", value: 7499, stage: "trial", owner: "Event booth" },
  { name: "Spice Route Caterers", category: "Catering", value: 2999, stage: "paid", owner: "Referral" },
  { name: "Pixel Frame Decor", category: "Retail", value: 2999, stage: "paid", owner: "Inbound · IG" },
];

export type TaskItem = {
  id: string;
  title: string;
  detail: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  bucket: "Billing" | "Sales" | "Reviews" | "Operations" | "Growth" | "Technical";
  metric: string;
};

export const TASKS: TaskItem[] = [
  {
    id: "t1",
    title: "Verify a failed subscription payment",
    detail: "UPI AutoPay mandate failed twice for Le Petit Patisserie. Confirm with the customer before retry.",
    priority: "Urgent",
    bucket: "Billing",
    metric: "Revenue at risk · ₹2,999",
  },
  {
    id: "t2",
    title: "Contact a customer whose trial is ending",
    detail: "Sharma Electricals is on day 12 of 14. Send the pilot summary and the ₹2,999 upgrade link.",
    priority: "High",
    bucket: "Sales",
    metric: "Trial ends in 2 days",
  },
  {
    id: "t3",
    title: "Reconnect a Google Business Profile",
    detail: "Le Petit Patisserie's OAuth token expired. 4 AI replies are queued and not publishing.",
    priority: "High",
    bucket: "Reviews",
    metric: "4 replies queued",
  },
  {
    id: "t4",
    title: "Check a standee delivery delay",
    detail: "Sharma Electricals artwork was created 26 hrs ago with no printer acknowledgement.",
    priority: "Medium",
    bucket: "Operations",
    metric: "SLA breach risk",
  },
  {
    id: "t5",
    title: "Review this week's customer acquisition",
    detail: "Compare CAC per channel — inbound, referrals and event booths — before next week's spend.",
    priority: "Medium",
    bucket: "Growth",
    metric: "Spend vs. new paid",
  },
  {
    id: "t6",
    title: "Check AI usage and infrastructure costs",
    detail: "Review AI reply volume, Supabase usage and print fulfilment cost against gross margin.",
    priority: "Low",
    bucket: "Technical",
    metric: "Margin review",
  },
];

export const KPIS = [
  {
    key: "mrr",
    label: "Monthly recurring revenue",
    demo: 29990,
    hint: "Illustrative starting point · Connect billing data to calculate actual MRR.",
    demoHint: "10 active × ₹2,999 gross subscription MRR, before fees, taxes and refunds.",
    delta: "+18.4%",
    positive: true,
  },
  {
    key: "paying",
    label: "Paying customers",
    demo: 10,
    hint: "Active paid accounts.",
    demoHint: "Growth ₹2,999 and Scale ₹7,499 subscriptions active right now.",
    delta: "+2 this month",
    positive: true,
  },
  {
    key: "trials",
    label: "Trials running",
    demo: 3,
    hint: "Free 14-day pilots.",
    demoHint: "1 pilot ends in the next 48 hours — follow up today.",
    delta: "1 ends in 2 days",
    positive: false,
  },
  {
    key: "scans",
    label: "NFC + QR scans",
    demo: 2413,
    hint: "During selected period.",
    demoHint: "Taps and scans logged across all standees in the period.",
    delta: "+9.7%",
    positive: true,
  },
  {
    key: "issues",
    label: "Open issues",
    demo: 4,
    hint: "Feedback, billing and system alerts.",
    demoHint: "2 critical or high severity items need founder attention.",
    delta: "2 high severity",
    positive: false,
  },
] as const;

export const PERIODS = ["This month", "Last 30 days", "This quarter"] as const;

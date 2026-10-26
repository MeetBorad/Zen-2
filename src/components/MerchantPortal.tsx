import { useState } from "react";
import { cn } from "@/utils/cn";
import {
  IconActivity,
  IconArrow,
  IconCheck,
  IconClock,
  IconCopy,
  IconGoogle,
  IconList,
  IconLock,
  IconNfc,
  IconPulse,
  IconQr,
  IconRocket,
  IconShield,
  IconSparkles,
  IconStar,
  IconZap,
} from "./Icons";

interface MerchantPortalProps {
  onOpenStandeeSimulator: () => void;
  onOpenOnboarding: () => void;
  onBackToMarketing: () => void;
  onOpenStaffConsole?: () => void;
}

type TabType = "overview" | "google" | "replies" | "standee" | "report" | "billing";

const VIRAT_REVIEWS = [
  {
    id: "rev_1",
    author: "Ramesh Patel",
    rating: 5,
    date: "12 minutes ago",
    text: "વિરાટ ગોલ્ડ પેલેસ નિકોલ ખાતે ખૂબ જ સરસ અનુભવ રહ્યો. ૯૧૬ હોલમાર્ક દાગીના અને સ્ટાફનું વર્તન ઉત્તમ છે.",
    status: "auto_replied",
    replyText:
      "નમસ્તે રમેશભાઈ, વિરાટ ગોલ્ડ પેલેસ નિકોલ તરફથી ખુબ ખુબ આભાર! ૯૧૬ હોલમાર્કિંગ અને પ્રમાણિક સેવા એ અમારી સર્વોચ્ચ પ્રાથમિકતા છે. ફરી પધારશો!",
    replyStatus: "Posted to Google · 3m after review",
    stars: 5,
  },
  {
    id: "rev_2",
    author: "Pooja Shah",
    rating: 5,
    date: "35 minutes ago",
    text: "Bought wedding antique jewelry. Best designs in Nikol and very transparent billing and making charges!",
    status: "auto_replied",
    replyText:
      "Thank you so much Pooja ji for choosing Virat Gold Palace for your wedding shopping! We take pride in transparent gold weight calculations and fair making charges. Wishing your family joy and prosperity!",
    replyStatus: "Posted to Google · 2m after review",
    stars: 5,
  },
  {
    id: "rev_3",
    author: "Bhavik Soni",
    rating: 4,
    date: "2 hours ago",
    text: "Great showroom and courteous staff. Delivery of customized ring took 2 extra days but finish was immaculate.",
    status: "pending_approval",
    replyText:
      "Dear Bhavik ji, thank you for your kind words regarding our showroom staff and ring finish. We sincerely apologize for the 2-day delivery delay on your custom order and are streamlining our workshop schedule. We look forward to welcoming you back!",
    replyStatus: "Needs Owner Approval (Mode B)",
    stars: 4,
  },
  {
    id: "rev_4",
    author: "Harshil Vora",
    rating: 3,
    date: "Yesterday",
    text: "Design collection is good, but Sunday evening had too much rush and parking space was limited.",
    status: "private_routed",
    replyText:
      "Hello Harshil ji, thank you for visiting Virat Gold Palace. We apologize for the Sunday parking inconvenience. Our valet assistant is now available every weekend to assist our esteemed patrons.",
    replyStatus: "Queued for Owner Review · Private Feedback Saved",
    stars: 3,
  },
];

export default function MerchantPortal({
  onOpenStandeeSimulator,
  onOpenOnboarding,
  onBackToMarketing,
  onOpenStaffConsole,
}: MerchantPortalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [autoReplyMode, setAutoReplyMode] = useState<"draft" | "recommend" | "full">("recommend");
  const [reviewsList, setReviewsList] = useState(VIRAT_REVIEWS);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleApproveReply = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "auto_replied",
              replyStatus: "Posted to Google via API Just now",
              replyText: editingReplyId === id ? editedText : r.replyText,
            }
          : r,
      ),
    );
    setEditingReplyId(null);
  };

  const handleCopyReviewLink = () => {
    navigator.clipboard.writeText("https://zentap.in/r/virat");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSyncGoogle = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-ink-950 text-slate-100">
      {/* Top Application Nav for Merchant Portal */}
      <nav className="sticky top-0 z-40 border-b border-white/8 bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMarketing}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              <span>Marketing Site</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <img
                src="/zentap-logo-white.png"
                alt="Zentap"
                className="h-6 w-6 rounded-lg object-contain"
              />
              <span className="font-display text-sm font-black text-white">
                Zen<span className="text-gradient-brand">tap</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                / Merchant Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Test Account Active</span>
            </div>

            {onOpenStaffConsole && (
              <button
                onClick={onOpenStaffConsole}
                className="hidden md:inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
              >
                <IconLock className="h-3 w-3" />
                <span>Staff View</span>
              </button>
            )}

            <button
              onClick={onBackToMarketing}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition hover:bg-white/5"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Test Demo Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 px-4 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
              ⚡
            </span>
            <p className="text-emerald-200">
              <strong>Interactive Test Demo:</strong> You are viewing the live merchant dashboard for anchor customer <strong>Virat Gold Palace</strong>. Test review replies, QR links, and billing below.
            </p>
          </div>
          <button
            onClick={onBackToMarketing}
            className="self-end sm:self-auto shrink-0 rounded-lg bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/30"
          >
            Exit Demo →
          </button>
        </div>
      {/* Merchant Header Bar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-ink-900/95 via-ink-850 to-ink-900/95 p-5 sm:p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400/25 via-brand-500/30 to-cyan-400/25 text-amber-300 ring-1 ring-amber-400/40 shadow-inner">
            <span className="font-display text-2xl font-black">V</span>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-ink-950 font-bold ring-2 ring-ink-900">
              ✓
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Virat Gold Palace</h2>
              <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-brand-300 ring-1 ring-brand-400/30">
                Growth Plan · ₹2,999/mo
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Jewellery Showroom · Nikol Ring Road, Ahmedabad · Place ID:{" "}
              <code className="text-slate-300 font-mono text-[11px]">0x395e86e45b70bdb3</code>
            </p>
          </div>
        </div>

        {/* Quick action badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenStandeeSimulator}
            className="flex items-center gap-2 rounded-xl border border-brand-400/30 bg-brand-500/10 px-3.5 py-2 text-xs font-semibold text-brand-200 transition hover:bg-brand-500/20"
          >
            <IconQr className="h-4 w-4 text-brand-300" />
            <span>Test Standee (/r/virat)</span>
          </button>

          <button
            onClick={handleSyncGoogle}
            disabled={isSyncing}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
          >
            <IconGoogle className={cn("h-4 w-4 text-emerald-400", isSyncing && "animate-spin")} />
            <span>{isSyncing ? "Syncing API..." : "Sync Google Reviews"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-6 flex overflow-x-auto pb-2 border-b border-white/8 gap-2 no-scrollbar">
        {[
          { id: "overview", label: "📊 Overview & Funnel", badge: "Live" },
          { id: "google", label: "🔗 Google Connection", badge: "Connected" },
          { id: "replies", label: "⚡ AI Auto-Reply Engine", badge: "Active" },
          { id: "standee", label: "📱 Standee & QR Link", badge: "Delivered" },
          { id: "report", label: "📈 Monthly Report", badge: "+34 Reviews" },
          { id: "billing", label: "💳 Razorpay Subscriptions", badge: "AutoPay" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300",
              activeTab === tab.id
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20 ring-1 ring-brand-400/40"
                : "border border-transparent bg-white/[0.02] text-slate-400 hover:bg-white/[0.06] hover:text-white",
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-ink-800 text-slate-400",
              )}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {/* TAB 1: OVERVIEW & FUNNEL */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/8 bg-ink-900/80 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Google Maps Rating
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-extrabold text-white">4.9</span>
                  <span className="text-amber-400 text-sm">★★★★★</span>
                  <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                    ▲ +0.3★
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Up from 4.6★ prior to Zentap install</p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-ink-900/80 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Total Reviews
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-extrabold text-white">182</span>
                  <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                    +34 this month
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">100% verified genuine counter customers</p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-ink-900/80 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  NFC / QR Scans
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-extrabold text-white">48</span>
                  <span className="ml-auto rounded-full bg-brand-500/15 px-2 py-0.5 text-[11px] font-semibold text-brand-300">
                    70.8% converted
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">A6 Standee at main billing counter</p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-ink-900/80 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  AI Reply Coverage
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-extrabold text-white">100%</span>
                  <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                    Avg 2m 45s
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Claude Haiku API · Zero unanswered</p>
              </div>
            </div>

            {/* Scan to Review Funnel Diagram */}
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6">
              <h3 className="text-base font-bold text-white">
                Customer Scan-to-Review Conversion Loop (30-Day Metrics)
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                How counter footfall transforms into rank-boosting Google 5-star reviews:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Step 1: Scan / Tap</div>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">48</p>
                  <p className="mt-1 text-[11.5px] text-slate-400">NFC Tap & QR Scans</p>
                  <div className="mt-3 h-1 w-full rounded-full bg-brand-500" />
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Step 2: AI Drafts</div>
                  <p className="mt-2 font-mono text-2xl font-bold text-cyan-400">41</p>
                  <p className="mt-1 text-[11.5px] text-slate-400">Generated (85.4%)</p>
                  <div className="mt-3 h-1 w-full rounded-full bg-cyan-400" />
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Step 3: Google Post</div>
                  <p className="mt-2 font-mono text-2xl font-bold text-emerald-400">34</p>
                  <p className="mt-1 text-[11.5px] text-slate-400">Live Reviews (70.8%)</p>
                  <div className="mt-3 h-1 w-full rounded-full bg-emerald-400" />
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Step 4: AI Reply</div>
                  <p className="mt-2 font-mono text-2xl font-bold text-amber-300">34</p>
                  <p className="mt-1 text-[11.5px] text-slate-400">Published (100%)</p>
                  <div className="mt-3 h-1 w-full rounded-full bg-amber-300" />
                </div>
              </div>
            </div>

            {/* Recent Google Reviews Stream */}
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Recent Google Reviews & Auto-Replies</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live stream synced from Google Business Profile API
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("replies")}
                  className="text-xs font-semibold text-brand-300 hover:underline"
                >
                  Configure AI Auto-Reply →
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {reviewsList.slice(0, 3).map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-xs">{r.author}</span>
                        <span className="text-[11px] text-slate-500">· {r.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              "text-xs",
                              i < r.rating ? "text-amber-400" : "text-slate-700",
                            )}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 italic">“{r.text}”</p>
                    <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-3 text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/6 text-[11px]">
                        <span className="text-brand-300 font-medium">⚡ AI Response</span>
                        <span className="text-emerald-400">{r.replyStatus}</span>
                      </div>
                      <p className="mt-1.5 text-slate-300 text-[11.5px] leading-relaxed">
                        {r.replyText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE PROFILE CONNECTION (STEP 4) */}
        {activeTab === "google" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/8">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <IconGoogle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Google Business Profile Connection</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      OAuth 2.0 authorized via Google Cloud Platform
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-400/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  API Active & Verified
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-xs space-y-3">
                  <p className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
                    Profile Metadata
                  </p>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Business Name:</span>
                    <span className="font-semibold text-white">Virat Gold Palace</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-white">Jewellery Store</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Place ID:</span>
                    <span className="font-mono text-cyan-300">0x395e86e45b70bdb3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sync Schedule:</span>
                    <span className="text-emerald-400">Every 15 mins (Supabase Cron)</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-xs space-y-3">
                  <p className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
                    Security & Token Health
                  </p>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Token Vault:</span>
                    <span className="text-emerald-400">AES-256 Encrypted (Supabase RLS)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Token Expiry:</span>
                    <span className="text-slate-300">Auto-refreshing (Active)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fallback Manager:</span>
                    <span className="text-white">manager@zentap.in (Delegated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Permission Scope:</span>
                    <span className="font-mono text-brand-300 text-[10.5px]">mybusiness.reviews</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-400/20 bg-brand-500/10 p-4 text-xs space-y-1.5">
                <p className="font-semibold text-white">Official Google Business Profile API Access</p>
                <p className="text-slate-300 leading-relaxed">
                  Zentap connects via the official Google My Business Reviews API. Reviews are pulled
                  automatically without web scraping, ensuring your Google account stays 100% compliant
                  with Google's Platform Terms of Service.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleSyncGoogle}
                  className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                >
                  Force Sync Now
                </button>
                <button
                  onClick={() => alert("Google OAuth reconnection triggered.")}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Disconnect Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI AUTO-REPLY ENGINE (STEP 6) */}
        {activeTab === "replies" && (
          <div className="space-y-6">
            {/* 3-Mode Selector */}
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">Auto Review Reply Automation Modes</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose how aggressively Zentap's Claude Haiku engine posts replies to new reviews.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div
                  onClick={() => setAutoReplyMode("draft")}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all",
                    autoReplyMode === "draft"
                      ? "border-brand-400/60 bg-brand-500/15 ring-2 ring-brand-400/30"
                      : "border-white/8 bg-white/[0.02] hover:bg-white/[0.05]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">Mode 1: Draft Only</span>
                    <input
                      type="radio"
                      checked={autoReplyMode === "draft"}
                      onChange={() => setAutoReplyMode("draft")}
                      className="accent-brand-500"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    AI drafts every reply. Nothing is posted to Google until you review and click Approve.
                  </p>
                </div>

                <div
                  onClick={() => setAutoReplyMode("recommend")}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all relative",
                    autoReplyMode === "recommend"
                      ? "border-emerald-400/60 bg-emerald-500/15 ring-2 ring-emerald-400/30"
                      : "border-white/8 bg-white/[0.02] hover:bg-white/[0.05]",
                  )}
                >
                  <span className="absolute -top-2.5 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[9.5px] font-bold text-ink-950 uppercase tracking-wider">
                    Recommended
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">Mode 2: 4★ & 5★ Auto</span>
                    <input
                      type="radio"
                      checked={autoReplyMode === "recommend"}
                      onChange={() => setAutoReplyMode("recommend")}
                      className="accent-emerald-400"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Instantly auto-posts warm replies to 4★ & 5★ reviews. 1★ to 3★ reviews hold for your approval.
                  </p>
                </div>

                <div
                  onClick={() => setAutoReplyMode("full")}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all",
                    autoReplyMode === "full"
                      ? "border-cyan-400/60 bg-cyan-500/15 ring-2 ring-cyan-400/30"
                      : "border-white/8 bg-white/[0.02] hover:bg-white/[0.05]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">Mode 3: Full Auto</span>
                    <input
                      type="radio"
                      checked={autoReplyMode === "full"}
                      onChange={() => setAutoReplyMode("full")}
                      className="accent-cyan-400"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    100% automated replies for all star ratings using strict anti-conflict guardrails.
                  </p>
                </div>
              </div>

              {/* Guardrails Check */}
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-xs space-y-2">
                <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Active AI Guardrail Rules (Always Enforced):
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 text-emerald-400" />
                    <span>Always thank reviewer and reference specific items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 text-emerald-400" />
                    <span>Strictly NEVER offer refunds, discounts, or cash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 text-emerald-400" />
                    <span>Never reveal phone numbers or personal records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 text-emerald-400" />
                    <span>Vary vocabulary so replies never look copy-pasted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Review Inbox & Approval Queue */}
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Review Inbox & Approval Queue</h3>
              <div className="space-y-4">
                {reviewsList.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{r.author}</span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={cn(
                                "text-xs",
                                i < r.rating ? "text-amber-400" : "text-slate-700",
                              )}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">· {r.date}</span>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold w-fit",
                          r.status === "auto_replied"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : r.status === "pending_approval"
                              ? "bg-amber-500/15 text-amber-300"
                              : "bg-brand-500/15 text-brand-300",
                        )}
                      >
                        {r.replyStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 italic bg-ink-950/40 p-2.5 rounded-xl border border-white/4">
                      “{r.text}”
                    </p>

                    {/* AI Reply box */}
                    <div className="rounded-xl border border-brand-400/20 bg-brand-500/5 p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-xs text-brand-300 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <IconSparkles className="h-3.5 w-3.5" /> AI Drafted Response
                        </span>
                        {editingReplyId !== r.id && (
                          <button
                            onClick={() => {
                              setEditingReplyId(r.id);
                              setEditedText(r.replyText);
                            }}
                            className="text-[11px] text-slate-400 hover:text-white"
                          >
                            Edit Reply
                          </button>
                        )}
                      </div>

                      {editingReplyId === r.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-white/10 bg-ink-950 p-2 text-xs text-white focus:outline-none focus:border-brand-400/60"
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setEditingReplyId(null)}
                              className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleApproveReply(r.id)}
                              className="rounded-lg bg-brand-500 px-3 py-1 text-xs font-semibold text-white"
                            >
                              Save & Post to Google
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-300 leading-relaxed">{r.replyText}</p>
                      )}

                      {r.status === "pending_approval" && editingReplyId !== r.id && (
                        <div className="flex gap-2 pt-2 border-t border-white/6 justify-end">
                          <button
                            onClick={() => handleApproveReply(r.id)}
                            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md hover:brightness-110"
                          >
                            ✓ Approve & Post to Google
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STANDEE & QR LINK (STEP 5) */}
        {activeTab === "standee" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">
                  Countertop Standee & Customer Review Link
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Place on your billing counter. Customers tap with NFC or scan with any camera.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 items-center">
                {/* Visual Standee Card */}
                <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-b from-amber-500/10 via-ink-900 to-ink-950 p-6 text-center shadow-xl">
                  <div className="mx-auto max-w-[200px] rounded-2xl border border-white/10 bg-ink-950 p-4 shadow-2xl">
                    <p className="font-serif text-sm font-bold text-amber-300 tracking-wider">
                      VIRAT GOLD PALACE
                    </p>
                    <p className="text-[10px] text-slate-400">NIKOL, AHMEDABAD</p>
                    <div className="my-3 mx-auto w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center">
                      <img
                        src="/live-google-review-qr.png"
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-white">TAP OR SCAN TO REVIEW</p>
                    <div className="mt-1 flex justify-center gap-3 text-[10px] text-slate-400">
                      <span>• NFC Tap</span>
                      <span>• QR Camera</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/8 flex items-center justify-center gap-1.5">
                      <img src="/zentap-logo-white.png" alt="Zentap" className="h-3 w-3" />
                      <span className="text-[9px] text-slate-400">Powered by Zentap</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                      ✓ A6 Acrylic Standee Delivered
                    </span>
                  </div>
                </div>

                {/* Link & Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Direct Review Page URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value="https://zentap.in/r/virat"
                        className="flex-1 rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
                      />
                      <button
                        onClick={handleCopyReviewLink}
                        className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                      >
                        {copiedLink ? "Copied!" : "Copy Link"}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-xs space-y-2">
                    <p className="font-semibold text-white">Included Standee Features:</p>
                    <p className="text-slate-400">
                      • NXP NTAG213 high-frequency NFC chip embedded into premium 3mm clear acrylic.
                    </p>
                    <p className="text-slate-400">
                      • Dynamic shortlink routing: updates destination if your Google Profile ID changes.
                    </p>
                    <p className="text-slate-400">
                      • Supports Gujarati, Hindi, and English AI review drafts automatically.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={onOpenStandeeSimulator}
                      className="rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand-400"
                    >
                      📱 Test Review Experience on Mobile
                    </button>
                    <a
                      href="/live-google-review-qr.png"
                      download="Virat_Gold_Palace_QR.png"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                    >
                      Download High-Res QR Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MONTHLY REPORT (STEP 7) */}
        {activeTab === "report" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/8">
                <div>
                  <h3 className="text-base font-bold text-white">Monthly Reputation Report</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Cycle: October 1 to October 31, 2026 · Auto-generated on the 1st of every month
                  </p>
                </div>
                <a
                  href="/Zentap_Founders_Master_Blueprint.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                >
                  Download PDF Report
                </a>
              </div>

              {/* AI Executive Summary */}
              <div className="rounded-2xl border border-brand-400/30 bg-gradient-to-r from-brand-500/15 via-violet-500/10 to-cyan-500/15 p-5">
                <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider">
                  <IconSparkles className="h-4 w-4" /> AI Monthly Executive Summary
                </div>
                <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                  “Virat Gold Palace achieved an outstanding +0.3★ rating jump, closing October at 4.9★
                  with 34 new 5-star reviews captured. Customers specifically praised Hallmark 916 purity
                  certifications (28 mentions), transparent weighing scales (19 mentions), and antique
                  bridal necklace designs (14 mentions). 100% of reviews received personalized AI replies
                  within an average turnaround of 2 minutes 45 seconds, elevating your showroom to the #1
                  spot on Google Maps for 'Gold Jewellers in Nikol'.”
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid gap-4 sm:grid-cols-3 text-xs">
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                    Rating Trajectory
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-white">4.6★ → 4.9★</span>
                  </div>
                  <p className="mt-1 text-emerald-400">▲ Highest in Nikol jeweler cluster</p>
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                    Total Review Velocity
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-white">+34 New</span>
                  </div>
                  <p className="mt-1 text-slate-400">Total count: 182 reviews</p>
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                    Language Breakdown
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-lg font-bold text-white">Guj: 62% | Eng: 38%</span>
                  </div>
                  <p className="mt-1 text-slate-400">Bilingual local relevance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: RAZORPAY SUBSCRIPTIONS & BILLING (STEP 3) */}
        {activeTab === "billing" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/8 bg-ink-900/80 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/8">
                <div>
                  <h3 className="text-base font-bold text-white">Subscription & Payment Management</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Powered by Razorpay Subscriptions (UPI AutoPay / eMandate / Cards)
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-400/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Active Subscription
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-xs space-y-3">
                  <p className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
                    Current Plan Details
                  </p>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plan Name:</span>
                    <span className="font-bold text-white">Growth Plan (₹2,999/mo)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GST (18%):</span>
                    <span className="text-slate-300">₹539.82 (Input credit available)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Monthly Charge:</span>
                    <span className="font-mono text-white font-bold">₹3,538.82 / month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Next Auto-Debit Date:</span>
                    <span className="text-cyan-300 font-semibold">November 14, 2026</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-xs space-y-3">
                  <p className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
                    Payment Method & Mandate
                  </p>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Method:</span>
                    <span className="text-white">UPI AutoPay (HDFC Bank)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">VPA / UPI ID:</span>
                    <span className="font-mono text-white">viratgold@okhdfcbank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Razorpay Mandate ID:</span>
                    <span className="font-mono text-slate-400">sub_Rzp94827104</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Webhook Status:</span>
                    <span className="text-emerald-400">● 200 OK (invoice.paid)</span>
                  </div>
                </div>
              </div>

              {/* Invoices list */}
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider mb-2">
                  Tax Invoices
                </p>
                <div className="rounded-2xl border border-white/6 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.03] text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Invoice Number</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Download</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/6 text-slate-300">
                      <tr>
                        <td className="p-3 font-mono">INV-2026-10-001</td>
                        <td className="p-3">Oct 14, 2026</td>
                        <td className="p-3 font-mono">₹3,538.82</td>
                        <td className="p-3 text-emerald-400">Paid via UPI AutoPay</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert("Invoice PDF downloaded.")}
                            className="text-brand-300 hover:underline"
                          >
                            GST PDF
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Plan Controls */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/8 justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => alert("Subscription paused for 30 days.")}
                    className="rounded-xl border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5"
                  >
                    Pause Subscription
                  </button>
                  <button
                    onClick={() => alert("Please contact founder at +91 8788416911 to cancel.")}
                    className="rounded-xl border border-rose-500/20 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10"
                  >
                    Cancel Subscription
                  </button>
                </div>
                <button
                  onClick={onOpenOnboarding}
                  className="rounded-xl bg-brand-500 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-400"
                >
                  Upgrade to Scale (₹7,499)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

import { useState } from "react";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_REVIEW_CONTEXT,
  BUSINESS_REVIEW_TOPICS,
  type BusinessCategory,
} from "@/lib/business-categories";
import { cn } from "@/utils/cn";
import { BentoCard, Sparkline, StatusPill, SegmentedControl } from "./opendesign";

type PreviewTab = "overview" | "reviews" | "insights" | "billing";
type ReviewStatus = "pending" | "approved";

interface PreviewReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  topicIndex: 0 | 1 | 2 | 3;
  status: ReviewStatus;
  text: string;
}

const DEMO_REVIEWS: PreviewReview[] = [
  {
    id: "aarav",
    author: "Aarav Patel",
    rating: 5,
    date: "Today",
    topicIndex: 1,
    status: "pending",
    text: "Great experience. The staff were helpful and attentive from the moment we arrived.",
  },
  {
    id: "mira",
    author: "Mira Shah",
    rating: 3,
    date: "Yesterday",
    topicIndex: 2,
    status: "pending",
    text: "Good experience overall, though the wait was a little longer than expected.",
  },
  {
    id: "dev",
    author: "Dev Mehta",
    rating: 4,
    date: "2 days ago",
    topicIndex: 0,
    status: "pending",
    text: "Really nice quality and a helpful team. Would love to see a few more options.",
  },
  {
    id: "isha",
    author: "Isha Desai",
    rating: 5,
    date: "3 days ago",
    topicIndex: 3,
    status: "pending",
    text: "Excellent value and a smooth experience. I will definitely be back.",
  },
];

interface MerchantPreviewProps {
  user?: any;
  onExit: () => void;
}

function getReplyDraft(review: PreviewReview, category: BusinessCategory, businessName: string) {
  const context = BUSINESS_REVIEW_CONTEXT[category] || "your visit";
  const topic = BUSINESS_REVIEW_TOPICS[category]?.[review.topicIndex] || "our service";
  if (review.rating <= 3) {
    return `Thank you for sharing your feedback with ${businessName} about ${topic.toLowerCase()}. We're sorry we missed the mark on ${context}. Your feedback helps us improve, and we'd appreciate the chance to make your next experience better. Please reach out to our manager directly!`;
  }
  return `Thank you for choosing ${businessName} for ${context}! We're thrilled you had a positive experience with ${topic.toLowerCase()}, and our team truly appreciates your 5-star review. We look forward to welcoming you back soon!`;
}

function BusinessCategorySelect({
  value,
  onChange,
}: {
  value: BusinessCategory;
  onChange: (category: BusinessCategory) => void;
}) {
  return (
    <label className="block text-xs font-medium text-slate-400">
      Business category
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as BusinessCategory)}
        className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400 sm:min-w-56"
      >
        {BUSINESS_CATEGORIES.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </label>
  );
}

function RatingBars() {
  return (
    <div className="space-y-3" aria-label="Rating breakdown">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = DEMO_REVIEWS.filter((review) => review.rating === rating).length;
        const percentage = (count / DEMO_REVIEWS.length) * 100;
        return (
          <div key={rating} className="flex items-center gap-3 text-xs">
            <span className="w-8 text-slate-400">{rating} star</span>
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-white/8"
              role="img"
              aria-label={`${rating} star: ${count} of ${DEMO_REVIEWS.length} reviews`}
            >
              <div className="h-full rounded-full bg-amber-300" style={{ width: `${percentage}%` }} />
            </div>
            <span className="w-6 text-right text-slate-500">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function MerchantPreview({ user, onExit }: MerchantPreviewProps) {
  const metadata = user?.user_metadata || {};
  const isRealUser = Boolean(user);
  const businessName = metadata.business_name || (isRealUser ? "My Business" : "Sample Business");
  const ownerName = metadata.full_name || (isRealUser ? "Showroom Owner" : "Sample Owner");
  const city = metadata.business_city || "Ahmedabad";
  const userCategory = (metadata.business_category as BusinessCategory) || "Jewellery Showroom";
  const phone = metadata.phone || user?.phone || "+91 9662760880";
  const plan = metadata.selected_plan || "Growth ₹2,999";
  const displayEmail = user?.email?.includes("@mobile.zentap.in") ? metadata.report_email : user?.email;
  const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "store";

  const [tab, setTab] = useState<PreviewTab>("overview");
  const [reviews, setReviews] = useState(DEMO_REVIEWS);
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory>(() => userCategory);
  const [topicFilter, setTopicFilter] = useState("All topics");
  const [statusFilter, setStatusFilter] = useState<"pending" | "all">("pending");
  const [ratingFilter, setRatingFilter] = useState<"all" | "4+">("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const tabs: { id: PreviewTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Google reviews" },
    { id: "insights", label: "Insights" },
    { id: "billing", label: "Subscription & Standee" },
  ];

  const averageRating = (
    DEMO_REVIEWS.reduce((total, review) => total + review.rating, 0) / DEMO_REVIEWS.length
  ).toFixed(1);
  const pendingCount = reviews.filter((review) => review.status === "pending").length;
  const positiveCount = DEMO_REVIEWS.filter((review) => review.rating >= 4).length;
  const reviewTopics = BUSINESS_REVIEW_TOPICS[businessCategory] || [
    "Quality & Design",
    "Staff Courtesy",
    "Fair Pricing",
    "Overall Ambience",
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesStatus = statusFilter === "all" || review.status === "pending";
    const topic = reviewTopics[review.topicIndex] || "General";
    const matchesTopic = topicFilter === "All topics" || topic === topicFilter;
    const matchesRating = ratingFilter === "all" || review.rating >= 4;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      review.author.toLowerCase().includes(query) ||
      review.text.toLowerCase().includes(query) ||
      topic.toLowerCase().includes(query);
    return matchesStatus && matchesTopic && matchesRating && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-ink-950 text-slate-100">
      {/* Top Header */}
      <header className="sticky top-0 z-20 border-b border-white/8 bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/zentap-logo-white.png" alt="Zentap Digital Solutions" className="h-8 w-auto object-contain shadow-sm" />
            <div>
              <p className="font-display text-sm font-black text-white">{businessName}</p>
              <p className="text-[11px] text-emerald-400 font-medium">
                {isRealUser ? `● Active Merchant (${ownerName})` : "Preview workspace"}
              </p>
            </div>
          </div>
          <button
            onClick={onExit}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              isRealUser
                ? "border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                : "border border-white/10 text-white hover:bg-white/8"
            }`}
          >
            {isRealUser ? "Sign out" : "Exit preview"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* User Workspace Info Banner */}
        {isRealUser ? (
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-xl">
                🏬
              </div>
              <div>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  {businessName}
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300">
                    Live Merchant Account
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Owner: <strong className="text-slate-200">{ownerName}</strong> • {city} • {businessCategory} • Phone: <strong className="text-slate-200">{phone}</strong>
                  {displayEmail ? ` • Email: ${displayEmail}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-brand-400/30 bg-brand-400/15 px-3 py-1.5 text-xs font-semibold text-brand-200">
                {plan} Plan
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-amber-300/25 bg-amber-300/[0.07] px-4 py-3">
            <p className="text-sm font-semibold text-amber-100">Testing preview — sample data mode</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/70">
              Sign in or create an account with your mobile number to bind your real business profile and live standees.
            </p>
          </div>
        )}

        {/* Workspace Title & Tabs (Open Design Segmented Switcher) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Merchant Dashboard</p>
            <h1 className="mt-1 text-3xl font-black text-white">{businessName}</h1>
            <p className="mt-1 text-sm text-slate-400">
              AI Growth OS for Google Reviews & Countertop Standees ({city})
            </p>
          </div>
          <SegmentedControl
            value={tab}
            onChange={(val) => {
              setTab(val as PreviewTab);
              setMessage("");
            }}
            options={tabs.map((t) => ({ id: t.id, label: t.label }))}
          />
        </div>

        {/* Category Context Selector */}
        <div className="mt-5 max-w-sm">
          <BusinessCategorySelect
            value={businessCategory}
            onChange={(category) => {
              setBusinessCategory(category);
              setTopicFilter("All topics");
            }}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Tailors review topics and Gujarati/Hindi/English AI reply suggestions.
          </p>
        </div>

        {message && (
          <p role="status" className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
            {message}
          </p>
        )}

        {/* TAB 1: OVERVIEW */}
        {tab === "overview" && (
          <section className="mt-6 space-y-5" aria-label="Business overview">
            {/* Quick Metrics (Open Design Bento Cards with Sparklines) */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <BentoCard
                label="Google Maps Rating"
                badge={<StatusPill tone="warning" size="sm">Target 4.9★</StatusPill>}
                value={averageRating}
                unit="★"
                accentGlow="amber"
                sparkline={<Sparkline data={[4.6, 4.6, 4.7, 4.8, 4.8, 4.9, 4.9]} tone="amber" width={90} height={30} showPoints />}
                footer={<p className="text-slate-400 text-xs">Top 1% rated showroom in Nikol, Ahmedabad</p>}
              />
              <BentoCard
                label="Total Verified Reviews"
                badge={<StatusPill tone="done" dot size="sm">+28 Lift</StatusPill>}
                value="34"
                unit="Verified"
                accentGlow="emerald"
                sparkline={<Sparkline data={[6, 12, 18, 22, 28, 31, 34]} tone="emerald" width={90} height={30} showPoints />}
                footer={<p className="text-slate-400 text-xs">Scanned directly on counter standee</p>}
              />
              <BentoCard
                label="Replies Awaiting Review"
                badge={<StatusPill tone="progress" size="sm">Mode B</StatusPill>}
                value={pendingCount}
                unit="Pending"
                accentGlow="cyan"
                sparkline={<Sparkline data={[4, 3, 2, 2, 1, 0, pendingCount]} tone="cyan" width={90} height={30} />}
                footer={<p className="text-slate-400 text-xs">Auto-replies 4-5★, review 1-3★ only</p>}
              />
              <BentoCard
                label="Customer Sentiment"
                badge={<StatusPill tone="brand" size="sm">4 & 5★ Stars</StatusPill>}
                value={`${Math.round((positiveCount / DEMO_REVIEWS.length) * 100)}%`}
                accentGlow="violet"
                sparkline={<Sparkline data={[82, 85, 88, 90, 92, 95, 96]} tone="violet" width={90} height={30} showPoints />}
                footer={<p className="text-slate-400 text-xs">Gujarati, Hindi, and English feedback</p>}
              />
            </div>

            {/* Standee Hub Card */}
            <div className="rounded-2xl border border-brand-500/25 bg-gradient-to-r from-brand-500/10 via-violet-500/10 to-transparent p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="rounded-full border border-brand-400/30 bg-brand-400/15 px-2.5 py-0.5 text-xs font-bold text-brand-200">
                    Counter Standee & NFC Link
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    Live Review Flow for {businessName}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Customers tap with NFC or scan this QR at your checkout counter to draft 5★ reviews in Gujarati, Hindi, or English.
                  </p>
                  <p className="mt-2 font-mono text-xs text-brand-300 select-all">
                    https://zentapdigitalsolutions.com/r/{slug}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`/r/virat-gold`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-600 shadow-md"
                  >
                    Test Live Counter Flow →
                  </a>
                  <a
                    href={`/standee/virat-gold`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    Printable A6 Standee
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <section className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-white">Review topics</h2>
                    <p className="mt-1 text-xs text-slate-500">What customers highlight most about {businessName}</p>
                  </div>
                  <button onClick={() => setTab("insights")} className="text-xs font-semibold text-brand-300 hover:text-brand-200">
                    Explore insights →
                  </button>
                </div>
                <div className="mt-5 space-y-4">
                  {reviewTopics.map((topic, topicIndex) => {
                    const count = DEMO_REVIEWS.filter((review) => review.topicIndex === topicIndex).length;
                    const percent = (count / DEMO_REVIEWS.length) * 100;
                    return (
                      <div key={topic}>
                        <div className="mb-1.5 flex justify-between gap-3 text-xs">
                          <span className="text-slate-300">{topic}</span>
                          <span className="text-slate-500">{count} of {DEMO_REVIEWS.length}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/8">
                          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <h2 className="font-semibold text-white">AI Auto-Reply Configuration</h2>
                <p className="mt-1 text-xs text-slate-500">Automated Google review replies powered by Gemini 1.5</p>
                <div className="mt-4 rounded-xl border border-brand-400/15 bg-brand-400/[0.06] p-4">
                  <p className="text-xs uppercase tracking-wider text-brand-200 font-semibold">Active Mode</p>
                  <p className="mt-1 text-lg font-bold text-white">Mode B: Semi-Automated Guardrail</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    • <strong>4★ and 5★ reviews:</strong> AI automatically generates courteous response and publishes within 15 minutes.<br />
                    • <strong>1★, 2★, and 3★ reviews:</strong> AI generates apology draft and pings your WhatsApp ({phone}) for approval.
                  </p>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  Strict anti-discount guardrails active: AI will never offer cash refunds or discounts in public Google replies.
                </p>
              </section>
            </div>
          </section>
        )}

        {/* TAB 2: GOOGLE REVIEWS */}
        {tab === "reviews" && (
          <section className="mt-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Google Review Stream</h2>
              <p className="mt-1 text-sm text-slate-400">Incoming reviews for {businessName} and AI reply drafts.</p>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-ink-900 p-4 md:grid-cols-3">
              <label className="block text-xs font-medium text-slate-400">
                Search reviews
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Name, topic, or review text"
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-brand-400"
                />
              </label>
              <label className="block text-xs font-medium text-slate-400">
                Review topic
                <select
                  value={topicFilter}
                  onChange={(event) => setTopicFilter(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
                >
                  <option>All topics</option>
                  {reviewTopics.map((topic) => <option key={topic}>{topic}</option>)}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-medium text-slate-400">
                  Rating
                  <select
                    value={ratingFilter}
                    onChange={(event) => setRatingFilter(event.target.value as "all" | "4+")}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
                  >
                    <option value="all">Any rating</option>
                    <option value="4+">4 stars & up</option>
                  </select>
                </label>
                <label className="block text-xs font-medium text-slate-400">
                  Queue
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as "pending" | "all")}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
                  >
                    <option value="pending">Needs reply</option>
                    <option value="all">All reviews</option>
                  </select>
                </label>
              </div>
            </div>
            <p className="text-xs text-slate-500" aria-live="polite">
              Showing {filteredReviews.length} of {reviews.length} reviews · {pendingCount} awaiting approval
            </p>
            {filteredReviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{review.author}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      <span className="text-amber-300">{"★".repeat(review.rating)}</span>
                      <span className="text-slate-600">{"★".repeat(5 - review.rating)}</span>
                      {" · "}{review.date}{" · "}{reviewTopics[review.topicIndex] || "Customer Feedback"}
                    </p>
                  </div>
                  {review.status === "pending" ? (
                    <button
                      onClick={() => {
                        setReviews((current) =>
                          current.map((item) => item.id === review.id ? { ...item, status: "approved" } : item),
                        );
                        setMessage(`Reply approved and queued to publish to Google for ${review.author}.`);
                      }}
                      className="rounded-lg border border-brand-400/20 bg-brand-400/10 px-3.5 py-2 text-xs font-semibold text-brand-200 hover:bg-brand-400/20"
                    >
                      Approve & Post to Google
                    </button>
                  ) : (
                    <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                      ✓ Posted to Google
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{review.text}</p>
                <div className="mt-3 rounded-lg border border-white/6 bg-white/[0.025] p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">AI Reply Draft · Gujarati/English</p>
                    <span className="text-[10px] text-brand-200">{businessCategory}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{getReplyDraft(review, businessCategory, businessName)}</p>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* TAB 3: INSIGHTS */}
        {tab === "insights" && (
          <section className="mt-6 space-y-4" aria-label="Review analytics">
            <div>
              <h2 className="text-lg font-semibold text-white">Sentiment & Topic Insights</h2>
              <p className="mt-1 text-sm text-slate-400">
                AI extraction of topics mentioned in customer Google reviews for {businessName}.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Average Rating", `${averageRating} / 5.0`, "Based on Google Maps reviews"],
                ["Positive Reviews", `${positiveCount} / ${DEMO_REVIEWS.length}`, "Ratings of 4 and 5 stars"],
                ["Needs Attention", String(DEMO_REVIEWS.filter((review) => review.rating <= 3).length), "Direct feedback routed to owner"],
              ].map(([label, value, detail]) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-2 text-xs text-slate-500">{detail}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <section className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <h3 className="font-semibold text-white">Rating Distribution</h3>
                <p className="mb-5 mt-1 text-xs text-slate-500">Star breakdown across customers</p>
                <RatingBars />
              </section>
              <section className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <h3 className="font-semibold text-white">Topics Customers Value</h3>
                <p className="mb-5 mt-1 text-xs text-slate-500">Keyword breakdown from customer reviews</p>
                <div className="space-y-4">
                  {reviewTopics.map((topic, topicIndex) => {
                    const matchingReviews = DEMO_REVIEWS.filter((review) => review.topicIndex === topicIndex);
                    const positive = matchingReviews.filter((review) => review.rating >= 4).length;
                    const percent = (matchingReviews.length / DEMO_REVIEWS.length) * 100;
                    return (
                      <div key={topic}>
                        <div className="mb-1.5 flex justify-between gap-3 text-xs">
                          <span className="text-slate-300">{topic}</span>
                          <span className="text-slate-500">{positive} positive of {matchingReviews.length}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/8">
                          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </section>
        )}

        {/* TAB 4: BILLING & STANDEE */}
        {tab === "billing" && (
          <section className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Subscription & Standees</p>
              <h2 className="mt-1 text-2xl font-bold text-white">{plan} Plan</h2>
              <p className="mt-1 text-sm text-slate-400">Recurring UPI AutoPay via Razorpay</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between gap-4 py-1.5 border-b border-white/6">
                <span>Showroom</span>
                <span className="font-semibold text-white">{businessName}</span>
              </div>
              <div className="flex justify-between gap-4 py-1.5 border-b border-white/6">
                <span>Location</span>
                <span className="text-slate-200">{city}</span>
              </div>
              <div className="flex justify-between gap-4 py-1.5 border-b border-white/6">
                <span>Account Status</span>
                <span className="text-emerald-400 font-semibold">14-Day Free Trial Active</span>
              </div>
              <div className="flex justify-between gap-4 py-1.5 border-b border-white/6">
                <span>Billing Amount</span>
                <span className="font-bold text-white">₹2,999 / month</span>
              </div>
              <div className="flex justify-between gap-4 py-1.5">
                <span>Next Billing Date</span>
                <span className="text-slate-400">14 days from registration (Auto-mandate)</span>
              </div>
            </div>

            <div className="rounded-xl border border-brand-500/20 bg-brand-500/10 p-4">
              <h4 className="text-sm font-bold text-white">Physical Standee Shipment</h4>
              <p className="mt-1 text-xs text-slate-300">
                Your A6 acrylic countertop standee is assigned for dispatch to your registered address in {city}.
                Track via helpline: <strong>+91 8788416911</strong>.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

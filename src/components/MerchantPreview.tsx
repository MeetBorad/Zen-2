import { useState } from "react";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_REVIEW_CONTEXT,
  BUSINESS_REVIEW_TOPICS,
  type BusinessCategory,
} from "@/lib/business-categories";
import { cn } from "@/utils/cn";

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
  onExit: () => void;
}

function getReplyDraft(review: PreviewReview, category: BusinessCategory) {
  const context = BUSINESS_REVIEW_CONTEXT[category];
  const topic = BUSINESS_REVIEW_TOPICS[category][review.topicIndex];
  if (review.rating <= 3) {
    return `Thank you for sharing feedback about ${topic.toLowerCase()}. We're sorry we missed the mark on ${context}. Your feedback helps us improve, and we'd appreciate the chance to make your next experience better.`;
  }
  return `Thank you for choosing us for ${context}. We're glad you had a positive experience with ${topic.toLowerCase()}, and we appreciate you taking the time to share this feedback. We look forward to welcoming you again.`;
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
    <div className="space-y-3" aria-label="Sample rating breakdown">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = DEMO_REVIEWS.filter((review) => review.rating === rating).length;
        const percentage = (count / DEMO_REVIEWS.length) * 100;
        return (
          <div key={rating} className="flex items-center gap-3 text-xs">
            <span className="w-8 text-slate-400">{rating} star</span>
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-white/8"
              role="img"
              aria-label={`${rating} star: ${count} of ${DEMO_REVIEWS.length} sample reviews`}
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

export default function MerchantPreview({ onExit }: MerchantPreviewProps) {
  const [tab, setTab] = useState<PreviewTab>("overview");
  const [reviews, setReviews] = useState(DEMO_REVIEWS);
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory>("Restaurant & Cafe");
  const [topicFilter, setTopicFilter] = useState("All topics");
  const [statusFilter, setStatusFilter] = useState<"pending" | "all">("pending");
  const [ratingFilter, setRatingFilter] = useState<"all" | "4+">("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const tabs: { id: PreviewTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Google reviews" },
    { id: "insights", label: "Insights" },
    { id: "billing", label: "Subscription" },
  ];

  const averageRating = (
    DEMO_REVIEWS.reduce((total, review) => total + review.rating, 0) / DEMO_REVIEWS.length
  ).toFixed(1);
  const pendingCount = reviews.filter((review) => review.status === "pending").length;
  const positiveCount = DEMO_REVIEWS.filter((review) => review.rating >= 4).length;
  const reviewTopics = BUSINESS_REVIEW_TOPICS[businessCategory];

  const filteredReviews = reviews.filter((review) => {
    const matchesStatus = statusFilter === "all" || review.status === "pending";
    const topic = reviewTopics[review.topicIndex];
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
      <header className="sticky top-0 z-20 border-b border-white/8 bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/zentap-logo-white.png" alt="" className="h-8 w-8 rounded-lg object-contain" />
            <div>
              <p className="font-display text-sm font-black text-white">Zentap Merchant</p>
              <p className="text-[11px] text-slate-400">Preview workspace</p>
            </div>
          </div>
          <button
            onClick={onExit}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/8"
          >
            Exit preview
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="mb-6 rounded-xl border border-amber-300/25 bg-amber-300/[0.07] px-4 py-3">
          <p className="text-sm font-semibold text-amber-100">Testing preview — sample data only</p>
          <p className="mt-1 text-xs leading-relaxed text-amber-100/70">
            Nothing here is connected to a real merchant account or Google Business Profile. Category selection,
            insights, and review actions are previews only and reset when you leave.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Merchant workspace</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Sample Business</h1>
            <p className="mt-1 text-sm text-slate-400">Category-aware review management preview</p>
          </div>
          <nav aria-label="Merchant preview" className="flex gap-2 overflow-x-auto">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  setMessage("");
                }}
                aria-pressed={tab === item.id}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition",
                  tab === item.id ? "bg-brand-500 text-white" : "border border-white/10 text-slate-300 hover:bg-white/5",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-5 max-w-sm">
          <BusinessCategorySelect
            value={businessCategory}
            onChange={(category) => {
              setBusinessCategory(category);
              setTopicFilter("All topics");
            }}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Changes the context used for sample AI reply drafts; it does not change live Google data.
          </p>
        </div>

        {message && (
          <p role="status" className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
            {message}
          </p>
        )}

        {tab === "overview" && (
          <section className="mt-6 space-y-4" aria-label="Sample business overview">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Average rating", averageRating, "Across 4 sample Google reviews"],
                ["Sample reviews", String(DEMO_REVIEWS.length), "Use filters to explore the queue"],
                ["Replies awaiting review", String(pendingCount), "Approve a sample draft in Google reviews"],
                ["Positive sentiment", `${Math.round((positiveCount / DEMO_REVIEWS.length) * 100)}%`, "Ratings of 4 or 5 stars"],
              ].map(([label, value, detail]) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-3 font-mono text-3xl font-semibold text-white">{value}</p>
                  <p className="mt-2 text-xs text-slate-500">{detail}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <section className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-white">Review topics</h2>
                    <p className="mt-1 text-xs text-slate-500">What sample customers mention most</p>
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
                        <div className="mb-1.5 flex justify-between text-xs">
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
                <h2 className="font-semibold text-white">Business review setup</h2>
                <p className="mt-1 text-xs text-slate-500">Selected context for review organization and reply suggestions</p>
                <div className="mt-4 rounded-xl border border-brand-400/15 bg-brand-400/[0.06] p-4">
                  <p className="text-xs uppercase tracking-wider text-brand-200">Current business category</p>
                  <p className="mt-1 text-lg font-semibold text-white">{businessCategory}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Sample reply drafts will use the context of {BUSINESS_REVIEW_CONTEXT[businessCategory]}.
                  </p>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  Actual Google review syncing and AI generation will require a connected merchant workspace and service integration.
                </p>
              </section>
            </div>
          </section>
        )}

        {tab === "reviews" && (
          <section className="mt-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Google review queue</h2>
              <p className="mt-1 text-sm text-slate-400">Search, filter, and inspect sample reply drafts before approval.</p>
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
              Showing {filteredReviews.length} of {reviews.length} sample reviews · {pendingCount} awaiting review
            </p>
            {filteredReviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{review.author}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      <span className="text-amber-300">{"★".repeat(review.rating)}</span>
                      <span className="text-slate-600">{"★".repeat(5 - review.rating)}</span>
                      {" · "}{review.date}{" · "}{reviewTopics[review.topicIndex]}
                    </p>
                  </div>
                  {review.status === "pending" ? (
                    <button
                      onClick={() => {
                        setReviews((current) =>
                          current.map((item) => item.id === review.id ? { ...item, status: "approved" } : item),
                        );
                        setMessage("Sample reply approved. This preview action did not contact Google.");
                      }}
                      className="rounded-lg border border-brand-400/20 bg-brand-400/10 px-3 py-2 text-xs font-semibold text-brand-200 hover:bg-brand-400/20"
                    >
                      Approve sample reply
                    </button>
                  ) : (
                    <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">
                      Sample approved
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{review.text}</p>
                <div className="mt-3 rounded-lg border border-white/6 bg-white/[0.025] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">AI reply draft · sample</p>
                    <span className="text-[10px] text-brand-200">{businessCategory} context</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{getReplyDraft(review, businessCategory)}</p>
                </div>
              </article>
            ))}
            {filteredReviews.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-ink-900 p-6 text-sm text-slate-400">
                No sample reviews match those filters. Try another topic or search term.
              </div>
            )}
          </section>
        )}

        {tab === "insights" && (
          <section className="mt-6 space-y-4" aria-label="Sample review analytics">
            <div>
              <h2 className="text-lg font-semibold text-white">Review insights</h2>
              <p className="mt-1 text-sm text-slate-400">
                A simple analysis view for sample reviews. Use topics and ratings to spot what customers value and where to improve.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Average rating", `${averageRating} / 5`, "Mean of sample review scores"],
                ["Positive reviews", `${positiveCount} / ${DEMO_REVIEWS.length}`, "4- and 5-star sample reviews"],
                ["Needs attention", String(DEMO_REVIEWS.filter((review) => review.rating <= 3).length), "3 stars or lower"],
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
                <h3 className="font-semibold text-white">Rating distribution</h3>
                <p className="mb-5 mt-1 text-xs text-slate-500">Sample count grouped by star rating</p>
                <RatingBars />
              </section>
              <section className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <h3 className="font-semibold text-white">Topics customers mention</h3>
                <p className="mb-5 mt-1 text-xs text-slate-500">Use this breakdown to spot operational patterns</p>
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
            <p className="rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-4 text-xs leading-relaxed text-amber-100/70">
              This analytics view uses static sample data for testing. Live Google review data and AI analysis are not connected in this preview.
            </p>
          </section>
        )}

        {tab === "billing" && (
          <section className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-ink-900 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sample plan</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Growth</h2>
            <p className="mt-1 text-sm text-slate-400">₹2,999 / month · Preview only</p>
            <div className="mt-5 border-t border-white/8 pt-4 text-sm text-slate-300">
              <div className="flex justify-between gap-4 py-2">
                <span>Subscription status</span>
                <span className="text-amber-200">Sample — not billed</span>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <span>Payment method</span>
                <span className="text-slate-400">No payment method</span>
              </div>
            </div>
            <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/[0.06] p-3 text-xs leading-relaxed text-amber-100/80">
              Billing controls are disabled in this preview. No payment, subscription, or account changes can be made here.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

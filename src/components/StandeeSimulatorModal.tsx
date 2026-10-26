import { useState } from "react";
import { cn } from "@/utils/cn";
import { IconCheck, IconClose, IconCopy, IconGoogle, IconSparkles, IconStar } from "./Icons";

interface StandeeSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName?: string;
  category?: string;
  city?: string;
  googleReviewUrl?: string;
}

const TAG_OPTIONS = [
  "Hallmark 916 Gold",
  "Antique Bridal Choker",
  "Transparent Weight",
  "Polite Staff",
  "Fair Making Charges",
  "Best Designs in Nikol",
  "Fast Billing & Tea",
  "Custom Ring Finish",
];

const SAMPLE_REVIEWS: Record<string, Record<number, string[]>> = {
  English: {
    5: [
      "Had a wonderful experience at Virat Gold Palace! Purchased a 916 Hallmark antique bridal necklace for my sister's wedding. The staff was extremely polite, weights were transparently verified on digital scales, and making charges were very fair compared to other jewelers in Nikol.",
      "Best jewelry showroom in Nikol! The collection of antique gold and bridal chokers is magnificent. Very courteous staff and 100% transparent hallmarked gold certification. Highly recommend visiting for festive or bridal shopping!",
    ],
    4: [
      "Great collection of gold and silver jewelry. Staff is knowledgeable and cooperative. Showroom was a bit crowded during the evening rush, but the transparent pricing made it worthwhile.",
    ],
    3: [
      "Collection is decent and gold quality is certified 916, but had to wait 20 minutes for our custom design sizing. Management should add more staff at the billing counter.",
    ],
  },
  Gujarati: {
    5: [
      "વિરાટ ગોલ્ડ પેલેસ નિકોલ ખાતે ખૂબ જ ઉત્તમ અનુભવ રહ્યો! ૯૧૬ હોલમાર્ક દાગીના, પારદર્શક વજન અને વાજબી ઘડામણ ચાર્જિસ. સ્ટાફનું વર્તન અત્યંત વિનમ્ર છે. લગ્નની ખરીદી માટે નિકોલનો શ્રેષ્ઠ શોરૂમ!",
      "ખૂબ જ સુંદર અને અવનવી ડિઝાઇનના એન્ટિક સોનાના દાગીના મળ્યા. હોલમાર્કિંગ અને વજનમાં ૧૦૦% પ્રમાણિકતા. નિકોલમાં દાગીના ખરીદવા માટે વિરાટ ગોલ્ડ પેલેસ ઉત્તમ જગ્યા છે.",
    ],
    4: [
      "દાગીનાની ડિઝાઈન ખૂબ સરસ છે અને સ્ટાફ સારો છે. સાંજ સમયે થોડી ભીડ વધારે રહે છે, પરંતુ ખરીદીનો સંતોષકારક અનુભવ રહ્યો.",
    ],
    3: [
      "ગુણવત્તા સારી છે પરંતુ બિલિંગ કાઉન્ટર પર થોડો સમય વધુ લાગ્યો. સેવા ઝડપી બનાવવી જોઈએ.",
    ],
  },
  Hindi: {
    5: [
      "विराट गोल्ड पैलेस में बहुत ही बेहतरीन अनुभव रहा! 916 हॉलमार्क सोने के आभूषण, बिल्कुल पारदर्शी वजन और बहुत वाजिब मेकिंग चार्जेस। निकोल में शादी की ज्वेलरी खरीदारी के लिए सबसे भरोसेमंद दुकान!",
      "यहाँ के स्टाफ का व्यवहार बहुत आदरपूर्ण है और डिज़ाइन्स एक से बढ़कर एक हैं। शुद्धता और बिलिंग में पूरी पारदर्शिता है। सभी को यहाँ से खरीदारी करने की सलाह दूंगा।",
    ],
    4: [
      "ज्वेलरी का कलेक्शन बहुत अच्छा है और रेट्स वाजिब हैं। शाम को थोड़ा इंतज़ार करना पड़ा, लेकिन अनुभव कुल मिलाकर अच्छा रहा।",
    ],
    3: [
      "सामान अच्छा है पर बिलिंग प्रोसेस थोड़ा तेज होना चाहिए।",
    ],
  },
};

export default function StandeeSimulatorModal({
  isOpen,
  onClose,
  businessName = "Virat Gold Palace",
  category = "Jewellery Showroom",
  city = "Nikol, Ahmedabad",
  googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJsb1wW-SGXjkRe7qGdU1713c",
}: StandeeSimulatorModalProps) {
  const [stars, setStars] = useState(5);
  const [lang, setLang] = useState<"English" | "Gujarati" | "Hindi">("Gujarati");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Hallmark 916 Gold",
    "Transparent Weight",
    "Polite Staff",
  ]);
  const [reviewText, setReviewText] = useState(SAMPLE_REVIEWS["Gujarati"][5][0]);
  const [copied, setCopied] = useState(false);
  const [privateFeedbackSubmitted, setPrivateFeedbackSubmitted] = useState(false);
  const [privateMsg, setPrivateMsg] = useState("");

  if (!isOpen) return null;

  const handleStarSelect = (rating: number) => {
    setStars(rating);
    if (rating >= 4) {
      const options = SAMPLE_REVIEWS[lang][rating] || SAMPLE_REVIEWS[lang][5];
      setReviewText(options[0]);
    }
  };

  const handleTagToggle = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(next);

    // regenerate draft based on selections
    const drafts = SAMPLE_REVIEWS[lang][stars >= 4 ? stars : 5];
    const index = next.length % drafts.length;
    setReviewText(drafts[index]);
  };

  const handleLangChange = (newLang: "English" | "Gujarati" | "Hindi") => {
    setLang(newLang);
    const drafts = SAMPLE_REVIEWS[newLang][stars >= 4 ? stars : 5];
    setReviewText(drafts[0]);
  };

  const handleCopyAndPost = () => {
    navigator.clipboard.writeText(reviewText);
    setCopied(true);
    setTimeout(() => {
      window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
      setCopied(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-white/12 bg-ink-900 p-5 sm:p-6 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.95)]">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-slate-400">
              zentap.in/r/virat · Standee Simulator
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {/* Business header */}
        <div className="mt-4 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 via-brand-500/30 to-cyan-400/20 text-amber-300 ring-1 ring-amber-400/40">
            <span className="font-display font-black text-xl">V</span>
          </div>
          <h3 className="mt-2 text-lg font-bold text-white">{businessName}</h3>
          <p className="text-xs text-slate-400">
            {category} · {city}
          </p>
        </div>

        {/* 14-day Anti-Gating Compliant Review Loop */}
        <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            How was your showroom experience?
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => handleStarSelect(s)}
                className="group p-1 transition-transform hover:scale-125 focus:outline-none"
              >
                <IconStar
                  className={cn(
                    "h-8 w-8 transition-colors",
                    s <= stars
                      ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] fill-amber-400"
                      : "text-slate-700 hover:text-slate-500",
                  )}
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {stars === 5
              ? "★★★★★ Excellent — AI will draft your 5-star review below"
              : stars === 4
                ? "★★★★☆ Good — Quick review draft below"
                : "★ to ★★★ Help us improve — Direct message to the owner"}
          </p>
        </div>

        {stars >= 4 ? (
          /* High rating: AI Review Draft for Google */
          <div className="mt-4 space-y-3">
            {/* Language toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Review Language
              </span>
              <div className="inline-flex rounded-lg border border-white/10 bg-ink-950 p-0.5">
                {(["Gujarati", "English", "Hindi"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangChange(l)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] font-medium rounded-md transition",
                      lang === l
                        ? "bg-brand-500 text-white shadow-sm"
                        : "text-slate-400 hover:text-white",
                    )}
                  >
                    {l === "Gujarati" ? "ગુજરાતી" : l === "Hindi" ? "हिन्दी" : "English"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick tags */}
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                What did you like best? (Click to include)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TAG_OPTIONS.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] transition border",
                        active
                          ? "border-brand-400/40 bg-brand-500/20 text-brand-200"
                          : "border-white/8 bg-white/[0.02] text-slate-400 hover:text-slate-200",
                      )}
                    >
                      {active ? "✓ " : "+ "}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Draft Box */}
            <div className="relative rounded-2xl border border-brand-400/30 bg-ink-950/70 p-3.5 shadow-inner">
              <div className="flex items-center justify-between pb-2 text-[11px] text-brand-300 font-medium border-b border-white/6">
                <span className="inline-flex items-center gap-1.5">
                  <IconSparkles className="h-3.5 w-3.5" />
                  AI Suggested Review
                </span>
                <span className="text-[10px] text-slate-500">Ready to post</span>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="mt-2 w-full bg-transparent text-xs text-white leading-relaxed resize-none focus:outline-none"
              />
            </div>

            {/* Copy and Open Google Review */}
            <button
              onClick={handleCopyAndPost}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(99,102,241,0.7)] transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {copied ? (
                <>
                  <IconCheck className="h-4 w-4" /> Copied! Opening Google...
                </>
              ) : (
                <>
                  <IconGoogle className="h-4 w-4" /> Copy & Post on Google Reviews
                </>
              )}
            </button>
            <p className="text-center text-[10.5px] text-slate-500">
              One tap copies your review and opens Virat Gold Palace Google Reviews page.
            </p>
          </div>
        ) : (
          /* Low rating: Private feedback loop to owner */
          <div className="mt-4 space-y-3">
            {privateFeedbackSubmitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <IconCheck className="h-5 w-5" />
                </span>
                <p className="mt-2 text-sm font-semibold text-white">Thank you for your honesty</p>
                <p className="mt-1 text-xs text-slate-300">
                  Your feedback has been sent directly to the owner of Virat Gold Palace. They will
                  address this personally.
                </p>
                <button
                  onClick={() => window.open(googleReviewUrl, "_blank", "noopener,noreferrer")}
                  className="mt-4 text-[11px] text-slate-400 underline hover:text-white"
                >
                  Still want to write a public Google review? Click here
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3">
                  <p className="text-xs text-rose-200">
                    We sincerely apologize that your visit wasn't 5-star. Please tell the owner
                    directly so we can make it right.
                  </p>
                </div>
                <textarea
                  value={privateMsg}
                  onChange={(e) => setPrivateMsg(e.target.value)}
                  placeholder="What went wrong with your visit or jewelry order? (Sent privately to the owner)..."
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-ink-950 p-3 text-xs text-white placeholder:text-slate-600 focus:border-brand-400/60 focus:outline-none"
                />
                <button
                  onClick={() => setPrivateFeedbackSubmitted(true)}
                  disabled={!privateMsg.trim()}
                  className="w-full rounded-xl bg-ink-800 border border-white/10 py-2.5 text-xs font-semibold text-white transition hover:bg-ink-700 disabled:opacity-50"
                >
                  Send Private Feedback to Owner
                </button>
                <div className="text-center">
                  <button
                    onClick={() => window.open(googleReviewUrl, "_blank", "noopener,noreferrer")}
                    className="text-[11px] text-slate-500 underline hover:text-slate-300"
                  >
                    Or proceed to public Google review
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

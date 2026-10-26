import { Reveal, Section, SectionHeading } from "./ui";
import { IconArrow, IconCheck, IconClose } from "./Icons";

const BEFORE = [
  "Staff awkwardly begging customers to leave a review",
  "Customers say 'sure, later' and forget the moment they leave",
  "Unhappy customers post 1-star ratings directly on Google Maps",
  "Competitors rank above your showroom in local Google searches",
  "No time to respond to existing reviews, hurting your SEO",
];

const AFTER = [
  "Customers tap their phone in 5 seconds while their bill is printed",
  "AI pre-drafts 5-star reviews in English, Gujarati, or Hindi",
  "Unhappy feedback is routed to your private WhatsApp, not Google",
  "Your showroom ranks #1 on Google Maps in your neighborhood",
  "AI automatically thanks every reviewer on Google within 15 minutes",
];

export default function Benefits() {
  return (
    <Section id="benefits" className="bg-slate-50">
      <SectionHeading
        eyebrow="Commercial Difference"
        title="What Changes When Reviews"
        highlight="Run on Autopilot"
        copy="Same counter, same customers — a radically higher Google Maps ranking and 35%+ more footfall."
        icon={<span className="text-blue-600">⚖</span>}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Without Zentap */}
        <Reveal dir="left">
          <div className="h-full rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-800 uppercase tracking-wider">
              ❌ Without Zentap Standee
            </span>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Slow Review Growth & Staff Burden</h3>
            <ul className="mt-6 space-y-3.5">
              {BEFORE.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-700">
                    <IconClose className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-rose-50/70 border border-rose-200/80 p-4 text-xs text-rose-900 font-semibold">
              ⚠️ Result: Barely 2–3 reviews per month, competitors capture nearby search footfall.
            </div>
          </div>
        </Reveal>

        {/* With Zentap */}
        <Reveal dir="right" delay={90}>
          <div className="h-full rounded-3xl border-2 border-blue-600 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800 uppercase tracking-wider">
                ✅ With Zentap Smart Standee
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                4.9 ★ Rating
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">30 to 50+ Verified 5-Star Reviews Monthly</h3>

            <ul className="mt-6 space-y-3.5">
              {AFTER.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-slate-800 font-medium">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-blue-50/80 border border-blue-200 p-4 text-xs text-blue-950 font-bold flex items-center justify-between">
              <span>🚀 Result: #1 spot on Google Maps and +35% walk-in customers!</span>
              <span className="text-emerald-700 font-mono font-black text-sm">₹2,999/mo</span>
            </div>

            <a
              href="#pricing"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              Compare Plans & Order Standee
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

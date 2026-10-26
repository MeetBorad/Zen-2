import { Reveal, Section, SectionHeading } from "./ui";
import { IconCheck } from "./Icons";

const FEATURED = {
  quote:
    "Within 45 days of placing the smart acrylic standee on our billing counter, we received over 34 verified 5-star Google reviews! Our staff used to awkwardly beg customers, but now customers happily tap their phones while paying. In Nikol, anyone searching for jewellery sees Virat Gold Palace first. It pays for itself multiple times over!",
  nativeNote:
    "“કાઉન્ટર પર સ્ટેન્ડી મૂક્યા પછી ૩૪ થી વધુ ૫-સ્ટાર રિવ્યુ આવ્યા — પૈસા વસૂલ સર્વિસ છે!”",
  name: "Harshil Vora",
  role: "Showroom Owner",
  business: "Virat Gold Palace, Nikol, Ahmedabad",
  metric: "+34 Verified Reviews",
  rating: "4.9 ★ on Google Maps",
};

const TESTIMONIALS = [
  {
    quote:
      "Collecting reviews from industrial B2B clients used to be tough. The smart standee made it effortless for technical clients to review us in English and Hindi. Our brand credibility has surged.",
    name: "Ketan Shah",
    role: "Director",
    business: "Digitronics Control, Ahmedabad",
    metric: "4.9 ★ Rating",
  },
  {
    quote:
      "Bridal makeover clients happily tap the standee at checkout. Staff doesn't need to remind anyone. And AI auto-replies to every review on Google within 15 minutes. Truly seamless!",
    name: "Sneha Patel",
    role: "Bridal Stylist & Owner",
    business: "Aura Bridal Studio & Spa, Nikol",
    metric: "100% Positive Feedback",
  },
  {
    quote:
      "If a customer ever has an issue, it routes to my private WhatsApp instead of public Google Maps. That gives me a chance to resolve it directly while keeping our public rating at 4.9★.",
    name: "Bhavin Patel",
    role: "Managing Partner",
    business: "Nilkanth Jewellers, Nikol Gam Road",
    metric: "Zero Negative Spills",
  },
  {
    quote:
      "Young guests at our cafe love tapping the counter standee. We gathered 44+ reviews in just 3 weeks and noticed a distinct jump in walk-ins searching on Google Maps!",
    name: "Mihir Desai",
    role: "Co-founder",
    business: "Cafe De Bella & Bakers, Ahmedabad",
    metric: "+35% Walk-in Footfall",
  },
];

function Stars() {
  return (
    <span className="flex text-amber-500 text-sm" aria-label="5 out of 5 stars">
      {"★★★★★"}
    </span>
  );
}

export default function Testimonials() {
  return (
    <Section id="stories" className="bg-white">
      <SectionHeading
        eyebrow="Local Client Proof"
        title="Proven by Top Showrooms"
        highlight="Across Ahmedabad & Gujarat"
        copy="Hear from local showroom owners who placed our smart standees on their counters."
        icon={<span className="text-amber-500">★</span>}
      />

      {/* Featured Anchor Client: Virat Gold Palace */}
      <Reveal delay={100}>
        <div className="mt-12 rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <Stars />
                <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-900">
                  {FEATURED.metric}
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-800">
                  {FEATURED.rating}
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium leading-relaxed text-slate-800">
                “{FEATURED.quote}”
              </blockquote>
              <p className="text-xs text-amber-900 font-semibold italic">
                {FEATURED.nativeNote}
              </p>

              <div className="pt-2 border-t border-amber-200/60 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-500 text-white font-bold text-sm">
                  VG
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{FEATURED.name}</p>
                  <p className="text-xs text-slate-600">{FEATURED.business}</p>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Google Maps Result</p>
              <p className="font-mono text-3xl font-black text-amber-600 mt-2">4.9 ★</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">#1 Jeweller in Nikol, Ahmedabad</p>
              <div className="mt-3 pt-3 border-slate-100 text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                <IconCheck className="h-3.5 w-3.5" /> Verified Local Merchant
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Grid of Other Local Merchants */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t, idx) => (
          <Reveal key={t.name} delay={idx * 80}>
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-white h-full">
              <div>
                <div className="flex items-center justify-between">
                  <Stars />
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {t.metric}
                  </span>
                </div>
                <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-slate-700 font-medium">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/70">
                <p className="font-bold text-slate-900 text-xs">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.business}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

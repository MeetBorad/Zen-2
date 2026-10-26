import { useCountUp } from "@/lib/hooks";
import { Section, SectionHeading, Reveal } from "./ui";

const STATS = [
  {
    target: 42,
    suffix: "+",
    label: "Monthly 5-Star Reviews",
    sub: "Average review growth per counter. Staff doesn't need to ask or chase customers.",
    decimals: 0,
    color: "text-amber-600",
  },
  {
    target: 1,
    suffix: " Rank",
    label: "Top Spot on Google Maps",
    sub: "Whenever local buyers search for your retail showroom category in your area.",
    decimals: 0,
    color: "text-blue-600",
  },
  {
    target: 35,
    suffix: "%",
    label: "Walk-in Footfall Increase",
    sub: "88% of local buyers check Google reviews before visiting a jewellery store or salon.",
    decimals: 0,
    color: "text-emerald-600",
  },
  {
    target: 99,
    suffix: "₹ / day",
    label: "100% Guaranteed ROI",
    sub: "Just 1 extra customer covers the entire month's standee subscription cost.",
    decimals: 0,
    color: "text-indigo-600",
  },
];

function StatCard({
  target,
  suffix,
  label,
  sub,
  decimals,
  color,
  i,
}: (typeof STATS)[number] & { i: number }) {
  const { ref, value } = useCountUp(target, 1500);
  const display = value.toFixed(decimals);
  return (
    <Reveal delay={i * 80}>
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-400">
        <p className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          <span ref={ref}>{display}</span>
          <span className={color}>{suffix}</span>
        </p>
        <p className="mt-3 text-sm font-bold text-slate-900">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">{sub}</p>
      </div>
    </Reveal>
  );
}

export default function Stats() {
  return (
    <Section id="results" className="pt-4 sm:pt-6 bg-slate-50">
      <SectionHeading
        eyebrow="Commercial Proof (Results)"
        title="Numbers Local Business Owners"
        highlight="Actually Feel"
        copy="Real metrics tracked across active retail counters in Ahmedabad, Surat, and Gujarat."
        icon={<span className="text-amber-500">★</span>}
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} i={i} />
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-center max-w-2xl mx-auto">
        <p className="text-xs sm:text-sm font-semibold text-blue-900">
          💡 <strong>Merchant Guarantee:</strong> If you don't see a measurable increase in verified Google reviews within your first 14 days, you can pause or cancel anytime.
        </p>
      </div>
    </Section>
  );
}

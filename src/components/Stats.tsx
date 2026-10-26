import { useCountUp } from "@/lib/hooks";
import { Section, SectionHeading, Reveal } from "./ui";

const STATS = [
  {
    target: 42,
    suffix: "+",
    label: "નવા 5-Star ગૂગલ રિવ્યુ",
    sub: "દર મહિને એવરેજ રિવ્યુ વૃદ્ધિ (તમારા સ્ટાફે કોઈને રિક્વેસ્ટ કરવી નહીં પડે)",
    decimals: 0,
    color: "text-amber-600",
  },
  {
    target: 1,
    suffix: " રેન્ક",
    label: "Google Maps પર ટોપ પોઝિશન",
    sub: "જ્યારે પણ કોઈ નિકોલ કે અમદાવાદમાં તમારી કેટેગરી સર્ચ કરે ત્યારે",
    decimals: 0,
    color: "text-blue-600",
  },
  {
    target: 35,
    suffix: "%",
    label: "નવા ગ્રાહકોમાં વધારો (Walk-ins)",
    sub: "88% લોકલ ગ્રાહકો દુકાને જતાં પહેલાં ગૂગલ રેટિંગ્સ ચેક કરે છે",
    decimals: 0,
    color: "text-emerald-600",
  },
  {
    target: 99,
    suffix: "₹/દિવસ",
    label: "રોકાણ સામે ૧૦૦% વળતર",
    sub: "માત્ર ૧ નવો ગ્રાહક આવે એટલે આખા મહિનાનો સ્ટેન્ડી ખર્ચ વસૂલ થઈ જાય છે",
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
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-400">
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
        eyebrow="વાસ્તવિક પરિણામો (Proven Results)"
        title="સ્થાનિક વેપારીઓ માટે"
        highlight="સાચો ફાયદો"
        copy="Zentap સ્ટેન્ડી તમારા કાઉન્ટર પર મૂકવાથી બિઝનેસમાં સીધો કેટલો ફાયદો થાય છે તે આ આંકડા દર્શાવે છે."
        icon={<span className="text-amber-500">★</span>}
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} i={i} />
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-center max-w-2xl mx-auto">
        <p className="text-xs sm:text-sm font-semibold text-blue-900">
          💡 <strong>વેપારી ભાઈઓ માટે ખાસ ગેરંટી:</strong> જો તમારા કાઉન્ટર પર સ્ટેન્ડી મૂક્યા પછી ૧૪ દિવસમાં રિવ્યુમાં વધારો ન દેખાય, તો તમે ગમે ત્યારે પ્લાન કેન્સલ કરી શકો છો.
        </p>
      </div>
    </Section>
  );
}

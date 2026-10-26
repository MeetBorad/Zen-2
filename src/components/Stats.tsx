import { useCountUp } from "@/lib/hooks";
import { Section, SectionHeading, Reveal } from "./ui";

const STATS = [
  { target: 38, suffix: "%", label: "More Google reviews", sub: "median lift within 90 days of standee placement", decimals: 0 },
  { target: 3, suffix: " min", label: "Average reply time", sub: "AI drafts, approves and publishes on your behalf", decimals: 0 },
  { target: 62, suffix: "%", label: "Pilot → paid", sub: "of businesses that finish the 14-day pilot subscribe", decimals: 0 },
  { target: 99.9, suffix: "%", label: "Platform uptime", sub: "webhooks, review worker and print bridge monitored", decimals: 1 },
];

function Stat({
  target,
  suffix,
  label,
  sub,
  decimals,
  i,
}: (typeof STATS)[number] & { i: number }) {
  const { ref, value } = useCountUp(target, 1700);
  const display = value.toFixed(decimals);
  return (
    <Reveal delay={i * 90}>
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] p-6 card-hover hover:-translate-y-1 hover:border-brand-400/30 hover:bg-white/[0.05]">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <p className="font-mono text-[clamp(2rem,4.4vw,2.9rem)] font-semibold leading-none tracking-tight text-white">
          <span ref={ref}>{display}</span>
          <span className="text-gradient-brand">{suffix}</span>
        </p>
        <p className="mt-3 text-[13.5px] font-semibold text-slate-200">{label}</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">{sub}</p>
      </div>
    </Reveal>
  );
}

export default function Stats() {
  return (
    <Section id="results" className="pt-0 sm:pt-0">
      <SectionHeading
        eyebrow="Proof, not promises"
        title="Numbers local owners actually"
        highlight="feel"
        copy="Every metric below is tracked inside Zentap, so you always know what your reputation and your recurring revenue are doing."
        icon={<span className="text-cyan-300">◆</span>}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Stat key={s.label} {...s} i={i} />
        ))}
      </div>
      <Reveal delay={120}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[11.5px] leading-relaxed text-slate-600">
          Figures shown are illustrative benchmarks for demonstration. Your results depend on footfall, review volume and
          how consistently your standees are placed.
        </p>
      </Reveal>
    </Section>
  );
}

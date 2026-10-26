import { Reveal, Section, SectionHeading } from "./ui";
import { IconArrow, IconCheck, IconClose } from "./Icons";

const BEFORE = [
  "Asking regulars to leave reviews, then forgetting",
  "Replies written days later, if at all",
  "Subscriptions reconciled in a spreadsheet",
  "Finding out about failures from customers",
  "Four apps, three logins, one guess",
];

const AFTER = [
  "Standees collect reviews at the moment of delight",
  "AI replies published within minutes, in your voice",
  "Trials, renewals and failures tracked automatically",
  "Alerts land before a complaint ever does",
  "One command center for the whole business",
];

export default function Benefits() {
  return (
    <Section id="benefits">
      <SectionHeading
        eyebrow="The difference"
        title="What changes when reputation"
        highlight="runs itself"
        copy="Same counter, same customers — a very different business."
        icon={<span className="text-emerald-300">◆</span>}
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal dir="left">
          <div className="h-full rounded-3xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Without Zentap</p>
            <h3 className="mt-3 text-[20px] font-semibold text-slate-300">Reputation by accident</h3>
            <ul className="mt-6 space-y-3.5">
              {BEFORE.map((b, i) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[13.5px] leading-relaxed text-slate-400"
                  style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${i * 70}ms both` }}
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-500/10 text-rose-300/80 ring-1 ring-rose-400/20">
                    <IconClose className="h-3 w-3" strokeWidth={2.4} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-2xl border border-white/8 bg-ink-950/50 p-4">
              <p className="font-mono text-[22px] font-semibold text-slate-500">~9 hrs</p>
              <p className="mt-1 text-[12px] text-slate-500">spent each month chasing reviews and reconciling payments</p>
            </div>
          </div>
        </Reveal>

        <Reveal dir="right" delay={90}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-brand-400/30 bg-gradient-to-br from-brand-600/16 via-ink-900/60 to-cyan-500/10 p-6 shadow-[0_40px_100px_-45px_rgba(79,70,229,0.9)] sm:p-8">
            <span aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-200">With Zentap</p>
            <h3 className="relative mt-3 text-[20px] font-semibold text-white">Reputation by design</h3>
            <ul className="relative mt-6 space-y-3.5">
              {AFTER.map((a, i) => (
                <li
                  key={a}
                  className="flex items-start gap-3 text-[13.5px] leading-relaxed text-slate-200"
                  style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${i * 70}ms both` }}
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                    <IconCheck className="h-3 w-3" strokeWidth={2.8} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
            <div className="relative mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
                <p className="font-mono text-[22px] font-semibold text-white">10 min</p>
                <p className="mt-1 text-[12px] text-slate-400">daily founder check-in, from one screen</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
                <p className="font-mono text-[22px] font-semibold text-white">₹2,999</p>
                <p className="mt-1 text-[12px] text-slate-400">flat monthly, everything included</p>
              </div>
            </div>
            <a
              href="#pricing"
              className="group relative mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-100 transition-colors hover:text-white"
            >
              Compare plans
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

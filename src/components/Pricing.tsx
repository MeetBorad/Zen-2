import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading } from "./ui";
import { IconCheck, IconLock, IconShield, IconZap } from "./Icons";

const PLANS = [
  {
    name: "Pilot",
    tag: "14 days free",
    monthly: 0,
    annual: 0,
    blurb: "Prove it works on your own counter before you pay anything.",
    cta: "Start the free pilot",
    features: [
      "1 branded NFC + QR standee",
      "Google Business Profile connection",
      "AI reply drafts (your approval)",
      "Scan & review dashboard",
      "Cancel or walk away anytime",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    tag: "Most popular",
    monthly: 2999,
    annual: 2499,
    blurb: "The full reputation engine for a single-location business.",
    cta: "Start 14-day pilot",
    features: [
      "4 standees included, reprints at cost",
      "AI replies published automatically",
      "Private feedback routing",
      "Full Founder Command Center",
      "WhatsApp alerts for issues & reviews",
      "Razorpay + UPI AutoPay billing",
      "Priority support, under 24 hrs",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    tag: "Multi-location",
    monthly: 7499,
    annual: 6249,
    blurb: "For chains, franchises and agencies running many brands.",
    cta: "Talk to us",
    features: [
      "12 standees included",
      "Unlimited locations & merchant IDs",
      "Custom branded artwork & landing pages",
      "API + webhook access",
      "Dedicated onboarding manager",
      "Quarterly reputation reporting",
    ],
    highlight: false,
  },
];

interface PricingProps {
  onSelectPlan?: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="One simple subscription."
        highlight="No surprise invoices."
        copy="Start with a free 14-day pilot. If Zentap doesn't move your reviews, don't subscribe — it's that honest."
        icon={<span className="text-cyan-300">◆</span>}
      />

      <Reveal delay={100}>
        <div className="mt-9 flex items-center justify-center gap-3">
          <span className={cn("text-[13px] font-medium transition-colors", !annual ? "text-white" : "text-slate-500")}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual((a) => !a)}
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            className={cn(
              "relative h-7 w-13 rounded-full border transition-colors duration-300",
              annual ? "border-brand-400/40 bg-brand-500/30" : "border-white/12 bg-white/8",
            )}
            style={{ width: 52 }}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300",
                annual ? "left-[26px]" : "left-0.5",
              )}
            />
          </button>
          <span className={cn("text-[13px] font-medium transition-colors", annual ? "text-white" : "text-slate-500")}>
            Annual
          </span>
          <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
            2 months free
          </span>
        </div>
      </Reveal>

      <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
        {PLANS.map((p, i) => {
          const price = annual ? p.annual : p.monthly;
          return (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500",
                  p.highlight
                    ? "border-brand-400/35 bg-gradient-to-b from-brand-600/20 via-ink-900/70 to-ink-900/40 shadow-[0_40px_100px_-40px_rgba(79,70,229,0.95)] lg:-mt-4 lg:pb-9"
                    : "border-white/8 bg-white/[0.025] hover:-translate-y-1 hover:border-white/20",
                )}
              >
                {p.highlight && (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl"
                    />
                    <span className="absolute right-5 top-5 rounded-full bg-white/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
                      {p.tag}
                    </span>
                  </>
                )}
                <p className="relative text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-200">{p.name}</p>
                <div className="relative mt-4 flex items-end gap-1.5">
                  <span className="font-mono text-[2.6rem] font-semibold leading-none text-white">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                  <span className="pb-1 text-[12.5px] text-slate-400">/month</span>
                </div>
                <p className="relative mt-1.5 text-[11.5px] text-slate-500">
                  {p.monthly === 0
                    ? "No card required · full platform access"
                    : annual
                      ? `Billed annually · ₹${(p.annual * 12).toLocaleString("en-IN")}/year`
                      : "Billed monthly · cancel anytime"}
                </p>
                <p className="relative mt-4 text-[13px] leading-relaxed text-slate-400">{p.blurb}</p>

                <ul className="relative mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                      <span
                        className={cn(
                          "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full",
                          p.highlight ? "bg-brand-400/25 text-brand-100" : "bg-white/8 text-slate-300",
                        )}
                      >
                        <IconCheck className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {onSelectPlan ? (
                  <button
                    onClick={() => onSelectPlan(`${p.name} ₹${price.toLocaleString("en-IN")}`)}
                    className={cn(
                      "relative mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 text-[13.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5",
                      p.highlight
                        ? "bg-[linear-gradient(105deg,#4f46e5,#7c3aed_50%,#0891b2)] text-white shadow-[0_14px_40px_-14px_rgba(124,58,237,0.95)] ring-1 ring-white/20"
                        : "glass text-white hover:bg-white/12",
                    )}
                  >
                    {p.cta}
                  </button>
                ) : (
                  <a
                    href="#start"
                    className={cn(
                      "relative mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 text-[13.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5",
                      p.highlight
                        ? "bg-[linear-gradient(105deg,#4f46e5,#7c3aed_50%,#0891b2)] text-white shadow-[0_14px_40px_-14px_rgba(124,58,237,0.95)] ring-1 ring-white/20"
                        : "glass text-white hover:bg-white/12",
                    )}
                  >
                    {p.cta}
                  </a>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={140}>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: <IconShield className="h-4 w-4" />, t: "No lock-in", s: "Monthly plans, cancel from the dashboard." },
            { icon: <IconZap className="h-4 w-4" />, t: "Hardware included", s: "Standees, artwork and shipping covered." },
            { icon: <IconLock className="h-4 w-4" />, t: "Your data stays yours", s: "Isolated merchant records, exportable anytime." },
          ].map((b) => (
            <div key={b.t} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/8 text-brand-200">{b.icon}</span>
              <div>
                <p className="text-[13px] font-semibold text-white">{b.t}</p>
                <p className="mt-0.5 text-[12px] text-slate-500">{b.s}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

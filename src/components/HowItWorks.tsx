import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading, PrimaryButton } from "./ui";
import { IconNfc, IconSparkles, IconChart, IconRocket, IconArrow } from "./Icons";

const STEPS = [
  {
    n: "01",
    icon: <IconRocket className="h-4 w-4" />,
    title: "We print and ship your standee",
    copy: "Your branded A6 artwork is generated automatically, sent to our print partner and couriered to your counter — usually inside a week.",
  },
  {
    n: "02",
    icon: <IconNfc className="h-4 w-4" />,
    title: "Guests tap or scan at the table",
    copy: "The NFC chip and QR code open your unique review link instantly. No app download, no account, no typing a long URL.",
  },
  {
    n: "03",
    icon: <IconSparkles className="h-4 w-4" />,
    title: "AI replies while you serve",
    copy: "New reviews are detected, a reply is drafted in your tone and published to Google — with an approval queue if you want control.",
  },
  {
    n: "04",
    icon: <IconChart className="h-4 w-4" />,
    title: "You watch reputation compound",
    copy: "Scans, reviews, ratings, subscriptions and standee delivery in one dashboard, so growth stops being a guess.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <Section id="how">
      <SectionHeading
        eyebrow="How it works"
        title="Counter top to top of search,"
        highlight="in four moves"
        copy="Zentap is designed for busy owners. Setup takes minutes, the hardware arrives ready, and the automation runs quietly in the background."
        icon={<span className="text-violet-300">◆</span>}
      />

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* visual */}
        <Reveal dir="left" className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
            <img
              src="https://images.pexels.com/photos/7195809/pexels-photo-7195809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1000"
              alt="Reception counter of a modern local business where a Zentap review standee sits"
              loading="lazy"
              className="h-[320px] w-full object-cover opacity-90 transition-transform duration-[1.4s] hover:scale-105 sm:h-[420px]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(4,6,13,0.15), rgba(4,6,13,0.9))" }}
            />

            {/* pulsing tap point */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-cyan-300/40" />
              <span className="relative grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md">
                <IconNfc className="h-6 w-6 text-white" />
              </span>
            </div>

            <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
              <div className="rounded-2xl border border-white/12 bg-ink-950/70 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-semibold text-white">Today at Nirvana Salon & Spa</p>
                  <span className="font-mono text-[11px] text-emerald-300">live</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { k: "Taps", v: "18" },
                    { k: "Reviews", v: "4" },
                    { k: "Replies", v: "4" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl border border-white/8 bg-white/[0.04] p-2.5">
                      <p className="text-[9.5px] uppercase tracking-wider text-slate-500">{s.k}</p>
                      <p className="mt-0.5 font-mono text-base font-semibold text-white">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* steps */}
        <div>
          <ol className="relative space-y-3">
            <span aria-hidden className="absolute left-[26px] top-4 bottom-8 w-px bg-gradient-to-b from-brand-400/50 via-white/10 to-transparent" />
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <Reveal key={s.n} delay={i * 90}>
                  <li>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-expanded={on}
                      className={cn(
                        "group flex w-full gap-4 rounded-2xl border p-4 text-left transition-all duration-500 sm:p-5",
                        on
                          ? "border-brand-400/30 bg-white/[0.05] shadow-[0_20px_60px_-30px_rgba(99,102,241,0.8)]"
                          : "border-white/8 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.04]",
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl border font-mono text-[12px] font-bold transition-all duration-500",
                          on
                            ? "border-transparent bg-gradient-to-br from-brand-500 to-cyan-400 text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.9)]"
                            : "border-white/12 bg-ink-900 text-slate-400",
                        )}
                      >
                        {s.n}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className={cn("transition-colors", on ? "text-brand-200" : "text-slate-500")}>{s.icon}</span>
                          <span className="text-[15px] font-semibold text-white">{s.title}</span>
                        </span>
                        <span
                          className={cn(
                            "grid overflow-hidden text-[13.5px] leading-relaxed text-slate-400 transition-all duration-500",
                            on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="min-h-0">{s.copy}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={200}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <PrimaryButton href="#pricing" size="md">
                See plans
              </PrimaryButton>
              <a
                href="#command-center"
                className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-slate-300 transition-colors hover:text-white"
              >
                Tour the command center
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

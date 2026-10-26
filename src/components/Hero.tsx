import { Orb, PrimaryButton, Reveal } from "./ui";
import { IconCheck, IconGoogle, IconNfc, IconQr, IconSparkles, IconStar, IconZap } from "./Icons";
import { cn } from "@/utils/cn";

const LOGOS = [
  "Virat Gold Palace (Nikol)",
  "Aditi's Bake Studio",
  "Iron Works Fitness",
  "Nirvana Salon & Spa",
  "Dr. Rao Dental Care",
  "Cafe Koramangala",
  "Le Petit Patisserie",
  "Urban Click Studio",
  "Sharma Electricals",
  "The Loft Cowork",
  "Masala Junction",
];

function StandeeMock({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={cn(
        "animate-float-slow relative w-[168px] rounded-[22px] border border-white/12 bg-gradient-to-b from-white/12 to-white/[0.03] p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:w-[188px] text-left",
        onClick && "cursor-pointer transition-transform hover:scale-105",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-extrabold tracking-tight text-white">
          Zen<span className="text-brand-200">tap</span>
        </span>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
      </div>
      <div className="mt-4 grid place-items-center rounded-2xl bg-white p-2.5">
        <svg viewBox="0 0 40 40" className="h-20 w-20 sm:h-24 sm:w-24" aria-hidden>
          <rect x="2" y="2" width="11" height="11" rx="2.5" fill="#0f172a" />
          <rect x="5" y="5" width="5" height="5" rx="1.2" fill="#fff" />
          <rect x="27" y="2" width="11" height="11" rx="2.5" fill="#0f172a" />
          <rect x="30" y="5" width="5" height="5" rx="1.2" fill="#fff" />
          <rect x="2" y="27" width="11" height="11" rx="2.5" fill="#0f172a" />
          <rect x="5" y="30" width="5" height="5" rx="1.2" fill="#fff" />
          <rect x="24" y="24" width="5" height="5" rx="1" fill="#4f46e5" />
          <rect x="31" y="24" width="5" height="5" rx="1" fill="#4f46e5" />
          <rect x="24" y="31" width="5" height="5" rx="1" fill="#4f46e5" />
          <rect x="16" y="2" width="4" height="4" rx="1" fill="#0f172a" />
          <rect x="20" y="7" width="4" height="4" rx="1" fill="#0f172a" />
          <rect x="16" y="14" width="8" height="8" rx="2" fill="#0f172a" />
          <rect x="2" y="16" width="4" height="4" rx="1" fill="#0f172a" />
          <rect x="9" y="20" width="4" height="4" rx="1" fill="#0f172a" />
          <rect x="27" y="16" width="4" height="4" rx="1" fill="#0f172a" />
          <rect x="34" y="20" width="4" height="4" rx="1" fill="#0f172a" />
          <rect x="16" y="27" width="4" height="4" rx="1" fill="#0f172a" />
          <rect x="16" y="34" width="8" height="4" rx="1" fill="#0f172a" />
        </svg>
      </div>
      <p className="mt-3 text-center text-[11px] font-semibold text-white">Tap or scan to review</p>
      <div className="mt-1 flex items-center justify-center gap-3 text-[10px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <IconNfc className="h-3 w-3" /> NFC
        </span>
        <span className="inline-flex items-center gap-1">
          <IconQr className="h-3 w-3" /> QR
        </span>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[26px] bg-brand-500/25 blur-xl"
      />
    </div>
  );
}

function HeroVisual({ onStandeeClick }: { onStandeeClick?: () => void }) {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[40px] opacity-80"
        style={{
          background:
            "radial-gradient(45% 45% at 30% 20%, rgba(99,102,241,0.35), transparent 70%), radial-gradient(45% 45% at 75% 80%, rgba(34,211,238,0.28), transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div className="relative rounded-[28px] border border-white/10 bg-ink-900/70 p-4 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Reputation this month
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold text-white">4.9</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-1 text-[10.5px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
              ▲ +38 reviews
            </span>
            <p className="mt-1.5 flex items-center justify-end gap-1 text-[10.5px] text-slate-500">
              <IconGoogle className="h-3 w-3" /> Google Business
            </p>
          </div>
        </div>

        <div className="mt-5 flex h-28 items-end gap-1.5 sm:h-32">
          {[28, 34, 30, 44, 52, 47, 62, 58, 74, 68, 86, 96].map((h, i) => (
            <div
              key={i}
              className="group relative flex-1 rounded-t-md bg-gradient-to-t from-brand-600/40 via-brand-400/70 to-cyan-300/90 transition-all duration-500 hover:from-brand-500 hover:to-white"
              style={{ height: `${h}%`, animation: `bar 1.1s cubic-bezier(.16,1,.3,1) ${i * 70}ms both`, transformOrigin: "bottom" }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[9.5px] text-slate-500">
          <span>Week 1</span>
          <span>Week 6</span>
          <span>Week 12</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">AI replies published</p>
            <p className="mt-1 font-mono text-xl font-semibold text-white">36</p>
            <p className="mt-0.5 text-[10px] text-emerald-300">avg. 3 min 12 s</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Standee taps</p>
            <p className="mt-1 font-mono text-xl font-semibold text-white">2,413</p>
            <p className="mt-0.5 text-[10px] text-brand-200">61% QR · 39% NFC</p>
          </div>
        </div>
      </div>

      {/* floating standee */}
      <div className="animate-float-slow absolute -bottom-12 -left-4 hidden lg:block" style={{ animationDelay: "0.8s" }}>
        <StandeeMock onClick={onStandeeClick} />
      </div>

      {/* floating AI toast */}
      <div className="animate-float absolute -right-2 top-6 hidden w-[214px] rounded-2xl border border-white/12 bg-ink-850/90 p-3 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:block lg:-right-8">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
            <IconSparkles className="h-3.5 w-3.5" />
          </span>
          <p className="text-[11px] font-semibold text-white">AI reply published</p>
        </div>
        <p className="mt-2 text-[10.5px] leading-relaxed text-slate-400">
          “Thank you Karthik! See you at your 6 AM session 💪” — posted to Google in 3 minutes.
        </p>
        <div className="mt-2 flex items-center gap-1 text-[9.5px] text-emerald-300">
          <IconCheck className="h-3 w-3" /> No approval needed
        </div>
      </div>

      {/* floating star chip */}
      <div
        className="animate-float absolute -bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/12 bg-ink-850/90 px-3 py-2 shadow-xl backdrop-blur-xl"
        style={{ animationDelay: "1.4s" }}
      >
        <span className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} className="h-3 w-3 text-amber-300" strokeWidth={0} fill="currentColor" />
          ))}
        </span>
        <span className="font-mono text-[11px] text-white">+38</span>
      </div>
    </div>
  );
}

interface HeroProps {
  onOpenOnboarding?: () => void;
  onOpenMerchantLogin?: () => void;
  onOpenStaffLogin?: () => void;
  onOpenStandeeSimulator?: () => void;
}

export default function Hero({
  onOpenOnboarding,
  onOpenMerchantLogin,
  onOpenStaffLogin,
  onOpenStandeeSimulator,
}: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:pb-24 lg:pt-44">
      <Orb className="-left-24 -top-24" color="brand" size={620} />
      <Orb className="right-[-8rem] top-10" color="aqua" size={520} delay={4000} />
      <Orb className="left-1/3 top-[28rem]" color="violet" size={480} delay={8000} />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 mask-fade-b opacity-40" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11.5px] font-medium text-slate-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Now onboarding businesses across 12 Indian cities
              <span aria-hidden className="text-slate-500">→</span>
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 text-[clamp(2.35rem,6.2vw,4.35rem)] font-extrabold leading-[1.02] text-white">
              Turn every walk-in
              <br />
              into a <span className="text-gradient">5-star review.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-slate-400 sm:text-[17px]">
              Zentap is the AI growth OS for local business. NFC & QR standees capture reviews at the table, AI writes
              and publishes your replies, private feedback protects your rating — and one ₹2,999/month subscription runs
              the whole engine.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {onOpenOnboarding && (
                <button
                  onClick={onOpenOnboarding}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(105deg,#4f46e5,#7c3aed_50%,#0891b2)] px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_14px_40px_-14px_rgba(79,70,229,0.95)] ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(79,70,229,1)]"
                >
                  Start 14-day free pilot
                </button>
              )}
              {onOpenMerchantLogin && (
                <button
                  onClick={onOpenMerchantLogin}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3.5 text-[14px] font-semibold text-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500/20"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Merchant Sign In & Test Demo</span>
                </button>
              )}
              {onOpenStandeeSimulator && (
                <button
                  onClick={onOpenStandeeSimulator}
                  className="group inline-flex items-center justify-center gap-2 rounded-full glass px-5 py-3.5 text-[14px] font-semibold text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <IconQr className="h-4 w-4 text-brand-200" />
                  <span>Test Standee (/r/virat)</span>
                </button>
              )}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-slate-500">
              {["No card required for the pilot", "₹2,999/month after your pilot", "Cancel anytime"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <IconCheck className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.4} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={220} dir="scale">
          <HeroVisual onStandeeClick={onOpenStandeeSimulator} />
        </Reveal>
      </div>

      {/* logo marquee */}
      <div className="relative mx-auto mt-20 w-full max-w-7xl sm:mt-24">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Trusted by local businesses that live on their reputation
          </p>
        </Reveal>
        <div className="mask-fade-x relative mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 sm:gap-14">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span
                key={l + i}
                className={cn(
                  "font-display whitespace-nowrap text-[15px] font-semibold text-slate-600 transition-colors duration-300 hover:text-slate-300 sm:text-[17px]",
                )}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

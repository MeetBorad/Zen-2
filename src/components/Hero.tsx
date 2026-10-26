import { Reveal } from "./ui";
import { IconCheck } from "./Icons";
import StandeePreviewCarousel from "./StandeePreviewCarousel";

const LOGOS = [
  "Virat Gold Palace (Nikol, Ahmedabad)",
  "Digitronics Control (Ahmedabad)",
  "Aura Bridal Studio & Spa (Nikol)",
  "Nilkanth Jewellers (Nikol Gam Road)",
  "Cafe De Bella & Bakers (Ahmedabad)",
  "Sharma Electricals (Ahmedabad)",
  "Dr. Rao Dental Clinic (Ahmedabad)",
  "Aditi's Bake Studio",
  "Nirvana Luxury Spa",
];

interface HeroProps {
  onOpenAuth: () => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-slate-50 px-4 pb-16 pt-28 sm:px-8 sm:pt-36 lg:pb-24 lg:pt-40">
      {/* Subtle business grid */}
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 mask-fade-b opacity-60" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          {/* Eyebrow badge */}
          <Reveal>
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1.5 text-xs font-bold text-blue-900 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Smart Countertop Standee for Indian Retail & Showrooms</span>
            </div>
          </Reveal>

          {/* Main English Headline */}
          <Reveal delay={80}>
            <h1 className="mt-5 text-[clamp(2.1rem,4.8vw,3.6rem)] font-black leading-[1.12] text-slate-900 tracking-tight">
              Turn Every Walk-in Customer into a{" "}
              <span className="text-amber-600 underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8">
                5-Star Google Review.
              </span>
            </h1>
            <p className="mt-4 text-lg sm:text-2xl font-bold text-blue-700">
              One Tap on Your Billing Counter. 30 to 50+ Verified Reviews Every Month.
            </p>
          </Reveal>

          {/* What We Sell & How It Benefits in Clear English */}
          <Reveal delay={150}>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
              <p>
                <strong>We provide a luxury Acrylic Counter Standee (NFC + QR) for your billing desk.</strong>
              </p>
              <p className="text-slate-600 text-sm">
                When a customer pays, they simply tap their phone on the standee. In 1 second, Google Maps opens with a ready-made 5-star review. <strong>Zero awkward begging by your staff!</strong>
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 inline-flex">
                <span>✨</span>
                <span>Supports instant review drafts in <strong>English, ગુજરાતી, and हिंदी</strong></span>
              </div>
            </div>
          </Reveal>

          {/* 3 Core Business Benefits */}
          <Reveal delay={200}>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <span className="text-lg">🏆</span>
                <p className="mt-1 text-xs font-bold text-slate-900">#1 on Google Maps</p>
                <p className="text-[11.5px] text-slate-500 mt-0.5">Rank top when nearby customers search for your store category.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <span className="text-lg">⭐</span>
                <p className="mt-1 text-xs font-bold text-slate-900">30–50+ Reviews Monthly</p>
                <p className="text-[11.5px] text-slate-500 mt-0.5">Customers tap voluntarily while their bill is being printed.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <span className="text-lg">🛡️</span>
                <p className="mt-1 text-xs font-bold text-slate-900">Private Review Shield</p>
                <p className="text-[11.5px] text-slate-500 mt-0.5">Unhappy ratings (1–3★) route to your private WhatsApp, not Google.</p>
              </div>
            </div>
          </Reveal>

          {/* CTAs: Order Standee + WhatsApp Chat */}
          <Reveal delay={260}>
            <div className="mt-7 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenAuth}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                <span>📦 Order Your Counter Standee (Free Delivery)</span>
              </button>
              <a
                href="https://wa.me/918788416911?text=Hello!%20I%20want%20to%20get%20the%20Google%20Review%20Standee%20for%20my%20showroom."
                target="_blank"
                rel="noreferrer"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-sm font-bold text-emerald-900 shadow-xs transition hover:bg-emerald-100"
              >
                <span className="text-base">💬</span>
                <span>WhatsApp: +91 8788416911</span>
              </a>
            </div>
          </Reveal>

          {/* Guarantees */}
          <Reveal delay={310}>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-emerald-600" /> No App Download Needed (iPhone & Android)
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-emerald-600" /> Free BlueDart 48h Courier Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-emerald-600" /> Easy Monthly UPI AutoPay (Cancel Anytime)
              </span>
            </div>
          </Reveal>
        </div>

        {/* Visual Right Side: Standee Carousel Live Preview */}
        <Reveal delay={180} dir="scale">
          <StandeePreviewCarousel />
        </Reveal>
      </div>

      {/* Local Client Showroom Marquee */}
      <div className="relative mx-auto mt-16 w-full max-w-7xl sm:mt-20">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500">
          Trusted by top showrooms across Ahmedabad, Nikol, Surat & Gujarat
        </p>
        <div className="mask-fade-x relative mt-5 overflow-hidden">
          <div className="flex w-max animate-marquee gap-8 sm:gap-12">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span
                key={l + i}
                className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 shadow-xs"
              >
                📍 {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

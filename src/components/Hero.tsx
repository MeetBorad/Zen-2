import { Reveal } from "./ui";
import { IconCheck, IconGoogle, IconNfc, IconQr, IconSparkles, IconStar } from "./Icons";
import { cn } from "@/utils/cn";

const LOGOS = [
  "વિરાટ ગોલ્ડ પેલેસ (Virat Gold Palace - Nikol)",
  "ડિજિટ્રોનિક્સ કંટ્રોલ (Digitronics Control)",
  "ઓરા બ્રાઇડલ સ્ટુડિયો (Aura Bridal Studio)",
  "નિલકંઠ જ્વેલર્સ (Nilkanth Jewellers)",
  "કેફે ડી બેલા (Cafe De Bella & Bakers)",
  "શર્મા ઇલેક્ટ્રિકલ્સ (Sharma Electricals)",
  "ડો. રાવ ડેન્ટલ ક્લિનિક (Dr. Rao Dental Clinic)",
  "અદિતિસ બેક સ્ટુડિયો (Aditi's Bake Studio)",
  "નિર્વાણા સ્પા એન્ડ સલૂન (Nirvana Spa)",
];

interface HeroProps {
  onOpenAuth: () => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-slate-50 px-4 pb-16 pt-28 sm:px-8 sm:pt-36 lg:pb-24 lg:pt-40">
      {/* Subtle background business grid */}
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 mask-fade-b opacity-60" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          {/* Eyebrow badge */}
          <Reveal>
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-amber-300 bg-amber-50/90 px-3.5 py-1.5 text-xs font-bold text-amber-950 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>🇮🇳 અમદાવાદ, સુરત અને ગુજરાતના વેપારીઓ માટે ખાસ સ્માર્ટ સ્ટેન્ડી</span>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={80}>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-black leading-[1.15] text-slate-900 tracking-tight">
              તમારા ગ્રાહકો પાસેથી{" "}
              <span className="text-amber-600 underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8">
                5-Star Google Reviews
              </span>{" "}
              મેળવો — <span className="text-blue-600">માત્ર ૧ ટેપમાં!</span>
            </h1>
            <p className="mt-3 text-base sm:text-xl font-bold text-slate-700">
              Turn Every Happy Walk-in Customer into a 5-Star Google Review.
            </p>
          </Reveal>

          {/* What We Sell & How It Benefits */}
          <Reveal delay={150}>
            <div className="mt-5 rounded-2xl border border-blue-200/80 bg-white p-4 sm:p-5 shadow-sm text-slate-700 text-sm sm:text-[15.5px] leading-relaxed space-y-2">
              <p>
                <strong>અમે તમારા બિલિંગ કાઉન્ટર માટે સ્માર્ટ એક્રેલિક સ્ટેન્ડી (Smart NFC + QR Standee) આપીએ છીએ.</strong>
              </p>
              <p className="text-slate-600 text-[14px]">
                ગ્રાહક ખરીદી પછી માત્ર પોતાનો ફોન સ્ટેન્ડી પર અડાડશે એટલે ગુજરાતી, હિન્દી કે અંગ્રેજીમાં 5-Star રિવ્યુ આપોઆપ લખાઈ જશે અને સીધો Google Maps પર સબમિટ થઈ જશે. <strong>તમારા સ્ટાફે કોઈને રિક્વેસ્ટ કરવાની જરૂર નથી!</strong>
              </p>
            </div>
          </Reveal>

          {/* 3 Core Business Benefits */}
          <Reveal delay={200}>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <span className="text-lg">🏆</span>
                <p className="mt-1 text-xs font-bold text-slate-900">Google પર #1 રેન્કિંગ</p>
                <p className="text-[11.5px] text-slate-500">નિકોલ/અમદાવાદમાં લોકલ કસ્ટમર્સને તમારી દુકાન સૌથી ઉપર દેખાશે.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <span className="text-lg">⭐</span>
                <p className="mt-1 text-xs font-bold text-slate-900">દર મહિને 30-50+ રિવ્યુ</p>
                <p className="text-[11.5px] text-slate-500">ગ્રાહક માત્ર ૫ સેકન્ડમાં ખુશીથી રિવ્યુ પોસ્ટ કરશે.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <span className="text-lg">🛡️</span>
                <p className="mt-1 text-xs font-bold text-slate-900">ખરાબ રિવ્યુથી સુરક્ષા</p>
                <p className="text-[11.5px] text-slate-500">નાખુશ ગ્રાહકનો ફીડબેક ગુગલ પર નહીં, તમારા પર્સનલ WhatsApp પર આવશે.</p>
              </div>
            </div>
          </Reveal>

          {/* CTAs: Order Standee + WhatsApp Chat */}
          <Reveal delay={260}>
            <div className="mt-7 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenAuth}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                <span>📦 સ્ટેન્ડી ઓર્ડર કરો (Free 48h Delivery)</span>
              </button>
              <a
                href="https://wa.me/918788416911?text=Hello%20Zentap!%20I%20want%20to%20get%20Google%20Review%20Standee%20for%20my%20showroom."
                target="_blank"
                rel="noreferrer"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-sm font-bold text-emerald-900 shadow-sm transition hover:bg-emerald-100"
              >
                <span className="text-base">💬</span>
                <span>WhatsApp: +91 8788416911</span>
              </a>
            </div>
          </Reveal>

          {/* Trust Guarantees */}
          <Reveal delay={310}>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-emerald-600" /> કોઈ એપ ડાઉનલોડ કરવી પડતી નથી (No App)
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-emerald-600" /> ₹0 કુરિયર ડિલિવરી (BlueDart)
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-emerald-600" /> UPI AutoPay થી સરળ પેમેન્ટ
              </span>
            </div>
          </Reveal>
        </div>

        {/* Visual Right Side: Real Standee + Phone Mockup */}
        <Reveal delay={180} dir="scale">
          <div className="relative mx-auto w-full max-w-[500px]">
            {/* Card wrapper */}
            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs font-bold text-slate-800">કાઉન્ટર સ્ટેન્ડી લાઈવ પ્રીવ્યૂ (Live Review Demo)</p>
                </div>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                  NFC + QR Technology
                </span>
              </div>

              {/* Physical Standee Image */}
              <div className="mt-4 relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src="/hero-standee.jpg"
                  alt="Zentap Acrylic Smart Countertop Standee for Google Reviews"
                  className="h-48 sm:h-56 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">A6 Acrylic Premium Standee</p>
                    <p className="text-sm font-semibold">કાઉન્ટર પર મૂકો • ગ્રાહક ટેપ કરે એટલે રિવ્યુ શરૂ</p>
                  </div>
                </div>
              </div>

              {/* Live Google Review Simulation Card (Gujarati Review for Virat Gold Palace) */}
              <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 space-y-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white font-bold text-xs">
                      HV
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">હર્ષિલ વોરા (Harshil Vora)</p>
                      <p className="text-[10.5px] text-slate-500">વિરાટ ગોલ્ડ પેલેસ (Nikol, Ahmedabad)</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500 text-sm">
                    {"★★★★★"}
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-slate-800 font-medium">
                  “વિરાટ ગોલ્ડ ખાતે ખૂબ જ ઉત્તમ અનુભવ રહ્યો! ૯૧૬ હોલમાર્ક દાગીના, પારદર્શક વજન અને સ્ટાફની ઉત્તમ સેવા. નિકોલ વિસ્તારમાં સોનાની ખરીદી માટે બેસ્ટ જગ્યા છે.”
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-amber-200/60 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <IconCheck className="h-3.5 w-3.5" /> ગૂગલ પર વેરિફાઇડ પોસ્ટ થયેલ
                  </span>
                  <span className="text-slate-500 font-mono">૧૫ મિનિટમાં AI થેંક યુ રિપ્લાય</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/80">
                  <p className="text-[10.5px] font-bold text-slate-500 uppercase">ગૂગલ રેટિંગ જમ્પ</p>
                  <p className="font-mono text-xl font-black text-slate-900">4.6★ ➔ 4.9★</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">+34 રિવ્યુ માત્ર ૩૦ દિવસમાં</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/80">
                  <p className="text-[10.5px] font-bold text-slate-500 uppercase">નવા ગ્રાહકોની વૃદ્ધિ</p>
                  <p className="font-mono text-xl font-black text-slate-900">+38% Walk-ins</p>
                  <p className="text-[10px] text-blue-600 font-semibold">Google Maps પર #1 રેન્ક</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Local Client Showroom Marquee */}
      <div className="relative mx-auto mt-16 w-full max-w-7xl sm:mt-20">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500">
          અમદાવાદ, નિકોલ, સુરત અને રાજકોટના પ્રતિષ્ઠિત શોરૂમ્સનો ભરોસો
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

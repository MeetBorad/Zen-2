import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading } from "./ui";
import { IconCheck } from "./Icons";

const PLANS = [
  {
    name: "Starter (નાના વેપારીઓ માટે)",
    englishName: "Starter Plan",
    tag: "₹1,000/મહિને",
    price: 1000,
    daily: "માત્ર ₹33/દિવસ",
    blurb: "નાના ક્લિનિક, કાફે કે ૧ કાઉન્ટર વાળી દુકાનો માટે પરફેક્ટ પ્લાન.",
    cta: "ઓર્ડર કરો સ્ટેન્ડી",
    features: [
      "૧ પ્રીમિયમ A6 એક્રેલિક સ્ટેન્ડી (NFC + QR)",
      "ગૂગલ બિઝનેસ પ્રોફાઇલ ૧-ટેપ કનેક્શન",
      "ગુજરાતી, હિન્દી અને અંગ્રેજી AI રિવ્યુ ડ્રાફ્ટ્સ",
      "ફ્રી બ્લુડાર્ટ કુરિયર ડિલિવરી (૪૮ કલાકમાં)",
      "કોઈ લોક-ઇન નથી, ગમે ત્યારે કેન્સલ કરી શકો છો",
    ],
    highlight: false,
  },
  {
    name: "Growth (સૌથી વધુ લોકપ્રિય)",
    englishName: "Growth Plan — Best for Showrooms",
    tag: "Most Popular",
    price: 2999,
    daily: "માત્ર ₹99/દિવસ",
    blurb: "જ્વેલરી શોરૂમ, બ્રાઇડલ સલૂન કે રેસ્ટોરન્ટ માટે સંપૂર્ણ ગૂગલ ગ્રોથ એન્જિન.",
    cta: "ઓર્ડર કરો સ્ટેન્ડી (Most Popular)",
    features: [
      "૪ પ્રીમિયમ A6 એક્રેલિક સ્ટેન્ડી (બિલિંગ, કાઉન્ટર, રિસેપ્શન)",
      "Mode B: ૧૫ મિનિટમાં ગૂગલ પર ઓટોમેટિક AI રિપ્લાય",
      "પ્રાઇવેટ નેગેટિવ રિવ્યુ શિલ્ડ (ખરાબ રિવ્યુ વોટ્સએપ પર ફિલ્ટર)",
      "લાઇવ મર્ચન્ટ ડેશબોર્ડ & રિવ્યુ એનાલિટિક્સ",
      "ગ્રાહકને વોટ્સએપ એલર્ટ્સ & સ્ટેન્ડી ટ્રેકર",
      "Razorpay UPI AutoPay (GPay, PhonePe, Paytm)",
      "પ્રાયોરિટી ફોન & વોટ્સએપ સપોર્ટ (+91 8788416911)",
    ],
    highlight: true,
  },
  {
    name: "Scale (મલ્ટિ-બ્રાન્ચ ચેઇન)",
    englishName: "Scale Plan — Multi-Location",
    tag: "Multi-branch",
    price: 7499,
    daily: "ચેઇન સ્ટોર્સ માટે",
    blurb: "અમદાવાદ, સુરત અને ગુજરાતભરમાં એક કરતાં વધુ શાખાઓ ધરાવતા બિઝનેસ માટે.",
    cta: "વાત કરો અમારી ટીમ સાથે",
    features: [
      "૧૨ પ્રીમિયમ એક્રેલિક સ્ટેન્ડી ઇન્ક્લુડેડ",
      "અમર્યાદિત લોકેશન્સ & બ્રાન્ચ ડેશબોર્ડ",
      "કસ્ટમ બ્રાન્ડેડ આર્ટવર્ક & સ્ટેન્ડી કલર",
      "ડેડિકેટેડ એકાઉન્ટ મેનેજર",
      "GST ઇનવોઇસિંગ & ઓડિટ રિપોર્ટ્સ",
      "વીકલી ગૂગલ મેપ્સ રેન્કિંગ રિપોર્ટ",
    ],
    highlight: false,
  },
];

interface PricingProps {
  onSelectPlan?: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <Section id="pricing" className="bg-slate-50">
      <SectionHeading
        eyebrow="પારદર્શક ભાવ (Transparent Pricing)"
        title="સરળ અને પરવડે તેવો ભાવ."
        highlight="માત્ર ₹1,000/મહિને થી શરૂ"
        copy="કોઈ હિડન ચાર્જ નથી. ૧ નવો ગ્રાહક તમારી દુકાને આવે એટલે આખા મહિનાનો સ્ટેન્ડી ખર્ચ વસૂલ થઈ જાય છે!"
        icon={<span className="text-amber-500">₹</span>}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3 max-w-7xl mx-auto items-stretch">
        {PLANS.map((plan, idx) => (
          <Reveal key={plan.name} delay={idx * 90}>
            <div
              className={cn(
                "relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 h-full transition-all duration-200",
                plan.highlight
                  ? "border-2 border-blue-600 bg-white shadow-xl ring-4 ring-blue-600/10 -translate-y-1"
                  : "border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300",
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white shadow-md uppercase tracking-wider">
                  સૌથી વધુ પસંદ કરાતો પ્લાન (Recommended)
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-bold",
                      plan.highlight ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700",
                    )}
                  >
                    {plan.daily}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 font-mono">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ મહિને (+GST)</span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">{plan.blurb}</p>

                <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">શું મળશે:</p>
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700">
                      <IconCheck className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" strokeWidth={2.5} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectPlan && onSelectPlan(plan.name.split(" ")[0])}
                  className={cn(
                    "w-full rounded-2xl py-3.5 text-sm font-bold shadow-sm transition-all duration-200 active:scale-95",
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200",
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Payment Methods Bar */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 max-w-3xl mx-auto shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">સરળ પેમેન્ટ ઓપ્શન્સ (Payment Options)</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">Google Pay, PhonePe, Paytm, BHIM UPI AutoPay & Netbanking</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
            🔒 256-bit SSL Secure
          </span>
          <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
            ✓ Razorpay Verified
          </span>
        </div>
      </div>
    </Section>
  );
}

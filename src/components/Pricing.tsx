import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading } from "./ui";
import { IconCheck } from "./Icons";

const PLANS = [
  {
    name: "Starter",
    tag: "₹1,000 / mo",
    price: 1000,
    daily: "₹33 / day",
    blurb: "Ideal for single counter clinics, boutique cafes, or small retail outlets.",
    cta: "Order Standee",
    features: [
      "1 Premium A6 Acrylic Standee (NFC + QR)",
      "1-Click Google Business Profile connection",
      "Multilingual AI review drafts (English, Gujarati, Hindi)",
      "Free BlueDart Courier Delivery (within 48 hours)",
      "Cancel or pause anytime with zero lock-in",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    tag: "Most Popular",
    price: 2999,
    daily: "₹99 / day",
    blurb: "The complete Google Maps reputation & footfall engine for retail showrooms.",
    cta: "Order Standees (Most Popular)",
    features: [
      "4 Premium A6 Acrylic Standees (Billing desk, entrance, counters)",
      "Mode B: Automated Google replies published within 15 minutes",
      "Private negative feedback filter (unhappy ratings route to WhatsApp)",
      "Live Merchant Dashboard with scan & review velocity tracking",
      "Free BlueDart Courier Delivery + hardware replacements at cost",
      "Seamless Razorpay UPI AutoPay (PhonePe, GPay, Paytm)",
      "Dedicated WhatsApp Support (+91 8788416911)",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    tag: "Multi-Location",
    price: 7499,
    daily: "For Chains",
    blurb: "For retail chains, jewellery franchises, and multi-branch showrooms.",
    cta: "Talk to Us",
    features: [
      "12 Premium Acrylic Standees included",
      "Unlimited branch locations & centralized dashboard",
      "Custom branded artwork & tailored standee colors",
      "Dedicated Account Manager with quarterly reputation reports",
      "GST Invoicing & automated accounting sync",
      "Weekly Google Maps local ranking audit",
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
        eyebrow="Transparent Commercial Pricing"
        title="One Simple Monthly Subscription."
        highlight="Starting at ₹1,000/mo."
        copy="No hidden fees, no long contracts. Just 1 extra customer covers your entire month's standee cost!"
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
                  : "border border-slate-200 bg-white shadow-xs hover:shadow-md hover:border-slate-300",
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white shadow-md uppercase tracking-wider">
                  Recommended for Showrooms
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
                  <span className="text-sm font-semibold text-slate-500">/ month (+GST)</span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">{plan.blurb}</p>

                <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">What's included:</p>
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
                    "w-full rounded-2xl py-3.5 text-sm font-bold shadow-xs transition-all duration-200 active:scale-95",
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
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Easy UPI AutoPay & Invoicing</p>
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

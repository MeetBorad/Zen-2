import { useState } from "react";
import { cn } from "@/utils/cn";
import { IconCheck, IconClose, IconGoogle, IconLock, IconQr, IconShield, IconSparkles } from "./Icons";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  initialPlan = "Growth ₹2,999",
}: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [businessName, setBusinessName] = useState("Virat Gold Palace");
  const [category, setCategory] = useState("Jewellery Showroom");
  const [city, setCity] = useState("Ahmedabad (Nikol)");
  const [phone, setPhone] = useState("+91 8788416911");
  const [googleConnected, setGoogleConnected] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(
    "Shop 14, Raspan Arcade, Nikol Ring Road, Ahmedabad, Gujarat - 382350",
  );
  const [upiId, setUpiId] = useState("founder@okhdfcbank");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleGoogleConnect = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setGoogleConnected(true);
      setIsSubmitting(false);
      setStep(3);
    }, 900);
  };

  const handleCompleteMandate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/12 bg-ink-900 p-6 sm:p-7 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <IconClose className="h-5 w-5" />
        </button>

        {/* Steps Breadcrumb */}
        {!isCompleted && (
          <div className="mb-6 flex items-center justify-between border-b border-white/8 pb-4">
            {[
              { num: 1, label: "Business" },
              { num: 2, label: "Google API" },
              { num: 3, label: "Standee" },
              { num: 4, label: "UPI Pilot" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition",
                    step === s.num
                      ? "bg-brand-500 text-white shadow-sm ring-2 ring-brand-400/40"
                      : step > s.num
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-ink-800 text-slate-500",
                  )}
                >
                  {step > s.num ? "✓" : s.num}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:inline",
                    step === s.num ? "text-white" : "text-slate-500",
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {isCompleted ? (
          /* Success Screen */
          <div className="text-center py-4 space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/40">
              <IconCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">14-Day Free Pilot Activated!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Welcome to Zentap, <strong className="text-white">{businessName}</strong>. Your custom A6
              NFC+QR standee has been queued for dispatch to Nikol, Ahmedabad. Razorpay UPI AutoPay mandate is set for ₹0 today (renews at ₹2,999/mo on day 15).
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant ID:</span>
                <span className="font-mono text-white">zt_vgp_001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Review URL:</span>
                <span className="font-mono text-brand-300">zentap.in/r/virat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Google Business Profile:</span>
                <span className="text-emerald-400">● Connected & Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Auto Review Reply:</span>
                <span className="text-brand-300">Mode B (Auto for 4★ & 5★)</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              Enter Merchant Dashboard
            </button>
          </div>
        ) : step === 1 ? (
          /* Step 1: Business Details */
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Start your 14-day free pilot</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tell us about your business counter. We'll preconfigure your AI models and standee.
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-400/60 focus:outline-none"
                placeholder="e.g. Virat Gold Palace"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-400/60 focus:outline-none"
                  placeholder="e.g. Jewellery Showroom"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  City / Area
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-400/60 focus:outline-none"
                  placeholder="e.g. Ahmedabad (Nikol)"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                WhatsApp Phone Number (for Review & Approval Alerts)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-400/60 focus:outline-none"
                placeholder="+91 8788416911"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-2 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-400"
            >
              Continue to Google Connection →
            </button>
          </div>
        ) : step === 2 ? (
          /* Step 2: Connect Google Profile */
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Connect Google Business Profile</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                The only official way to read incoming Google reviews and post instant AI replies.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <IconGoogle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">1-Click Google OAuth Consent</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Google provides a secure read/reply token. Zentap encrypts this token with AES-256 and never accesses your personal emails or Google account.
                </p>
              </div>
              <button
                onClick={handleGoogleConnect}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-slate-200"
              >
                {isSubmitting ? (
                  "Connecting to Google Cloud..."
                ) : (
                  <>
                    <IconGoogle className="h-4 w-4" /> Connect with Google
                  </>
                )}
              </button>
            </div>
            <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-3">
              <p className="text-[11.5px] text-amber-200 leading-relaxed">
                <strong>Fallback option:</strong> If your Google API quota is still awaiting approval, you can add <code>manager@zentap.in</code> as a Manager in your Business Profile.
              </p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="text-xs text-brand-300 hover:underline"
              >
                Skip for now →
              </button>
            </div>
          </div>
        ) : step === 3 ? (
          /* Step 3: Standee Shipping Details */
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Custom Acrylic Standee Shipping</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every pilot includes 1 premium A6 acrylic NFC + QR counter standee customized with your shop name.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
              <div className="h-16 w-16 shrink-0 rounded-xl bg-ink-950 flex items-center justify-center border border-white/8">
                <IconQr className="h-8 w-8 text-brand-300" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">A6 Counter Standee (Free)</p>
                <p className="text-slate-400">Embedded NTAG213 NFC chip + Dynamic QR code.</p>
                <p className="text-emerald-400 font-medium mt-1">✓ Printed & Dispatched via BlueDart</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Showroom / Shipping Address
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-400/60 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 rounded-xl bg-brand-500 py-2.5 text-xs font-semibold text-white hover:bg-brand-400"
              >
                Continue to Payment Mandate →
              </button>
            </div>
          </div>
        ) : (
          /* Step 4: Razorpay UPI AutoPay Mandate */
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">14-Day Free Pilot Authorization</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Razorpay Subscriptions (UPI AutoPay / eMandate). Charged ₹0 today. Cancel anytime with one click.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-white/8">
                <span className="text-slate-400">Plan:</span>
                <span className="font-semibold text-white">{initialPlan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trial Period:</span>
                <span className="text-emerald-400 font-semibold">14 Days (100% Free)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Due Today:</span>
                <span className="font-mono text-white font-bold">₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">First Auto-Renewal Date:</span>
                <span className="text-slate-300">Day 15 (₹2,999 + GST)</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                UPI ID for AutoPay Mandate (Google Pay, PhonePe, Paytm, BHIM)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-400/60 focus:outline-none"
                placeholder="yourname@okhdfcbank"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <IconLock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Bank-grade 256-bit encryption. RBI & NPCI compliant.</span>
            </div>
            <button
              onClick={handleCompleteMandate}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:opacity-50"
            >
              {isSubmitting ? "Authorizing Mandate on Razorpay..." : "Authorize ₹0 & Launch Pilot"}
            </button>
            <p className="text-center text-[10.5px] text-slate-500">
              You will receive an instant UPI mandate approval request on your UPI app.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

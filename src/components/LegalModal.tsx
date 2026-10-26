import { IconClose, IconLock, IconShield } from "./Icons";

interface LegalModalProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const isPrivacy = type === "privacy";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-blue-600">
              {isPrivacy ? <IconShield className="h-4 w-4" /> : <IconLock className="h-4 w-4" />}
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isPrivacy ? "Zentap Privacy Policy" : "Zentap Terms of Service"}
              </h3>
              <p className="text-xs text-slate-500">
                Effective Date: October 2026 · Compliance with Google & RBI Regulations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto py-5 pr-2 space-y-4 text-xs text-slate-600 leading-relaxed">
          {isPrivacy ? (
            <>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  1. Google API Limited Use Disclosure
                </h4>
                <p>
                  Zentap's use and transfer to any other app of information received from Google APIs
                  will adhere to Google API Services User Data Policy, including the Limited Use
                  requirements. We strictly request <code>mybusiness.reviews</code> scope exclusively
                  to read customer reviews for your authorized business location and post responses.
                  We never access your Gmail, Google Drive, personal search history, or contacts.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  2. Encryption & Key Storage
                </h4>
                <p>
                  All merchant OAuth refresh tokens and credentials are encrypted using industry-standard
                  AES-256 encryption at rest inside Supabase Vault with strict Row-Level Security
                  (RLS). Tokens are only decrypted on ephemeral serverless workers during scheduled cron runs.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  3. Payment Data Security (Razorpay)
                </h4>
                <p>
                  Zentap does NOT store debit card numbers, credit card CVVs, or bank netbanking credentials
                  on our servers. All recurring mandates and payment processing are handled via PCI-DSS
                  Level 1 certified Razorpay Subscriptions infrastructure.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  4. Reviewer Data & Zero-Sale Guarantee
                </h4>
                <p>
                  We never sell customer or merchant business data to data brokers or advertising networks.
                  End-customer reviews are submitted directly to Google's public servers.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  1. Anti-Review Gating Policy
                </h4>
                <p>
                  Zentap strictly complies with Google's Maps and Business Profile User Contributed Content
                  Policy. Zentap does NOT prohibit or discourage negative reviews, nor does it gate customers
                  away from leaving an authentic Google review. While our platform offers customers with
                  sub-optimal experiences a direct private channel to contact showroom management, every customer
                  maintains an unobstructed path to submit their review directly to Google.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  2. Subscriptions & 14-Day Free Pilot
                </h4>
                <p>
                  New merchants receive a 14-day free pilot with 1 custom acrylic standee included.
                  The pilot requires a ₹0 authorization mandate via Razorpay UPI AutoPay. You may cancel at
                  any time before day 15 from your merchant dashboard with zero charges. After day 14,
                  the subscription auto-renews at the selected plan rate (e.g. ₹2,999/mo + GST) on a monthly basis.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  3. AI Review Reply Guardrails
                </h4>
                <p>
                  Zentap's AI reply engine is programmed with strict guardrails: it will never make
                  unauthorized financial promises (refunds, discounts) or disclose confidential customer
                  records. The merchant retains ultimate authority to configure auto-reply thresholds
                  (Draft Only, Auto for 4-5★, or Full Auto).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  4. Standee Hardware & Fulfilment
                </h4>
                <p>
                  Standees are shipped via verified courier partners (BlueDart / Delhivery). Damaged or
                  defective standees will be reprinted and replaced free of charge within 7 days of delivery.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 hover:bg-slate-200 px-5 py-2 text-xs font-bold text-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

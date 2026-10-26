import { useState } from "react";
import { cn } from "@/utils/cn";
import { IconClose, IconGoogle, IconLock, IconShield, IconSparkles, IconZap } from "./Icons";

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: "merchant" | "staff";
  onClose: () => void;
  onLoginSuccess: (role: "merchant" | "staff") => void;
  onOpenPilot: () => void;
}

export default function AuthModal({
  isOpen,
  initialTab = "merchant",
  onClose,
  onLoginSuccess,
  onOpenPilot,
}: AuthModalProps) {
  const [tab, setTab] = useState<"merchant" | "staff">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staffId, setStaffId] = useState("");
  const [staffKey, setStaffKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleTestMerchantLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess("merchant");
      onClose();
    }, 400);
  };

  const handleTestStaffLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess("staff");
      onClose();
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(tab);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-white/12 bg-ink-900 p-6 sm:p-7 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <IconClose className="h-5 w-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="flex items-center gap-2.5">
          <img
            src="/zentap-logo-white.png"
            alt="Zentap"
            className="h-8 w-8 rounded-xl object-contain shadow-md"
          />
          <span className="font-display text-lg font-black tracking-tight text-white">
            Zen<span className="text-gradient-brand">tap</span>
          </span>
        </div>

        {/* Unified Tab Switcher: Merchant vs Staff Login */}
        <div className="mt-5 grid grid-cols-2 rounded-2xl border border-white/10 bg-ink-950/80 p-1">
          <button
            type="button"
            onClick={() => setTab("merchant")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all",
              tab === "merchant"
                ? "bg-brand-500 text-white shadow-md"
                : "text-slate-400 hover:text-white",
            )}
          >
            <span>🏪 Merchant Account</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("staff")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all",
              tab === "staff"
                ? "bg-cyan-500 text-ink-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white",
            )}
          >
            <IconLock className="h-3 w-3" />
            <span>Staff / Founder</span>
          </button>
        </div>

        {tab === "merchant" ? (
          /* ================= MERCHANT LOGIN ================= */
          <div className="mt-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Merchant Account Sign In</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage your showroom Google reviews, AI auto-replies, standee orders and billing.
              </p>
            </div>

            {/* Test Login Callout Box */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <IconSparkles className="h-4 w-4 text-emerald-400" />
                  Instant Test Login
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  Anchor Customer
                </span>
              </div>
              <p className="mt-1.5 text-[11.5px] text-slate-300 leading-relaxed">
                Click below to test the live merchant portal as <strong>Virat Gold Palace</strong> (Nikol, Ahmedabad) to see how incoming Google reviews, AI replies, and billing appear.
              </p>
              <button
                type="button"
                onClick={handleTestMerchantLogin}
                disabled={isLoading}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-ink-950 shadow-md transition hover:bg-emerald-400 active:scale-[0.99]"
              >
                {isLoading ? "Signing in..." : "⚡ 1-Click Test Login as Virat Gold Palace"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-white/8" />
              <span className="absolute bg-ink-900 px-3 text-[10.5px] uppercase tracking-wider text-slate-500">
                or sign in with password
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Registered WhatsApp or Email
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="viratgold@gmail.com or +91 8788416911"
                  className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-brand-400/60 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("OTP reset sent to registered WhatsApp!"); }} className="text-[11px] text-brand-300 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-brand-400/60 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-white/10 border border-white/12 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                {isLoading ? "Authenticating..." : "Sign In to Merchant Account"}
              </button>
            </form>

            {/* Footer Sign Up Link */}
            <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/6">
              <span>Don't have a Zentap standee yet? </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPilot();
                }}
                className="font-semibold text-brand-300 hover:underline inline-flex items-center gap-1"
              >
                Start 14-day free pilot →
              </button>
            </div>
          </div>
        ) : (
          /* ================= STAFF / FOUNDER LOGIN ================= */
          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 ring-1 ring-cyan-400/30">
                  Internal Staff
                </span>
                <h3 className="text-base font-bold text-white">Founder Command Center</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Administrative root access to manage all customer tenants, MRR, webhooks, and standee print runs.
              </p>
            </div>

            {/* Test Staff Login Callout Box */}
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <IconZap className="h-4 w-4 text-cyan-400" />
                  Staff Demo Access
                </span>
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                  Full Admin Mode
                </span>
              </div>
              <p className="mt-1.5 text-[11.5px] text-slate-300 leading-relaxed">
                Click below to test the <strong>Founder Master Command Center</strong> with multi-tenant metrics across 8 businesses, revenue trends, and operational tasks.
              </p>
              <button
                type="button"
                onClick={handleTestStaffLogin}
                disabled={isLoading}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-400 py-2.5 text-xs font-bold text-ink-950 shadow-md transition hover:bg-cyan-300 active:scale-[0.99]"
              >
                {isLoading ? "Verifying..." : "⚡ 1-Click Staff Test Login (Founder Access)"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-white/8" />
              <span className="absolute bg-ink-900 px-3 text-[10.5px] uppercase tracking-wider text-slate-500">
                or enter staff credentials
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Staff Email or Founder ID
                </label>
                <input
                  type="text"
                  required
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="founder@zentap.ai"
                  className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-cyan-400/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Master Security Key / Hardware 2FA
                </label>
                <input
                  type="password"
                  required
                  value={staffKey}
                  onChange={(e) => setStaffKey(e.target.value)}
                  placeholder="zt_master_••••••••"
                  className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-cyan-400/60 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-white/10 border border-white/12 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                {isLoading ? "Validating Staff Token..." : "Authenticate Staff Console"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

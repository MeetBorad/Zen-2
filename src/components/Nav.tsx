import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useActiveSection, useScrollState } from "@/lib/hooks";
import { IconClose, IconLock, IconMenu, IconQr, IconZap } from "./Icons";

interface NavProps {
  onOpenMerchantLogin: () => void;
  onOpenStaffLogin: () => void;
  onOpenStandeeSimulator: () => void;
  onOpenOnboarding: () => void;
}

const MARKETING_LINKS = [
  { id: "platform", label: "Platform" },
  { id: "how", label: "How it works" },
  { id: "results", label: "Results" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function Nav({
  onOpenMerchantLogin,
  onOpenStaffLogin,
  onOpenStandeeSimulator,
  onOpenOnboarding,
}: NavProps) {
  const { scrolled, progress } = useScrollState(20);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(["platform", "how", "results", "pricing", "faq"]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#platform"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "py-2" : "py-3 sm:py-4",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-500 sm:px-5",
              scrolled
                ? "glass shadow-[0_18px_50px_-25px_rgba(0,0,0,0.95)]"
                : "border border-white/8 bg-ink-950/75 backdrop-blur-xl",
            )}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a href="#top" className="group flex items-center gap-2.5" aria-label="Zentap home">
                <img
                  src="/zentap-logo-white.png"
                  alt="Zentap Logo"
                  className="h-8 w-8 rounded-xl object-contain shadow-[0_4px_16px_-4px_rgba(99,102,241,0.8)] transition-transform duration-300 group-hover:scale-105"
                />
                <span className="font-display text-[18px] font-black tracking-tight text-white">
                  Zen<span className="text-gradient-brand">tap</span>
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              {MARKETING_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors duration-300",
                    active === l.id ? "text-white" : "text-slate-400 hover:text-white",
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gradient-to-r from-brand-300 to-cyan-300 transition-transform duration-300",
                      active === l.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Standee Preview Button */}
              <button
                type="button"
                onClick={onOpenStandeeSimulator}
                className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-[12px] font-semibold text-brand-200 transition hover:bg-brand-500/20"
              >
                <IconQr className="h-3.5 w-3.5 text-brand-300" />
                <span>Standee (/r/virat)</span>
              </button>

              {/* Staff Login Button */}
              <button
                type="button"
                onClick={onOpenStaffLogin}
                className="hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12.5px] font-medium text-slate-400 hover:text-cyan-300 transition-colors"
                title="Staff / Founder Command Center Login"
              >
                <IconLock className="h-3 w-3 text-cyan-400" />
                <span>Staff Login</span>
              </button>

              {/* Unified Sign In / Merchant Account Button */}
              <button
                type="button"
                onClick={onOpenMerchantLogin}
                className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-200 hover:border-white/25 hover:bg-white/10 hover:text-white transition-all shadow-sm"
              >
                Sign In / Merchant
              </button>

              {/* Start Pilot CTA */}
              <button
                type="button"
                onClick={onOpenOnboarding}
                className="group relative hidden sm:inline-flex overflow-hidden rounded-full bg-[linear-gradient(105deg,#4f46e5,#7c3aed_50%,#0891b2)] px-4.5 py-1.5 text-[12.5px] font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,102,241,0.9)] ring-1 ring-white/15 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ paddingLeft: 16, paddingRight: 16 }}
              >
                Start 14-day pilot
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen((o) => !o)}
                className="grid h-9 w-9 place-items-center rounded-xl glass text-white md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* scroll progress */}
          <div className="mt-1.5 h-px w-full overflow-hidden">
            <div
              className="h-full origin-left bg-gradient-to-r from-brand-400 via-violet-400 to-cyan-300 transition-transform duration-150"
              style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink-950/80 backdrop-blur-md transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-3 top-20 rounded-3xl border border-white/10 bg-ink-900/95 p-5 shadow-2xl transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          )}
        >
          <nav className="flex flex-col mb-4" aria-label="Mobile">
            {MARKETING_LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="border-b border-white/6 py-3 text-[14px] font-medium text-slate-200 transition-colors last:border-0 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-white/8">
            <button
              onClick={() => {
                setOpen(false);
                onOpenMerchantLogin();
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-white"
            >
              <span>🏪 Sign In / Merchant Account (with Test Login)</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                onOpenStaffLogin();
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 py-2.5 text-xs font-semibold text-cyan-300"
            >
              <IconLock className="h-3.5 w-3.5" />
              <span>Staff Login (Founder Command)</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                onOpenStandeeSimulator();
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-brand-400/30 bg-brand-500/10 py-2.5 text-xs font-semibold text-brand-200"
            >
              <IconQr className="h-4 w-4" />
              <span>Customer Standee Experience (/r/virat)</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                onOpenOnboarding();
              }}
              className="block rounded-xl bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-500 py-3 text-center text-xs font-semibold text-white shadow-lg"
            >
              Start 14-day free pilot
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

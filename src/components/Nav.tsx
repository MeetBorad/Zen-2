import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useActiveSection, useScrollState } from "@/lib/hooks";
import { IconClose, IconMenu } from "./Icons";

interface NavProps {
  onOpenAuth: () => void;
  currentUser?: any;
  onOpenDashboard?: () => void;
}

const MARKETING_LINKS = [
  { id: "how", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "results", label: "Results" },
  { id: "benefits", label: "Benefits" },
  { id: "stories", label: "Client Proof" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function Nav({ onOpenAuth, currentUser, onOpenDashboard }: NavProps) {
  const { scrolled } = useScrollState(20);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(["how", "features", "results", "benefits", "stories", "pricing", "faq"]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#how"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled ? "py-2" : "py-3 sm:py-4",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-5",
              scrolled
                ? "bg-white/95 border border-slate-200 shadow-md backdrop-blur-xl"
                : "bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-md",
            )}
          >
            {/* Logo & Region Badge */}
            <div className="flex shrink-0 items-center gap-3">
              <a href="#top" className="group flex items-center gap-2.5" aria-label="Zentap home">
                <img
                  src="/zentap-logo.png"
                  alt="Zentap Logo"
                  className="h-8 w-8 rounded-xl object-contain shadow-sm transition-transform duration-200 group-hover:scale-105"
                />
                <span className="font-display text-[19px] font-black tracking-tight text-slate-900">
                  Zen<span className="text-blue-600">tap</span>
                </span>
              </a>
              <span className="hidden xl:inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                🇮🇳 Trusted by 50+ Showrooms in Ahmedabad & Gujarat
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {MARKETING_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200",
                    active === l.id ? "text-blue-700 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                  )}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Actions: WhatsApp Helpline + Merchant Account */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href="https://wa.me/918788416911?text=Hello%20Zentap!%20I%20want%20to%20know%20about%20the%20Google%20Review%20Standee%20for%20my%20business."
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 shadow-sm"
              >
                <span className="text-sm">💬</span>
                <span>WhatsApp: +91 8788416911</span>
              </a>

              {currentUser ? (
                <button
                  type="button"
                  onClick={onOpenDashboard || onOpenAuth}
                  className="min-h-10 whitespace-nowrap rounded-full bg-blue-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 flex items-center gap-1.5"
                >
                  <span>🏬</span>
                  <span className="max-w-[120px] truncate sm:max-w-[160px]">
                    {currentUser?.user_metadata?.business_name || "Merchant Dashboard"}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="min-h-10 whitespace-nowrap rounded-full bg-blue-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                >
                  Sign In / Order Standee
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen((o) => !o)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-100 text-slate-800 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu modal */}
        {open && (
          <div className="fixed inset-0 top-[65px] z-50 bg-white/98 p-6 backdrop-blur-2xl lg:hidden flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                🇮🇳 Trusted by 50+ Showrooms in Gujarat
              </span>
              <nav className="flex flex-col space-y-2 pt-2">
                {MARKETING_LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-200">
              <a
                href="https://wa.me/918788416911?text=Hello%20Zentap!%20I%20want%20to%20know%20about%20the%20Google%20Review%20Standee."
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 py-3.5 text-sm font-bold text-emerald-800 shadow-sm"
              >
                <span>💬</span>
                <span>WhatsApp: +91 8788416911</span>
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenAuth();
                }}
                className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md"
              >
                Sign In / Order Standee
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

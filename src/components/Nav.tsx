import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useActiveSection, useScrollState } from "@/lib/hooks";
import { IconClose, IconMenu } from "./Icons";

interface NavProps {
  onOpenAuth: () => void;
}

const MARKETING_LINKS = [
  { id: "platform", label: "Platform" },
  { id: "how", label: "How it works" },
  { id: "results", label: "Results" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function Nav({ onOpenAuth }: NavProps) {
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
        <div className="mx-auto w-full max-w-7xl px-2.5 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl px-2.5 py-2.5 transition-all duration-500 sm:px-5",
              scrolled
                ? "glass shadow-[0_18px_50px_-25px_rgba(0,0,0,0.95)]"
                : "border border-white/8 bg-ink-950/75 backdrop-blur-xl",
            )}
          >
            {/* Logo */}
            <div className="flex shrink-0 items-center gap-3">
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

            {/* Account access */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={onOpenAuth}
                className="min-h-10 whitespace-nowrap rounded-full border border-white/12 bg-white/5 px-3 text-xs font-semibold text-slate-200 shadow-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white sm:px-4 sm:text-[12.5px]"
              >
                Sign In / Sign Up
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen((o) => !o)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass text-white md:hidden"
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
          <nav className="flex flex-col" aria-label="Mobile">
            {MARKETING_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="min-h-11 border-b border-white/6 py-3 text-[14px] font-medium text-slate-200 transition-colors last:border-0 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

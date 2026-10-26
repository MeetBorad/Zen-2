import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BentoCardProps {
  children?: ReactNode;
  label?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  value?: string | number;
  unit?: string;
  trend?: ReactNode;
  sparkline?: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
  accentGlow?: "emerald" | "cyan" | "violet" | "amber" | "indigo" | "none";
}

const glowBorders: Record<string, string> = {
  emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_24px_-8px_rgba(16,185,129,0.3)]",
  cyan: "hover:border-cyan-400/40 hover:shadow-[0_0_24px_-8px_rgba(6,182,212,0.3)]",
  violet: "hover:border-violet-500/40 hover:shadow-[0_0_24px_-8px_rgba(139,92,246,0.3)]",
  amber: "hover:border-amber-400/40 hover:shadow-[0_0_24px_-8px_rgba(245,158,11,0.3)]",
  indigo: "hover:border-indigo-500/40 hover:shadow-[0_0_24px_-8px_rgba(99,102,241,0.3)]",
  none: "hover:border-white/20",
};

export function BentoCard({
  children,
  label,
  badge,
  icon,
  value,
  unit,
  trend,
  sparkline,
  footer,
  className,
  onClick,
  accentGlow = "none",
}: BentoCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
        "border border-white/10 bg-gradient-to-b from-ink-900/95 to-ink-950/95 p-5 sm:p-6",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.4)]",
        "backdrop-blur-xl transition-all duration-300",
        glowBorders[accentGlow],
        onClick && "cursor-pointer active:scale-[0.99]",
        className
      )}
    >
      <div>
        {/* Header Eyebrow */}
        {(label || badge || icon) && (
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-3.5">
            <div className="flex items-center gap-2 font-medium tracking-wide">
              {icon && <span className="text-slate-300 flex items-center">{icon}</span>}
              {label && <span className="uppercase text-[11px] font-bold text-slate-300 tracking-wider">{label}</span>}
            </div>
            {badge && <div>{badge}</div>}
          </div>
        )}

        {/* Primary Metric Row */}
        {(value !== undefined || sparkline) && (
          <div className="flex items-baseline justify-between gap-3 mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-3xl font-black tracking-tight text-white sm:text-4xl">
                {value}
              </span>
              {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
            </div>
            {sparkline && <div className="shrink-0">{sparkline}</div>}
          </div>
        )}

        {/* Trend Indicator */}
        {trend && <div className="mt-2.5 text-xs text-slate-400">{trend}</div>}

        {/* Custom Body Content */}
        {children && <div className="mt-4">{children}</div>}
      </div>

      {/* Footer / Sub-action */}
      {footer && <div className="mt-4 pt-3.5 border-t border-white/8 text-xs">{footer}</div>}
    </article>
  );
}

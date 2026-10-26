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
  emerald: "hover:border-emerald-500 hover:shadow-md",
  cyan: "hover:border-blue-500 hover:shadow-md",
  violet: "hover:border-indigo-500 hover:shadow-md",
  amber: "hover:border-amber-500 hover:shadow-md",
  indigo: "hover:border-blue-600 hover:shadow-md",
  none: "hover:border-blue-400 hover:shadow-md",
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
        "border border-slate-200 bg-white p-5 sm:p-6",
        "shadow-xs transition-all duration-300",
        glowBorders[accentGlow],
        onClick && "cursor-pointer active:scale-[0.99]",
        className
      )}
    >
      <div>
        {/* Header Eyebrow */}
        {(label || badge || icon) && (
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3.5">
            <div className="flex items-center gap-2 font-semibold tracking-wide">
              {icon && <span className="text-slate-600 flex items-center">{icon}</span>}
              {label && <span className="uppercase text-[11px] font-bold text-slate-600 tracking-wider">{label}</span>}
            </div>
            {badge && <div>{badge}</div>}
          </div>
        )}

        {/* Primary Metric Row */}
        {(value !== undefined || sparkline) && (
          <div className="flex items-baseline justify-between gap-3 mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                {value}
              </span>
              {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
            </div>
            {sparkline && <div className="shrink-0">{sparkline}</div>}
          </div>
        )}

        {/* Trend Indicator */}
        {trend && <div className="mt-2.5 text-xs text-slate-600">{trend}</div>}

        {/* Custom Body Content */}
        {children && <div className="mt-4 text-slate-700">{children}</div>}
      </div>

      {/* Footer / Sub-action */}
      {footer && <div className="mt-4 pt-3.5 border-t border-slate-100 text-xs text-slate-500 font-medium">{footer}</div>}
    </article>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type StatusTone = "done" | "progress" | "warning" | "blocked" | "neutral" | "brand";

interface StatusPillProps {
  children: ReactNode;
  tone?: StatusTone;
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
  size?: "sm" | "md";
}

const toneStyles: Record<StatusTone, string> = {
  done: "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold",
  progress: "bg-blue-50 text-blue-800 border-blue-200 font-bold",
  warning: "bg-amber-50 text-amber-900 border-amber-200 font-bold",
  blocked: "bg-rose-50 text-rose-800 border-rose-200 font-bold",
  neutral: "bg-slate-100 text-slate-700 border-slate-200 font-semibold",
  brand: "bg-blue-50 text-blue-700 border-blue-200 font-bold",
};

const dotColors: Record<StatusTone, string> = {
  done: "bg-emerald-500",
  progress: "bg-blue-500",
  warning: "bg-amber-500",
  blocked: "bg-rose-500",
  neutral: "bg-slate-400",
  brand: "bg-blue-600",
};

export function StatusPill({
  children,
  tone = "neutral",
  dot = false,
  icon,
  className,
  size = "sm",
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors select-none",
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        toneStyles[tone],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {tone === "done" && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dotColors[tone])} />
        </span>
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

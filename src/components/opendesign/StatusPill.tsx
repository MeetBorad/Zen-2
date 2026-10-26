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
  done: "bg-emerald-500/12 text-emerald-300 border-emerald-400/25",
  progress: "bg-cyan-500/12 text-cyan-300 border-cyan-400/25",
  warning: "bg-amber-500/12 text-amber-300 border-amber-400/25",
  blocked: "bg-rose-500/12 text-rose-300 border-rose-400/25",
  neutral: "bg-white/6 text-slate-300 border-white/12",
  brand: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
};

const dotColors: Record<StatusTone, string> = {
  done: "bg-emerald-400",
  progress: "bg-cyan-400",
  warning: "bg-amber-400",
  blocked: "bg-rose-400",
  neutral: "bg-slate-400",
  brand: "bg-indigo-400",
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

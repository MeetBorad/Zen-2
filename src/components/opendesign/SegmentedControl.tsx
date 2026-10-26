import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface SegmentOption<T extends string = string> {
  id: T;
  label: ReactNode;
  count?: number | string;
  icon?: ReactNode;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-ink-950/80 p-1 backdrop-blur-md select-none",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.id === value;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative flex items-center gap-2 whitespace-nowrap rounded-xl font-bold transition-all duration-200 outline-none",
              size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-xs sm:text-sm",
              isActive
                ? "bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.3)] ring-1 ring-white/15"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            )}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold transition-colors",
                  isActive
                    ? "bg-brand-500/30 text-brand-200"
                    : "bg-white/8 text-slate-400"
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

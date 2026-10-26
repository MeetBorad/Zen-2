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
        "inline-flex items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-1 select-none",
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
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-200 text-slate-600"
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

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const sevStyles: Record<string, string> = {
  critical: "text-rose-800 bg-rose-50 ring-rose-200 font-bold",
  high: "text-amber-900 bg-amber-50 ring-amber-200 font-bold",
  medium: "text-blue-800 bg-blue-50 ring-blue-200 font-bold",
  low: "text-slate-700 bg-slate-100 ring-slate-200 font-semibold",
};

export function Panel({
  title,
  action,
  children,
  className,
  note,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  note?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-800">{title}</h4>
            )}
            {note && <p className="mt-1 text-[11.5px] leading-snug text-slate-500">{note}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad" | "brand";
  className?: string;
}) {
  const tones = {
    neutral: "text-slate-700 bg-slate-100 ring-slate-200",
    good: "text-emerald-800 bg-emerald-50 ring-emerald-200",
    warn: "text-amber-900 bg-amber-50 ring-amber-200",
    bad: "text-rose-800 bg-rose-50 ring-rose-200",
    brand: "text-blue-800 bg-blue-50 ring-blue-200",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-bold ring-1",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Bar({ value, tone = "brand", delay = 0 }: { value: number; tone?: string; delay?: number }) {
  const grad =
    tone === "good"
      ? "from-emerald-500 to-teal-400"
      : tone === "warn"
        ? "from-amber-500 to-orange-400"
        : tone === "bad"
          ? "from-rose-500 to-pink-500"
          : "from-blue-600 to-indigo-500";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={cn("h-full origin-left rounded-full bg-gradient-to-r", grad)}
        style={{
          width: `${Math.max(2, Math.min(100, value))}%`,
          animation: `bar 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
        }}
      />
    </div>
  );
}

export function Ring({
  value,
  size = 92,
  label,
  sub,
}: {
  value: number;
  size?: number;
  label: string;
  sub?: string;
}) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(226,232,240,0.8)" strokeWidth="7" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#2563eb"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={c - (c * value) / 100}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-bold text-slate-900">{value}%</span>
        </div>
      </div>
      <div>
        <p className="text-[13px] font-bold text-slate-900">{label}</p>
        {sub && <p className="mt-1 max-w-[15rem] text-[11.5px] leading-snug text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

export function Spark({ points, tone = "#2563eb" }: { points: number[]; tone?: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 100;
  const h = 34;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / Math.max(1, max - min)) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" preserveAspectRatio="none" aria-hidden>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={tone} opacity="0.1" />
      <path d={d} fill="none" stroke={tone} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function KeyRow({
  label,
  value,
  tone,
  bar,
  delay = 0,
}: {
  label: string;
  value: string;
  tone?: "good" | "warn" | "bad" | "brand";
  bar?: number;
  delay?: number;
}) {
  return (
    <div className="py-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12.5px] text-slate-600 font-medium">{label}</span>
        <span
          className={cn(
            "font-mono text-[13px] font-bold",
            tone === "good" && "text-emerald-700",
            tone === "warn" && "text-amber-800",
            tone === "bad" && "text-rose-700",
            (!tone || tone === "brand") && "text-slate-900",
          )}
        >
          {value}
        </span>
      </div>
      {bar !== undefined && (
        <div className="mt-2">
          <Bar value={bar} tone={tone === "bad" ? "bad" : tone === "warn" ? "warn" : tone === "good" ? "good" : "brand"} delay={delay} />
        </div>
      )}
    </div>
  );
}

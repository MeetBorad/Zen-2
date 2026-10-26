import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const sevStyles: Record<string, string> = {
  critical: "text-rose-300 bg-rose-500/12 ring-rose-400/30",
  high: "text-amber-200 bg-amber-500/12 ring-amber-400/30",
  medium: "text-brand-200 bg-brand-500/12 ring-brand-400/30",
  low: "text-slate-300 bg-white/6 ring-white/15",
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
        "rounded-2xl border border-white/8 bg-white/[0.025] p-4 sm:p-5",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-300">{title}</h4>
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
    neutral: "text-slate-300 bg-white/6 ring-white/12",
    good: "text-emerald-300 bg-emerald-500/12 ring-emerald-400/25",
    warn: "text-amber-200 bg-amber-500/12 ring-amber-400/25",
    bad: "text-rose-300 bg-rose-500/12 ring-rose-400/25",
    brand: "text-brand-200 bg-brand-500/15 ring-brand-400/30",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold ring-1",
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
      ? "from-emerald-400 to-teal-300"
      : tone === "warn"
        ? "from-amber-400 to-orange-300"
        : tone === "bad"
          ? "from-rose-500 to-pink-400"
          : "from-brand-400 via-violet-400 to-cyan-300";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
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
          <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.09)" strokeWidth="7" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="url(#ringGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={c - (c * value) / 100}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="60%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-semibold text-white">{value}%</span>
        </div>
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white">{label}</p>
        {sub && <p className="mt-1 max-w-[15rem] text-[11.5px] leading-snug text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

export function Spark({ points, tone = "#818cf8" }: { points: number[]; tone?: string }) {
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
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={tone} opacity="0.14" />
      <path d={d} fill="none" stroke={tone} strokeWidth="1.6" strokeLinecap="round" />
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
        <span className="text-[12.5px] text-slate-400">{label}</span>
        <span
          className={cn(
            "font-mono text-[13px] font-semibold",
            tone === "good" && "text-emerald-300",
            tone === "warn" && "text-amber-200",
            tone === "bad" && "text-rose-300",
            (!tone || tone === "brand") && "text-white",
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

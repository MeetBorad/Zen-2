import { useId } from "react";
import { cn } from "@/utils/cn";

export type SparklineTone = "emerald" | "cyan" | "violet" | "amber" | "brand";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  tone?: SparklineTone;
  className?: string;
  showPoints?: boolean;
}

const toneGradients: Record<SparklineTone, { stroke: string; fillStart: string; fillEnd: string; point: string }> = {
  emerald: {
    stroke: "#10b981",
    fillStart: "rgba(16, 185, 129, 0.28)",
    fillEnd: "rgba(16, 185, 129, 0.0)",
    point: "#34d399",
  },
  cyan: {
    stroke: "#06b6d4",
    fillStart: "rgba(6, 182, 212, 0.28)",
    fillEnd: "rgba(6, 182, 212, 0.0)",
    point: "#22d3ee",
  },
  violet: {
    stroke: "#8b5cf6",
    fillStart: "rgba(139, 92, 246, 0.28)",
    fillEnd: "rgba(139, 92, 246, 0.0)",
    point: "#a78bfa",
  },
  amber: {
    stroke: "#f59e0b",
    fillStart: "rgba(245, 158, 11, 0.28)",
    fillEnd: "rgba(245, 158, 11, 0.0)",
    point: "#fbbf24",
  },
  brand: {
    stroke: "#6366f1",
    fillStart: "rgba(99, 102, 241, 0.28)",
    fillEnd: "rgba(99, 102, 241, 0.0)",
    point: "#818cf8",
  },
};

export function Sparkline({
  data,
  width = 120,
  height = 36,
  tone = "emerald",
  className,
  showPoints = false,
}: SparklineProps) {
  const gradientId = useId();

  if (!data || data.length < 2) {
    return null;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const paddingX = 4;
  const paddingY = 4;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * usableWidth;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  // Construct smooth bezier or polyline path
  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  // Area path closing down to bottom
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const colors = toneGradients[tone];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible select-none", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.fillStart} />
          <stop offset="100%" stopColor={colors.fillEnd} />
        </linearGradient>
      </defs>

      {/* Fill Area */}
      <path d={areaD} fill={`url(#${gradientId})`} />

      {/* Stroke Line */}
      <path
        d={pathD}
        fill="none"
        stroke={colors.stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Optional endpoint indicator */}
      {showPoints && points.length > 0 && (
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2.5"
          fill={colors.point}
          stroke="#070a14"
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}

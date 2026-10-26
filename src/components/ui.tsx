import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { IconArrow } from "./Icons";

/* ---------------------------------- Reveal --------------------------------- */
export function Reveal({
  children,
  delay = 0,
  dir,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  dir?: "left" | "right" | "scale";
  as?: "div" | "section" | "li" | "span" | "header" | "article";
  className?: string;
}) {
  return (
    <Tag
      data-reveal=""
      data-dir={dir}
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------- Orb ----------------------------------- */
export function Orb({
  className,
  color = "brand",
  size = 520,
  delay = 0,
}: {
  className?: string;
  color?: "brand" | "violet" | "aqua" | "mint";
  size?: number;
  delay?: number;
}) {
  const map = {
    brand: "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.55),transparent_65%)]",
    violet: "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.45),transparent_65%)]",
    aqua: "bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.38),transparent_65%)]",
    mint: "bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.32),transparent_65%)]",
  } as const;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[70px] animate-drift", map[color], className)}
      style={{ width: size, height: size, animationDelay: `${delay}ms` }}
    />
  );
}

/* --------------------------------- Eyebrow --------------------------------- */
export function Eyebrow({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-100/90">
      {icon}
      {children}
    </span>
  );
}

/* --------------------------------- Buttons --------------------------------- */
export function PrimaryButton({
  children,
  href = "#start",
  className,
  size = "md",
  arrow = true,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
}) {
  const sizes = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-[15px]",
  } as const;
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-white",
        "bg-[linear-gradient(105deg,#4f46e5,#7c3aed_45%,#0891b2)]",
        "shadow-[0_10px_40px_-12px_rgba(99,102,241,0.9)] ring-1 ring-white/15",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_-12px_rgba(124,58,237,0.95)] active:translate-y-0",
        sizes[size],
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(105deg,rgba(255,255,255,0.28),rgba(255,255,255,0) 40%,rgba(255,255,255,0.18))",
        }}
      />
      <span className="relative z-10">{children}</span>
      {arrow && (
        <IconArrow className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}

export function GhostButton({
  children,
  href = "#command-center",
  className,
  size = "md",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-[15px]",
  } as const;
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full glass font-semibold text-white/90",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white",
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ------------------------------ Section header ----------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  copy,
  align = "center",
  icon,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  copy?: string;
  align?: "center" | "left";
  icon?: ReactNode;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3.1rem)] font-bold leading-[1.08] text-white">
          {title}{" "}
          {highlight && <span className="text-gradient-brand">{highlight}</span>}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={160}>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-400 sm:text-base">{copy}</p>
        </Reveal>
      )}
    </div>
  );
}

/* --------------------------------- Section --------------------------------- */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-20 sm:px-8 sm:py-28 lg:py-32", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

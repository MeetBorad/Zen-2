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
    brand: "bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_70%)]",
    violet: "bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.08),transparent_70%)]",
    aqua: "bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.08),transparent_70%)]",
    mint: "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)]",
  } as const;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[80px]", map[color], className)}
      style={{ width: size, height: size, animationDelay: `${delay}ms` }}
    />
  );
}

/* --------------------------------- Eyebrow --------------------------------- */
export function Eyebrow({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-blue-900 shadow-sm">
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
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-[15px]",
  } as const;
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold text-white",
        "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]",
        sizes[size],
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {arrow && (
        <IconArrow className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}

export function GhostButton({
  children,
  href = "#how",
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
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-[15px]",
  } as const;
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white font-bold text-slate-700 shadow-sm",
        "transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]",
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
        <h2 className="mt-4 text-[clamp(1.85rem,4.4vw,2.9rem)] font-extrabold leading-[1.12] text-slate-900 tracking-tight">
          {title}{" "}
          {highlight && <span className="text-blue-600 underline decoration-amber-400 decoration-4 underline-offset-8">{highlight}</span>}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={160}>
          <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600 sm:text-lg font-normal">{copy}</p>
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
    <section id={id} className={cn("relative px-4 py-16 sm:px-8 sm:py-24 lg:py-28", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

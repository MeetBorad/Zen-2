import { useState } from "react";
import { cn } from "@/utils/cn";
import { KPIS, PERIODS, WORKSPACES, money, type WorkspaceId } from "@/data/cc";
import { useCountUp } from "@/lib/hooks";
import {
  CustomersPanel,
  HealthPanel,
  OrdersPanel,
  PipelinePanel,
  ReviewsPanel,
  ScansPanel,
  TasksPanel,
  RevenuePanel,
} from "./panels";
import { Chip } from "./dash/kit";
import { IconActivity, IconList, IconPulse } from "./Icons";

function KpiNumber({ value, currency }: { value: number; currency?: boolean }) {
  const { ref, value: v } = useCountUp(value, 1500);
  return (
    <span ref={ref} className="font-mono text-2xl font-semibold tracking-tight text-white sm:text-[26px]">
      {currency ? money(v) : Math.round(v).toLocaleString("en-IN")}
    </span>
  );
}

function PanelBody({ id, demo }: { id: WorkspaceId; demo: boolean }) {
  switch (id) {
    case "customers":
      return <CustomersPanel />;
    case "revenue":
      return <RevenuePanel demo={demo} />;
    case "reviews":
      return <ReviewsPanel />;
    case "scans":
      return <ScansPanel demo={demo} />;
    case "orders":
      return <OrdersPanel />;
    case "health":
      return <HealthPanel />;
    case "pipeline":
      return <PipelinePanel />;
    case "tasks":
      return <TasksPanel />;
  }
}

export default function CommandCenter() {
  const [tab, setTab] = useState<WorkspaceId>("customers");
  const [demo, setDemo] = useState(true);
  const [period, setPeriod] = useState<string>(PERIODS[0]);
  const active = WORKSPACES.find((w) => w.id === tab)!;

  return (
    <div className="relative">
      {/* ambient glow behind the console */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 45% at 20% 0%, rgba(99,102,241,0.22), transparent 70%), radial-gradient(50% 40% at 85% 15%, rgba(34,211,238,0.16), transparent 70%)",
        }}
      />

      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-ink-900/85 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-white/8 bg-ink-850/80 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="mx-auto flex max-w-full items-center gap-2 rounded-md border border-white/8 bg-ink-950/70 px-3 py-1">
            <IconPulse className="h-3 w-3 text-emerald-400" />
            <span className="truncate font-mono text-[10.5px] text-slate-400">app.zentap.ai/founder/command-center</span>
          </div>
          <Chip tone="brand" className="hidden sm:inline-flex">
            Founder only
          </Chip>
        </div>

        {/* console header */}
        <div className="flex flex-col gap-4 border-b border-white/8 bg-gradient-to-r from-ink-850/80 to-ink-900/40 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-ink-950 shadow-[0_8px_24px_-8px_rgba(99,102,241,0.9)]">
              <IconActivity className="h-4.5 w-4.5" strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-[15px] font-bold leading-tight text-white">Founder Command Center</h3>
              <p className="mt-0.5 text-[11.5px] text-slate-400">
                {active.blurb} · <span className="text-slate-500">one screen for the whole business</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-white/10 bg-ink-950/70 p-0.5">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300",
                    period === p ? "bg-white/12 text-white shadow-sm" : "text-slate-400 hover:text-slate-200",
                  )}
                  aria-pressed={period === p}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDemo((d) => !d)}
              aria-pressed={demo}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-300",
                demo
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                  : "border-white/12 bg-white/5 text-slate-300 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "relative h-3 w-5 rounded-full transition-colors duration-300",
                  demo ? "bg-cyan-400/70" : "bg-white/20",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-2 w-2 rounded-full bg-white transition-all duration-300",
                    demo ? "left-2.5" : "left-0.5",
                  )}
                />
              </span>
              {demo ? "Preview data" : "Live mode"}
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 gap-px bg-white/6 sm:grid-cols-3 lg:grid-cols-5">
          {KPIS.map((k, i) => (
            <div
              key={k.key}
              className={cn(
                "group relative bg-ink-900/95 p-4 transition-colors duration-300 hover:bg-ink-850",
                i === KPIS.length - 1 && "col-span-2 sm:col-span-1",
              )}
              style={{ animation: `rise .7s cubic-bezier(.16,1,.3,1) ${i * 70}ms both` }}
            >
              <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-slate-500">{k.label}</p>
              <div className="mt-2 flex items-center gap-2">
                {demo ? (
                  <KpiNumber value={k.demo} currency={k.key === "mrr"} />
                ) : (
                  <span className="font-mono text-2xl font-semibold text-slate-600">
                    {k.key === "mrr" ? "₹0" : "0"}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[10.5px] leading-snug text-slate-500">{demo ? k.demoHint : k.hint}</p>
              <span
                className={cn(
                  "mt-2 inline-flex rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold ring-1",
                  k.positive ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/25" : "bg-amber-500/10 text-amber-200 ring-amber-400/25",
                )}
              >
                {k.delta}
              </span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand-400/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </div>
          ))}
        </div>

        {/* workspace rail + panel */}
        <div className="grid lg:grid-cols-[220px_1fr]">
          <nav
            aria-label="Founder workspaces"
            className="flex gap-2 overflow-x-auto border-b border-white/8 bg-ink-850/60 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
          >
            <p className="hidden px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 lg:block">
              Founder workspaces
            </p>
            {WORKSPACES.map((w) => {
              const on = w.id === tab;
              return (
                <button
                  key={w.id}
                  onClick={() => setTab(w.id)}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-[12.5px] font-medium transition-all duration-300",
                    on
                      ? "bg-gradient-to-r from-brand-500/25 to-cyan-400/10 text-white ring-1 ring-brand-400/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <IconList className={cn("h-3.5 w-3.5 transition-transform duration-300", on && "scale-110 text-brand-200")} />
                  <span className="hidden sm:inline lg:inline">{w.label}</span>
                  <span className="sm:hidden lg:hidden">{w.short}</span>
                  {on && (
                    <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-brand-300 to-cyan-300" />
                  )}
                </button>
              );
            })}
            <div className="mt-auto hidden rounded-xl border border-white/8 bg-white/[0.03] p-3 lg:block">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">Integrations</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-slate-400">
                {["Razorpay + UPI AutoPay", "Google Business Profile", "AI reply engine", "WhatsApp alerts", "Print partner API"].map(
                  (s) => (
                    <li key={s} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {s}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </nav>

          <div className="min-w-0 bg-ink-900/40 p-3 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11.5px] text-slate-500">
                Viewing <span className="text-slate-300">{active.label}</span> · {period}
              </p>
              <Chip tone={demo ? "warn" : "good"}>{demo ? "Prototype · illustrative figures" : "Not connected"}</Chip>
            </div>
            <div key={tab} className="min-w-0">
              <PanelBody id={tab} demo={demo} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 bg-ink-850/70 px-4 py-3 sm:px-6">
          <p className="text-[11px] leading-relaxed text-slate-500">
            This is an interactive prototype. Figures are placeholders and do not connect to live accounts, Google
            Business Profiles or payment gateways. Toggling a task or resolving an alert updates this demo only.
          </p>
        </div>
      </div>
    </div>
  );
}

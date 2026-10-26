import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { TASKS } from "@/data/cc";
import { useTasks } from "@/lib/tasks";
import { Reveal, Section } from "./ui";
import { IconCheck, IconList } from "./Icons";

const FILTERS = ["All", "Urgent", "High", "Medium", "Low"] as const;
type Filter = (typeof FILTERS)[number];

const toneFor = (p: string) =>
  p === "Urgent"
    ? "text-rose-200 bg-rose-500/12 ring-rose-400/30"
    : p === "High"
      ? "text-amber-200 bg-amber-500/12 ring-amber-400/30"
      : p === "Medium"
        ? "text-brand-200 bg-brand-500/12 ring-brand-400/30"
        : "text-slate-300 bg-white/6 ring-white/15";

export default function ActionCentre() {
  const { done, toggle, completed, total, reset } = useTasks();
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? TASKS : TASKS.filter((t) => t.priority === filter)),
    [filter],
  );

  return (
    <Section id="action">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-100">
              <IconList className="h-3.5 w-3.5" /> Founder action centre
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3.1rem)] font-bold leading-[1.08] text-white">
              A dashboard that tells you
              <span className="text-gradient-brand"> what to do next.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-400">
              Most dashboards show numbers. Zentap converts your business data into a ranked, prioritised list — the
              failed payment to verify, the trial about to expire, the Google token to reconnect — so ten minutes each
              morning is enough.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-7 flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 36 36" className="-rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.4" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="url(#acGrad)"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeDasharray={97.4}
                    strokeDashoffset={97.4 - (97.4 * completed) / total}
                    style={{ transition: "stroke-dashoffset .6s cubic-bezier(.16,1,.3,1)" }}
                  />
                  <defs>
                    <linearGradient id="acGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 grid place-items-center font-mono text-[12px] font-semibold text-white">
                  {completed}/{total}
                </span>
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-white">completed</p>
                <button
                  onClick={reset}
                  className="mt-1 text-[12px] text-slate-500 underline-offset-4 transition-colors hover:text-slate-300 hover:underline"
                >
                  Reset this demo checklist
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal dir="right">
          <div className="rounded-3xl border border-white/10 bg-ink-900/70 p-4 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter tasks by priority">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-300",
                    filter === f
                      ? "bg-white/12 text-white ring-1 ring-white/15"
                      : "text-slate-400 hover:bg-white/6 hover:text-white",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <ul className="mt-4 space-y-2">
              {visible.map((t, i) => {
                const isDone = !!done[t.id];
                return (
                  <li
                    key={t.id}
                    style={{ animation: `rise .55s cubic-bezier(.16,1,.3,1) ${i * 55}ms both` }}
                  >
                    <button
                      onClick={() => toggle(t.id)}
                      aria-pressed={isDone}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-400",
                        isDone
                          ? "border-emerald-400/25 bg-emerald-500/8"
                          : "border-white/8 bg-white/[0.025] hover:-translate-y-0.5 hover:border-brand-400/35 hover:bg-white/[0.05]",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] ring-1 transition-all duration-300",
                          isDone ? "bg-emerald-400 text-ink-950 ring-emerald-300" : "bg-white/5 ring-white/20 group-hover:ring-brand-300/60",
                        )}
                      >
                        {isDone && <IconCheck className="h-3 w-3" strokeWidth={3.2} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "text-[13px] font-semibold transition-colors",
                              isDone ? "text-slate-400 line-through" : "text-white",
                            )}
                          >
                            {t.title}
                          </span>
                          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1", toneFor(t.priority))}>
                            {t.priority}
                          </span>
                          <span className="rounded-full bg-white/6 px-2 py-0.5 text-[10px] font-medium text-slate-400 ring-1 ring-white/10">
                            {t.bucket}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[12px] leading-relaxed text-slate-400">{t.detail}</span>
                        <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] text-slate-500">
                          <span className="h-1 w-1 rounded-full bg-brand-300" />
                          {t.metric}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
              {visible.length === 0 && (
                <li className="py-10 text-center text-[13px] text-slate-500">No {filter} priority tasks today. 🎉</li>
              )}
            </ul>

            <p className="mt-4 border-t border-white/8 pt-3 text-[11px] leading-relaxed text-slate-500">
              Sample tasks only. Checking an item updates this prototype's checklist, not an actual business system.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

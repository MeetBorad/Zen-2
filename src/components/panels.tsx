import { useState } from "react";
import { cn } from "@/utils/cn";
import { ALERTS, CUSTOMERS, LEADS, ORDERS, REVIEWS, STAGES, money } from "@/data/cc";
import { TASKS } from "@/data/cc";
import { useTasks } from "@/lib/tasks";
import { Bar, Chip, KeyRow, Panel, Ring, Spark, sevStyles } from "./dash/kit";
import { IconCheck, IconGoogle, IconPulse } from "./Icons";

const fadeUp = "animate-[rise_.65s_cubic-bezier(0.16,1,0.3,1)_both]";

/* ------------------------------- Customers -------------------------------- */
export function CustomersPanel() {
  const [q, setQ] = useState("");
  const rows = CUSTOMERS.filter((c) =>
    (c.business + c.city + c.category + c.merchantId).toLowerCase().includes(q.toLowerCase()),
  );
  const stalled = CUSTOMERS.filter((c) => c.google !== "connected").length;
  const noStandee = CUSTOMERS.filter((c) => c.standee !== "delivered").length;

  return (
    <div className={cn("space-y-4", fadeUp)}>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "Total merchants", v: String(CUSTOMERS.length), s: "multi-tenant · isolated schemas" },
          { k: "Google not connected", v: String(stalled), s: "revenue-bearing accounts at risk" },
          { k: "Standee not delivered", v: String(noStandee), s: "signup → delivery gap" },
        ].map((c, i) => (
          <div key={c.k} className="rounded-xl border border-slate-200 bg-white shadow-xs p-3.5" style={{ animationDelay: `${i * 70}ms` }}>
            <p className="text-[11px] uppercase tracking-wider text-slate-500">{c.k}</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-slate-900">{c.v}</p>
            <p className="mt-1 text-[11px] text-slate-500">{c.s}</p>
          </div>
        ))}
      </div>

      <Panel
        title="All businesses"
        note="Name, contact, subscription, trial window, Google connection, standee status and recent activity."
        action={
          <label className="relative hidden sm:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter businesses…"
              aria-label="Filter businesses"
              className="w-48 rounded-lg border border-slate-300 bg-white text-slate-900 shadow-xs px-3 py-1.5 text-[12px] text-slate-900 placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none"
            />
          </label>
        }
      >
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wider text-slate-500">
                <th className="pb-2 pl-1 font-medium">Business</th>
                <th className="pb-2 font-medium">Plan</th>
                <th className="pb-2 font-medium">Trial</th>
                <th className="pb-2 font-medium">Google</th>
                <th className="pb-2 font-medium">Standee</th>
                <th className="pb-2 pr-1 text-right font-medium">Scans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {rows.map((c) => (
                <tr key={c.merchantId} className="group transition-colors hover:bg-slate-50">
                  <td className="py-2.5 pl-1">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500/40 to-cyan-400/25 text-[11px] font-bold text-slate-900 ring-1 ring-white/10">
                        {c.business.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[12.5px] font-semibold text-slate-900">{c.business}</p>
                        <p className="truncate font-mono text-[10.5px] text-slate-500">
                          {c.merchantId} · {c.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 text-[12px] text-slate-700">{c.plan}</td>
                  <td className="py-2.5">
                    <Chip tone={c.trial === "Converted" ? "good" : "warn"}>{c.trial}</Chip>
                  </td>
                  <td className="py-2.5">
                    <Chip tone={c.google === "connected" ? "good" : c.google === "pending" ? "warn" : "bad"}>
                      {c.google === "connected" ? "Connected" : c.google === "pending" ? "Pending" : "Expired"}
                    </Chip>
                  </td>
                  <td className="py-2.5">
                    <Chip tone={c.standee === "delivered" ? "good" : c.standee === "in production" ? "brand" : "warn"}>
                      {c.standee}
                    </Chip>
                  </td>
                  <td className="py-2.5 pr-1 text-right font-mono text-[12px] text-slate-900">{c.scans}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[12.5px] text-slate-500">
                    No businesses match “{q}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="rounded-xl border border-brand-400/25 bg-brand-500/8 p-3.5">
        <p className="text-[12px] leading-relaxed text-brand-100/90">
          <strong className="font-semibold text-slate-900">Founder insight:</strong> Cafe Koramangala Co. signed up but has
          not connected Google or ordered a standee. Trigger the guided onboarding sequence before the pilot goes cold.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------- Revenue --------------------------------- */
export function RevenuePanel({ demo }: { demo: boolean }) {
  const growth = [8, 12, 15, 14, 19, 23, 27, 26, 31, 36, 41, 48];
  return (
    <div className={cn("grid gap-4 lg:grid-cols-5", fadeUp)}>
      <div className="space-y-4 lg:col-span-3">
        <Panel title="MRR movement" note="Gross subscription revenue before fees, taxes, refunds and other costs.">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-3xl font-semibold text-slate-900">{money(demo ? 29990 : 0)}</p>
              <p className="mt-1 text-[11.5px] text-slate-500">12-week trend · illustrative</p>
            </div>
            <Chip tone="good">▲ 18.4% MoM</Chip>
          </div>
          <div className="mt-4 flex h-24 items-end gap-1.5">
            {growth.map((g, i) => (
              <div
                key={i}
                className="group relative flex-1 rounded-t bg-gradient-to-t from-brand-600/50 to-cyan-300/80 transition-all duration-300 hover:from-brand-500 hover:to-white"
                style={{ height: `${(g / 50) * 100}%`, animation: `rise .7s cubic-bezier(.16,1,.3,1) ${i * 45}ms both` }}
                title={`Week ${i + 1}: ${money(g * 625)}`}
              />
            ))}
          </div>
          <div className="mt-3 divide-y divide-white/6">
            <KeyRow label="Collected this period" value={money(demo ? 27420 : 0)} tone="good" bar={88} delay={80} />
            <KeyRow label="Failed payment attempts" value={`${money(demo ? 5998 : 0)} · 2 mandates`} tone="bad" bar={22} delay={160} />
            <KeyRow label="Overdue accounts" value="1 account · 9 days" tone="warn" bar={14} delay={240} />
          </div>
        </Panel>
      </div>

      <div className="space-y-4 lg:col-span-2">
        <Panel title="Trials ending next 3–7 days" note="Your upgrade window.">
          <ul className="space-y-3">
            {[
              { n: "Sharma Electricals", d: "2 days", p: 86 },
              { n: "Cafe Koramangala Co.", d: "11 days", p: 21 },
              { n: "Urban Click Studio", d: "8 days", p: 57 },
            ].map((t) => (
              <li key={t.n}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="font-medium text-slate-900">{t.n}</span>
                  <span className="font-mono text-[11.5px] text-slate-600">{t.d}</span>
                </div>
                <div className="mt-2">
                  <Bar value={t.p} tone={t.p > 70 ? "warn" : "brand"} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Subscription health">
          <div className="space-y-1">
            <KeyRow label="Trial → paid conversion" value={demo ? "62%" : "0%"} tone="good" bar={62} />
            <KeyRow label="Churn (last 90 days)" value={demo ? "4.1%" : "0%"} tone="warn" bar={12} />
            <KeyRow label="Annual plans" value={demo ? "2 of 10" : "0"} tone="brand" bar={20} />
            <KeyRow label="Avg. revenue / account" value={demo ? money(2999) : money(0)} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* -------------------------------- Reviews --------------------------------- */
export function ReviewsPanel() {
  const statusTone = {
    published: "good",
    "awaiting approval": "warn",
    draft: "neutral",
    failed: "bad",
    "private feedback": "brand",
  } as const;

  return (
    <div className={cn("grid gap-4 lg:grid-cols-5", fadeUp)}>
      <div className="space-y-4 lg:col-span-3">
        <Panel
          title="Review stream"
          note="Detected from connected Google Business Profiles, with AI drafts before publishing."
          action={<Chip tone="brand">Google + AI</Chip>}
        >
          <ul className="space-y-2.5">
            {REVIEWS.map((r, i) => (
              <li
                key={r.author + i}
                className="rounded-xl border border-slate-200 bg-white shadow-xs p-3 transition-colors hover:border-white/16 hover:bg-white/[0.05]"
                style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${i * 60}ms both` }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12.5px] font-semibold text-slate-900">{r.business}</span>
                  <span className="text-[11px] text-slate-500">· {r.author}</span>
                  <span className="ml-auto flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className={cn("text-[10px]", s < r.stars ? "text-amber-300" : "text-slate-700")}>
                        ★
                      </span>
                    ))}
                    <Chip tone={statusTone[r.status]} className="ml-1.5">
                      {r.status}
                    </Chip>
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-700">“{r.text}”</p>
                <div className="mt-2 flex items-center gap-3 text-[10.5px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    {r.channel === "Private" ? <IconPulse className="h-3 w-3" /> : <IconGoogle className="h-3 w-3" />}
                    {r.channel}
                  </span>
                  <span>{r.ago}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="space-y-4 lg:col-span-2">
        <Panel title="AI reply engine">
          <Ring value={94} label="Reply success rate" sub="Published ÷ attempted replies over the selected period." />
          <div className="mt-4 space-y-1 divide-y divide-white/6">
            <KeyRow label="New reviews detected" value="27" tone="good" bar={72} />
            <KeyRow label="Published automatically" value="24" bar={86} delay={60} />
            <KeyRow label="Awaiting approval" value="2" tone="warn" bar={12} delay={120} />
            <KeyRow label="Failed jobs" value="1" tone="bad" bar={6} delay={180} />
            <KeyRow label="Avg. reply time" value="3 min 12 s" />
          </div>
        </Panel>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/6 p-3.5">
          <p className="text-[11.5px] leading-relaxed text-emerald-100/85">
            <strong className="font-semibold text-slate-900">Policy-safe by design:</strong> low ratings can route into a
            private feedback conversation, but every customer keeps an honest path to a public Google review. Zentap
            never gates or suppresses reviews.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Scans ---------------------------------- */
export function ScansPanel({ demo }: { demo: boolean }) {
  const perBusiness = [...CUSTOMERS].sort((a, b) => b.scans - a.scans).slice(0, 5);
  const max = Math.max(...perBusiness.map((p) => p.scans));
  return (
    <div className={cn("grid gap-4 lg:grid-cols-5", fadeUp)}>
      <div className="space-y-4 lg:col-span-3">
        <Panel title="Scan analytics" note="NFC taps and QR scans logged per standee in the selected period.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Total scans", v: demo ? "2,413" : "0" },
              { k: "QR share", v: "61%" },
              { k: "NFC share", v: "39%" },
              { k: "Repeat visitors", v: demo ? "18%" : "0%" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-slate-200 bg-white shadow-xs p-3">
                <p className="text-[10.5px] uppercase tracking-wider text-slate-500">{s.k}</p>
                <p className="mt-1 font-mono text-xl font-semibold text-slate-900">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {perBusiness.map((b, i) => (
              <div key={b.merchantId}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="truncate font-medium text-slate-200">{b.business}</span>
                  <span className="ml-3 shrink-0 font-mono text-[11.5px] text-slate-600">{b.scans} scans</span>
                </div>
                <div className="mt-2">
                  <Bar value={(b.scans / max) * 100} delay={i * 70} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="space-y-4 lg:col-span-2">
        <Panel title="Scan → review funnel" note="A scan is engagement. Only attributed reviews count as reviews.">
          {[
            { l: "Standee taps & scans", v: demo ? 2413 : 0, tone: "brand" as const },
            { l: "Reached review destination", v: demo ? 1508 : 0, tone: "brand" as const },
            { l: "Opened Google review form", v: demo ? 742 : 0, tone: "warn" as const },
            { l: "Published Google reviews", v: demo ? 227 : 0, tone: "good" as const },
          ].map((f, i) => (
            <div key={f.l} className="mb-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-slate-700">{f.l}</span>
                <span className="font-mono text-[12px] font-semibold text-slate-900">{f.v.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-2">
                <Bar value={(f.v / (demo ? 2413 : 1)) * 100} tone={f.tone} delay={i * 90} />
              </div>
            </div>
          ))}
          <p className="mt-3 rounded-lg bg-slate-100 p-2.5 text-[11px] leading-relaxed text-slate-600">
            Scan-to-review conversion: <span className="font-mono text-slate-900">9.4%</span> — scans are never counted as
            Google reviews.
          </p>
        </Panel>
      </div>
    </div>
  );
}

/* --------------------------------- Orders --------------------------------- */
export function OrdersPanel() {
  return (
    <div className={cn("space-y-4", fadeUp)}>
      <Panel title="Fulfilment pipeline" note="Artwork → printer acknowledgement → production → dispatch → tracking → delivered.">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {STAGES.map((s, i) => {
            const count = ORDERS.filter((o) => o.stage === s.id).length;
            return (
              <div
                key={s.id}
                className="rounded-xl border border-slate-200 bg-white shadow-xs p-3 transition-colors hover:border-brand-400/40"
                style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${i * 60}ms both` }}
              >
                <p className="font-mono text-xl font-semibold text-slate-900">{count}</p>
                <p className="mt-1 text-[10.5px] leading-tight text-slate-600">{s.label}</p>
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel title="Active orders">
        <ul className="space-y-2">
          {ORDERS.map((o, i) => {
            const idx = STAGES.findIndex((s) => s.id === o.stage);
            return (
              <li
                key={o.business}
                className="rounded-xl border border-slate-200 bg-white shadow-xs p-3 transition-colors hover:border-white/16"
                style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${i * 55}ms both` }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12.5px] font-semibold text-slate-900">{o.business}</span>
                  <Chip tone={o.stage === "delivered" ? "good" : idx > 2 ? "brand" : "warn"}>{STAGES[idx].label}</Chip>
                  <span className="ml-auto font-mono text-[11px] text-slate-600">
                    {o.qty} standees · {o.courier}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  {STAGES.map((s, si) => (
                    <div
                      key={s.id}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-all duration-500",
                        si <= idx ? "bg-gradient-to-r from-brand-400 to-cyan-300" : "bg-slate-100",
                      )}
                      style={{ transitionDelay: `${si * 40}ms` }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[10.5px] text-slate-500">{o.eta}</p>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}

/* --------------------------------- Health --------------------------------- */
export function HealthPanel() {
  const [resolved, setResolved] = useState<Record<number, boolean>>({});
  const openCount = ALERTS.filter((a, i) => !(resolved[i] ?? a.resolved)).length;

  return (
    <div className={cn("grid gap-4 lg:grid-cols-5", fadeUp)}>
      <div className="space-y-4 lg:col-span-3">
        <Panel
          title="System alerts"
          note="Every alert carries the affected customer, timestamp, severity, a readable cause and its resolution state."
          action={
            <Chip tone={openCount > 2 ? "bad" : "good"}>
              {openCount} open
            </Chip>
          }
        >
          <ul className="space-y-2">
            {ALERTS.map((a, i) => {
              const isResolved = resolved[i] ?? a.resolved;
              return (
                <li
                  key={a.title}
                  className={cn(
                    "rounded-xl border border-slate-200 bg-white shadow-xs p-3 transition-all duration-300 hover:border-white/16",
                    isResolved && "opacity-55",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1", sevStyles[a.severity])}>
                      {a.severity}
                    </span>
                    <span className={cn("text-[12.5px] font-semibold text-slate-900", isResolved && "line-through")}>
                      {a.title}
                    </span>
                    <span className="ml-auto font-mono text-[10.5px] text-slate-500">{a.ago}</span>
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-600">{a.detail}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip>{a.customer}</Chip>
                    <button
                      onClick={() => setResolved((r) => ({ ...r, [i]: !isResolved }))}
                      className={cn(
                        "ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ring-1 transition-all",
                        isResolved
                          ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30"
                          : "bg-slate-100 text-slate-700 ring-white/12 hover:bg-white/10 hover:text-slate-900",
                      )}
                    >
                      <IconCheck className="h-3 w-3" />
                      {isResolved ? "Resolved" : "Mark resolved"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
      <div className="space-y-4 lg:col-span-2">
        <Panel title="Platform uptime" note="Rolling 30-day availability.">
          <Ring value={99} label="99.94% uptime" sub="Core app, review worker, payment webhooks and print bridge." />
          <div className="mt-4">
            <Spark points={[100, 100, 99, 100, 100, 97, 100, 100, 100, 99, 100, 100]} tone="#34d399" />
          </div>
        </Panel>
        <Panel title="Security posture">
          <div className="space-y-1 divide-y divide-white/6">
            <KeyRow label="Webhook signatures verified" value="100%" tone="good" bar={100} />
            <KeyRow label="Row-level security policies" value="42 schemas" bar={100} delay={60} />
            <KeyRow label="Admin actions logged" value="1,284" bar={64} delay={120} />
            <KeyRow label="OAuth tokens rotating" value="Healthy" tone="good" />
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* -------------------------------- Pipeline -------------------------------- */
export function PipelinePanel() {
  const cols = [
    { id: "new", label: "New lead" },
    { id: "demo", label: "Demo booked" },
    { id: "trial", label: "Pilot running" },
    { id: "paid", label: "Paid" },
  ] as const;
  return (
    <div className={cn("space-y-4", fadeUp)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map((c, ci) => {
          const items = LEADS.filter((l) => l.stage === c.id);
          const value = items.reduce((s, l) => s + l.value, 0);
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-xs p-3.5"
              style={{ animation: `rise .6s cubic-bezier(.16,1,.3,1) ${ci * 70}ms both` }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">{c.label}</p>
                <span className="font-mono text-[11px] text-slate-500">{items.length}</span>
              </div>
              <p className="mt-1 font-mono text-lg font-semibold text-slate-900">{money(value)}</p>
              <ul className="mt-3 space-y-2">
                {items.map((l) => (
                  <li
                    key={l.name}
                    className="rounded-lg border border-slate-200 bg-white shadow-xs p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40"
                  >
                    <p className="text-[12px] font-semibold text-slate-900">{l.name}</p>
                    <p className="mt-0.5 text-[10.5px] text-slate-500">
                      {l.category} · {l.owner}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-brand-200">{money(l.value)}/mo</p>
                  </li>
                ))}
                {items.length === 0 && <li className="py-3 text-center text-[11px] text-slate-600">Empty</li>}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "Lead → pilot", v: "31%", s: "of qualified conversations" },
          { k: "Pilot → paid", v: "62%", s: "completion rate" },
          { k: "CAC", v: money(1840), s: "blended, per paying customer" },
        ].map((m, i) => (
          <div key={m.k} className="rounded-xl border border-slate-200 bg-white shadow-xs p-3.5">
            <p className="text-[11px] uppercase tracking-wider text-slate-500">{m.k}</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-slate-900">{m.v}</p>
            <p className="mt-1 text-[11px] text-slate-500">{m.s}</p>
            <div className="mt-2" style={{ animation: `rise .5s ease ${i * 80}ms both` }}>
              <Bar value={m.v.includes("₹") ? 44 : parseFloat(m.v)} tone={i === 2 ? "warn" : "brand"} delay={i * 90} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- Tasks --------------------------------- */
export function TasksPanel() {
  const { done, toggle, completed, total } = useTasks();
  return (
    <div className={cn("space-y-4", fadeUp)}>
      <Panel title="Founder action centre" note="Ranked by impact, not by who shouted loudest.">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-cyan-300 transition-all duration-500"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
          <span className="font-mono text-[11.5px] text-slate-600">
            {completed}/{total} done
          </span>
        </div>
        <ul className="space-y-2">
          {TASKS.map((t, i) => (
            <li key={t.id}>
              <button
                onClick={() => toggle(t.id)}
                aria-pressed={!!done[t.id]}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all duration-300",
                  done[t.id]
                    ? "border-emerald-400/25 bg-emerald-500/8"
                    : "border-slate-200 bg-slate-50 hover:border-brand-400/40 hover:bg-white/[0.05]",
                )}
                style={{ animation: `rise .5s cubic-bezier(.16,1,.3,1) ${i * 50}ms both` }}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-[5px] ring-1 transition-all",
                    done[t.id] ? "bg-emerald-400 text-ink-950 ring-emerald-300" : "bg-slate-100 ring-white/20",
                  )}
                  style={{ width: 18, height: 18 }}
                >
                  {done[t.id] && <IconCheck className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={cn("text-[12.5px] font-semibold", done[t.id] ? "text-slate-600 line-through" : "text-slate-900")}>
                      {t.title}
                    </span>
                    <Chip tone={t.priority === "Urgent" ? "bad" : t.priority === "High" ? "warn" : t.priority === "Medium" ? "brand" : "neutral"}>
                      {t.priority}
                    </Chip>
                    <Chip>{t.bucket}</Chip>
                  </span>
                  <span className="mt-1 block text-[11.5px] leading-relaxed text-slate-600">{t.detail}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

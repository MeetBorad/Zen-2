import { useState } from "react";
import { cn } from "@/utils/cn";
import { Orb, PrimaryButton, Reveal } from "./ui";
import { IconArrow, IconCheck, IconLock, IconRocket, IconSparkles } from "./Icons";

type Option = { label: string; hint?: string };
type Question = { id: string; q: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "stage",
    q: "What is the current stage of Zentap?",
    options: [
      { label: "Only the business plan exists", hint: "Nothing built yet" },
      { label: "Some parts are built", hint: "Website or demo live" },
      { label: "Customers use it, ops are manual", hint: "Growing, messy" },
      { label: "Platform is live", hint: "Need an admin dashboard" },
    ],
  },
  {
    id: "stack",
    q: "Which technology are you using?",
    options: [
      { label: "Next.js + Supabase", hint: "As per the manual" },
      { label: "WordPress or no-code", hint: "Webflow, Bubble…" },
      { label: "Something else", hint: "Custom stack" },
      { label: "I'm not sure", hint: "Advise me" },
    ],
  },
  {
    id: "device",
    q: "Where do you want to use the dashboard?",
    options: [
      { label: "Computer / desktop", hint: "Deep work" },
      { label: "Mobile phone", hint: "On the move" },
      { label: "Both", hint: "Responsive first" },
    ],
  },
  {
    id: "priority",
    q: "What is your biggest priority?",
    options: [
      { label: "Everything in one dashboard", hint: "Single pane" },
      { label: "Revenue & customers first", hint: "Billing clarity" },
      { label: "Google review automation first", hint: "Reputation" },
      { label: "Build the platform end to end", hint: "Full build" },
    ],
  },
];

function planFor(answers: Record<string, string>) {
  const steps: string[] = [];
  const stage = answers.stage ?? "";

  if (stage.startsWith("Only the business plan")) {
    steps.push("Phase 1 — Stand up the secure founder-only dashboard shell with a customer table, revenue metrics and filters.");
    steps.push("Phase 2 — Model the Supabase schema (merchants, scans, subscriptions, orders, audit logs) with row-level security from day one.");
  } else if (stage.startsWith("Some parts")) {
    steps.push("Phase 1 — Build the founder dashboard layout, customer table, revenue metrics and action centre on top of what exists.");
    steps.push("Phase 2 — Connect Supabase and replace every placeholder figure with real queries.");
  } else if (stage.startsWith("Customers use it")) {
    steps.push("Phase 1 — Ship the command center so manual ops stop living in spreadsheets and WhatsApp.");
    steps.push("Phase 3 — Integrate Razorpay events to track trials, payments, failures and cancellations accurately.");
  } else {
    steps.push("Phase 1 — Harden the founder admin panel: customers, revenue, trials, payments, reviews, fulfilment and alerts.");
    steps.push("Phase 5 — Add scheduled checks, error notifications, permission tiers and weekly founder reporting.");
  }

  if ((answers.stack ?? "").startsWith("Next.js")) {
    steps.push("Reuse your existing Next.js + Supabase setup — the dashboard becomes a protected /founder route with role-based access.");
  } else if ((answers.stack ?? "").startsWith("WordPress")) {
    steps.push("Run the command center as a standalone secure app and embed or link it from your existing site — no plugin fragility.");
  } else if ((answers.stack ?? "").startsWith("I'm not sure")) {
    steps.push("Recommendation: Next.js + Supabase, because it gives you multi-tenant data isolation and a founder route without a second codebase.");
  } else {
    steps.push("Map your current stack to a Supabase-backed data layer so billing, scans and review events land in one auditable place.");
  }

  if ((answers.device ?? "").startsWith("Mobile")) {
    steps.push("Design mobile-first: sticky KPI strip, bottom workspace rail and thumb-reachable action centre.");
  } else if ((answers.device ?? "").startsWith("Both")) {
    steps.push("Build responsive-first — desktop rail for analysis, mobile rail for your 10-minute morning check.");
  } else {
    steps.push("Optimise for desktop density first, then trim to a mobile view you can run from your phone.");
  }

  const priority = answers.priority ?? "";
  if (priority.startsWith("Revenue")) {
    steps.push("Priority: Razorpay + UPI AutoPay events first, so MRR, failed payments and trial conversions are trustworthy before anything else.");
  } else if (priority.startsWith("Google review")) {
    steps.push("Priority: Google Business Profile OAuth, review detection and AI reply publishing with a fail-safe approval queue.");
  } else if (priority.startsWith("Build the platform")) {
    steps.push("Priority: end-to-end rollout — dashboard, billing, reviews, standee fulfilment, then automation and alerting.");
  } else {
    steps.push("Priority: unify customers, revenue, reviews, scans, orders, health, pipeline and tasks into one screen with a daily action centre.");
  }

  return steps;
}

export default function StartCTA() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const q = QUESTIONS[step];
  const done = step >= QUESTIONS.length;
  const steps = done ? planFor(answers) : [];
  const progress = (Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100;

  const pick = (label: string) => {
    setAnswers((a) => ({ ...a, [q.id]: label }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  return (
    <section id="start" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <Orb className="left-[-10rem] top-0" color="brand" size={560} />
      <Orb className="right-[-8rem] bottom-0" color="violet" size={520} delay={3000} />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 mask-fade-b opacity-30" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-100">
              <IconRocket className="h-3.5 w-3.5" /> Let's build your command center
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.05] text-white">
              Start the pilot.
              <br />
              <span className="text-gradient">Keep the growth engine.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-slate-400">
              Four quick questions and we'll map your rollout — the secure founder dashboard first, then billing,
              reviews, fulfilment and automation. No sales call required to begin.
            </p>
          </Reveal>
          <Reveal delay={210}>
            <ul className="mt-7 space-y-3">
              {[
                "Free 14-day pilot · no card required",
                "Branded standee designed and shipped for you",
                "₹2,999/month only if you decide to continue",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-slate-300">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25">
                    <IconCheck className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal dir="scale">
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-ink-900/80 p-6 shadow-[0_50px_120px_-45px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-8">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
            />
            {!done ? (
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Zentap dashboard setup
                  </p>
                  <span className="font-mono text-[11.5px] text-slate-400">
                    {step + 1}/{QUESTIONS.length}
                  </span>
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-cyan-300 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <h3 className="mt-6 text-[19px] font-semibold leading-snug text-white sm:text-[21px]">{q.q}</h3>
                <p className="mt-1.5 text-[12.5px] text-slate-500">Choose the closest match — partial answers are fine.</p>

                <div className="mt-5 space-y-2.5">
                  {q.options.map((o, i) => {
                    const selected = answers[q.id] === o.label;
                    return (
                      <button
                        key={o.label}
                        onClick={() => pick(o.label)}
                        aria-pressed={selected}
                        className={cn(
                          "group flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300",
                          selected
                            ? "border-brand-400/50 bg-brand-500/12"
                            : "border-white/8 bg-white/[0.025] hover:-translate-y-0.5 hover:border-brand-400/35 hover:bg-white/[0.05]",
                        )}
                        style={{ animation: `rise .5s cubic-bezier(.16,1,.3,1) ${i * 55}ms both` }}
                      >
                        <span
                          className={cn(
                            "grid h-4 w-4 shrink-0 place-items-center rounded-full ring-1 transition-all duration-300",
                            selected ? "bg-brand-400 ring-brand-300" : "bg-white/5 ring-white/20 group-hover:ring-brand-300/60",
                          )}
                        >
                          {selected && <IconCheck className="h-2.5 w-2.5 text-ink-950" strokeWidth={4} />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-semibold text-white">{o.label}</span>
                          {o.hint && <span className="mt-0.5 block text-[11.5px] text-slate-500">{o.hint}</span>}
                        </span>
                        <IconArrow className="ml-auto h-4 w-4 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-200" />
                      </button>
                    );
                  })}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-5 text-[12px] font-medium text-slate-500 transition-colors hover:text-slate-300"
                  >
                    ← Back
                  </button>
                )}
              </div>
            ) : (
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/12 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
                  <IconSparkles className="h-3.5 w-3.5" /> Your rollout plan
                </span>
                <h3 className="mt-5 text-[21px] font-bold leading-snug text-white">
                  Start with a secure founder-only dashboard
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                  Based on your answers, this is the sequence we would run. Once it works on real data, it expands into
                  the full automated command center.
                </p>
                <ol className="mt-5 space-y-2.5">
                  {steps.map((s, i) => (
                    <li
                      key={s}
                      className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5"
                      style={{ animation: `rise .55s cubic-bezier(.16,1,.3,1) ${i * 80}ms both` }}
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 font-mono text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-[12.5px] leading-relaxed text-slate-300">{s}</span>
                    </li>
                  ))}
                </ol>

                {!sent ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="mt-6 flex flex-col gap-2.5 sm:flex-row"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourbusiness.com"
                      aria-label="Work email"
                      className="min-w-0 flex-1 rounded-full border border-white/10 bg-ink-950/70 px-4 py-3 text-[13.5px] text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-[linear-gradient(105deg,#4f46e5,#7c3aed_50%,#0891b2)] px-5 py-3 text-[13.5px] font-semibold text-white shadow-[0_12px_36px_-12px_rgba(124,58,237,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Send my plan
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-4">
                    <p className="text-[13px] font-semibold text-white">Plan ready, {email} 🎉</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-emerald-100/80">
                      This prototype runs entirely in your browser — nothing was submitted. In production this would
                      create your founder account and open the pilot.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setStep(0);
                        setAnswers({});
                        setEmail("");
                      }}
                      className="mt-3 text-[12px] font-semibold text-emerald-200 underline-offset-4 hover:underline"
                    >
                      Run through the questions again
                    </button>
                  </div>
                )}

                <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-500">
                  <IconLock className="h-3.5 w-3.5" /> Answers stay in your browser in this demo.
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(120deg,rgba(79,70,229,0.28),rgba(168,85,247,0.16)_45%,rgba(34,211,238,0.22))] p-8 text-center sm:p-14">
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-ink-950/45 backdrop-blur-xl" />
            <div className="relative">
              <h3 className="text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold leading-tight text-white">
                Your next customer is already deciding
                <br className="hidden sm:block" /> based on your reviews.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Put a Zentap standee on the counter for 14 days. Watch what happens to your rating, your replies and your
                revenue — then decide.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PrimaryButton href="#pricing" size="lg">
                  Start the free 14-day pilot
                </PrimaryButton>
                <a
                  href="#command-center"
                  className="rounded-full glass px-7 py-4 text-[15px] font-semibold text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12 hover:text-white"
                >
                  Revisit the command center
                </a>
              </div>
              <p className="mt-6 text-[11.5px] text-slate-400">
                No card required · Cancel anytime · Setup in under 10 minutes
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

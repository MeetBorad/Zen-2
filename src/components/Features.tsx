import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading } from "./ui";
import {
  IconActivity,
  IconCard,
  IconChat,
  IconNfc,
  IconPrinter,
  IconShield,
  IconSparkles,
} from "./Icons";

type Feature = {
  icon: ReactNode;
  title: string;
  copy: string;
  span?: string;
  tone: string;
  extra?: ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: <IconNfc className="h-5 w-5" />,
    title: "NFC + QR standees that work the room",
    copy: "We auto-generate A6 counter artwork with your brand, your unique link and an NFC chip. Guests tap, scan and land straight on your Google review form — no app, no login, no friction.",
    tone: "from-brand-500/25",
    span: "lg:col-span-2",
    extra: (
      <div className="mt-5 flex flex-wrap gap-2">
        {["Auto artwork", "NFC chip", "Unique short link", "Print + ship included"].map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
            {t}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: <IconSparkles className="h-5 w-5" />,
    title: "AI replies that sound like you",
    copy: "Zentap drafts a reply in your tone, checks it for compliance, then publishes it to your Google Business Profile in minutes.",
    tone: "from-violet-500/25",
    extra: (
      <div className="mt-4 space-y-2">
        <div className="rounded-lg border border-white/8 bg-ink-950/60 p-2.5 text-[11px] leading-relaxed text-slate-400">
          “Thanks so much, Priya! We'll have your usual table ready next Friday. 🌿”
        </div>
        <div className="flex items-center gap-2 text-[10.5px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Published automatically · 3 min
        </div>
      </div>
    ),
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "Private feedback, honest reviews",
    copy: "Unhappy guests can reach you privately first — and still get a clear, one-tap path to a public Google review. Policy-safe by design.",
    tone: "from-emerald-500/20",
  },
  {
    icon: <IconCard className="h-5 w-5" />,
    title: "Subscriptions that don't chase you",
    copy: "₹2,999/month via Razorpay and UPI AutoPay. Trials, renewals, failures and cancellations are tracked for you.",
    tone: "from-cyan-500/20",
  },
  {
    icon: <IconChat className="h-5 w-5" />,
    title: "One record per business",
    copy: "Merchant ID, Google connection, standee status, trial window and activity history in a single row you can actually read.",
    tone: "from-indigo-500/20",
    span: "lg:col-span-2",
    extra: (
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {[
          { k: "Connected", v: "7 of 8" },
          { k: "Standee live", v: "5 of 8" },
          { k: "Needs onboarding", v: "1" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-[10.5px] uppercase tracking-wider text-slate-500">{s.k}</p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">{s.v}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <IconPrinter className="h-5 w-5" />,
    title: "Fulfilment you can see",
    copy: "Artwork → printer acknowledgement → production → dispatch → delivered. No customer disappears between signup and delivery.",
    tone: "from-amber-500/18",
  },
  {
    icon: <IconActivity className="h-5 w-5" />,
    title: "Alerts before complaints",
    copy: "Broken redirects, expired OAuth tokens, failed webhooks and stuck AI jobs — with the affected customer attached.",
    tone: "from-rose-500/18",
  },
];

export default function Features() {
  return (
    <Section id="platform">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(45% 35% at 15% 10%, rgba(99,102,241,0.12), transparent 70%), radial-gradient(40% 35% at 85% 60%, rgba(34,211,238,0.09), transparent 70%)",
        }}
      />
      <SectionHeading
        eyebrow="The platform"
        title="Everything a local business needs,"
        highlight="nothing it doesn't"
        copy="Zentap combines hardware, automation and software into one subscription — so reputation, revenue and operations stop living in five different tools."
        icon={<span className="text-brand-300">◆</span>}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 70} className={cn(f.span)}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] p-6 card-hover hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.05] sm:p-7">
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                  f.tone,
                )}
              />
              <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-gradient-to-br from-white/12 to-white/[0.02] text-brand-200 transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_28px_-6px_rgba(129,140,248,0.8)]">
                {f.icon}
              </span>
              <h3 className="relative mt-5 text-[17px] font-semibold leading-snug text-white">{f.title}</h3>
              <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-slate-400">{f.copy}</p>
              {f.extra && <div className="relative mt-auto">{f.extra}</div>}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

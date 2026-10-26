import { useState } from "react";
import { IconArrow, IconCheck, IconMail } from "./Icons";

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAuth: () => void;
}

const COLS = [
  {
    title: "Platform",
    links: [
      "NFC + QR standees",
      "AI review replies",
      "Private feedback",
      "Founder command center",
      "Scan analytics",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Jewellers & retail",
      "Cafés & restaurants",
      "Salons & spas",
      "Gyms & fitness",
      "Clinics & dentists",
    ],
  },
  {
    title: "Company",
    links: [
      "About Zentap",
      "Ahmedabad Pilot Hub",
      "Partner program",
      "Press kit",
      "Contact: +91 8788416911",
    ],
  },
  {
    title: "Resources",
    links: [
      "Founder Blueprint (PDF)",
      "Google Review Policy",
      "Razorpay AutoPay Guide",
      "System status",
      "API documentation",
    ],
  },
];

export default function Footer({
  onOpenPrivacy,
  onOpenTerms,
  onOpenAuth,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950 px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full opacity-40 blur-[80px]"
        style={{ background: "radial-gradient(circle,rgba(99,102,241,0.4),transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <img
                src="/zentap-logo-white.png"
                alt="Zentap Logo"
                className="h-9 w-9 rounded-xl object-contain shadow-[0_4px_16px_-4px_rgba(99,102,241,0.8)]"
              />
              <span className="font-display text-[18px] font-black tracking-tight text-white">
                Zen<span className="text-gradient-brand">tap</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-slate-400">
              The AI growth OS for local business. NFC & QR review standees, Google review automation,
              private feedback and recurring subscriptions — run from one cloud platform.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Local business review management, made simpler</span>
            </div>

            <div className="mt-3 text-xs text-slate-400">
              Founder Helpline: <a href="tel:+918788416911" className="text-brand-300 hover:underline">+91 8788416911</a>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setOk(true);
              }}
              className="mt-6 max-w-sm"
            >
              <label
                htmlFor="footer-email"
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Founder notes & review insights, monthly
              </label>
              <div className="mt-2.5 flex gap-2">
                <div className="relative flex-1">
                  <IconMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-[13px] text-white placeholder:text-slate-600 focus:border-brand-400/60 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500"
                >
                  {ok ? (
                    <IconCheck className="h-4 w-4 text-emerald-300" strokeWidth={3} />
                  ) : (
                    <IconArrow className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                {ok ? "Subscribed! Welcome to the Zentap Founder Dispatch." : "Playbooks on Google reviews, retention and local growth."}
              </p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      {l.includes("Blueprint") ? (
                        <a
                          href="/Zentap_Founders_Master_Blueprint.pdf"
                          target="_blank"
                          className="group inline-flex items-center text-[13px] text-brand-300 transition-colors duration-300 hover:text-white"
                        >
                          <span className="mr-0 h-px w-0 bg-brand-300 transition-all duration-300 group-hover:mr-1.5 group-hover:w-3" />
                          {l}
                        </a>
                      ) : (
                        <a
                          href="#top"
                          className="group inline-flex items-center text-[13px] text-slate-400 transition-colors duration-300 hover:text-white"
                        >
                          <span className="mr-0 h-px w-0 bg-brand-300 transition-all duration-300 group-hover:mr-1.5 group-hover:w-3" />
                          {l}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <p className="text-[11.5px] leading-relaxed text-slate-400">
            <strong className="font-semibold text-slate-300">Platform Compliance Guarantee:</strong>{" "}
            Zentap is fully compliant with Google Business Profile Policies. While our standees and
            AI engine give dissatisfied customers an instant private channel to contact showroom owners,
            every customer retains an unimpeded right to leave an authentic public Google review.
            All merchant tokens are encrypted with AES-256 and payments are processed via RBI-compliant
            Razorpay Subscriptions.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-[12px] text-slate-500">
            © {new Date().getFullYear()} Zentap Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-slate-400">
            <button
              onClick={onOpenAuth}
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Sign In / Sign Up
            </button>
            <button
              onClick={onOpenPrivacy}
              className="transition-colors hover:text-white cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="transition-colors hover:text-white cursor-pointer"
            >
              Terms of Service
            </button>
            <a
              href="/Zentap_Founders_Master_Blueprint.pdf"
              target="_blank"
              className="text-brand-300 hover:underline"
            >
              Founder Master Blueprint PDF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useScrollReveal, useScrollState } from "@/lib/hooks";
import { TaskProvider } from "@/lib/tasks";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import CommandCenter from "@/components/CommandCenter";
import ActionCentre from "@/components/ActionCentre";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import StartCTA from "@/components/StartCTA";
import Footer from "@/components/Footer";
import MerchantPortal from "@/components/MerchantPortal";
import AuthModal from "@/components/AuthModal";
import StandeeSimulatorModal from "@/components/StandeeSimulatorModal";
import OnboardingModal from "@/components/OnboardingModal";
import LegalModal from "@/components/LegalModal";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { IconChevron, IconLock, IconPulse, IconQr, IconZap } from "@/components/Icons";

function StickyMobileCta({ onOpenPilot }: { onOpenPilot: () => void }) {
  const { scrolled } = useScrollState(900);
  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 sm:hidden",
        scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <button
        onClick={onOpenPilot}
        className="w-full flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-ink-900/95 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
      >
        <span className="text-left">
          <span className="block text-[13px] font-semibold text-white">Start 14-day free pilot</span>
          <span className="block text-[11px] text-slate-400">1 free acrylic standee · ₹2,999/mo after</span>
        </span>
        <span className="rounded-full bg-[linear-gradient(105deg,#4f46e5,#7c3aed_50%,#0891b2)] px-4 py-2 text-[12.5px] font-semibold text-white">
          Start
        </span>
      </button>
    </div>
  );
}

function BackToTop() {
  const { scrolled } = useScrollState(1400);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-5 right-5 z-40 hidden h-11 w-11 place-items-center rounded-full glass text-white transition-all duration-500 hover:-translate-y-1 hover:bg-white/12 sm:grid",
        scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <IconChevron className="h-4 w-4 rotate-180" strokeWidth={2.2} />
    </button>
  );
}

function CommandCenterIntro({ onOpenStaffLogin }: { onOpenStaffLogin: () => void }) {
  return (
    <Section id="command-center" className="pt-0 sm:pt-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(99,102,241,0.12), transparent 70%)",
        }}
      />
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row mb-6">
        <SectionHeading
          eyebrow="Founder command center"
          title="Run the entire business from"
          highlight="one screen"
          copy="Customers, subscriptions, revenue, Google reviews, standees, AI automation, technical health and growth — without checking five systems every morning."
          icon={<IconPulse className="h-3.5 w-3.5 text-brand-300" />}
        />
      </div>

      <div className="flex justify-end mb-3">
        <button
          onClick={onOpenStaffLogin}
          className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
        >
          <IconLock className="h-3 w-3" />
          <span>Open Fullscreen Staff Console (with 1-Click Login) →</span>
        </button>
      </div>

      <Reveal delay={120} dir="scale" className="mt-4">
        <CommandCenter />
      </Reveal>
      <Reveal delay={180}>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "It shows what's working",
              d: "MRR trend, trial conversion, scan-to-review funnel and AI reply success — defined consistently, period over period.",
            },
            {
              t: "It shows what's broken",
              d: "Failed webhooks, expired OAuth tokens, stuck AI jobs and standee delivery gaps, each with the affected customer attached.",
            },
            {
              t: "It tells you what to do",
              d: "A ranked action centre that turns the day's data into six decisions instead of forty notifications.",
            },
          ].map((c, i) => (
            <div
              key={c.t}
              className="group rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/30 hover:bg-white/[0.05]"
            >
              <p className="font-mono text-[11px] text-brand-300">0{i + 1}</p>
              <p className="mt-2 text-[14px] font-semibold text-white">{c.t}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">{c.d}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export default function App() {
  useScrollReveal();
  const [ready, setReady] = useState(false);
  const [currentView, setCurrentView] = useState<"marketing" | "merchant" | "staff">("marketing");
  
  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"merchant" | "staff">("merchant");
  const [standeeModalOpen, setStandeeModalOpen] = useState(false);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Growth ₹2,999");
  const [legalModalType, setLegalModalType] = useState<"privacy" | "terms" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleOpenMerchantLogin = () => {
    setAuthModalTab("merchant");
    setAuthModalOpen(true);
  };

  const handleOpenStaffLogin = () => {
    setAuthModalTab("staff");
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (role: "merchant" | "staff") => {
    if (role === "merchant") {
      setCurrentView("merchant");
    } else {
      setCurrentView("staff");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToMarketing = () => {
    setCurrentView("marketing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setOnboardingModalOpen(true);
  };

  return (
    <TaskProvider>
      <div
        className={cn(
          "relative min-h-screen bg-ink-950 transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      >
        {/* ============================================================== */}
        {/* VIEW 1: SEPARATE MERCHANT DASHBOARD PAGE                       */}
        {/* ============================================================== */}
        {currentView === "merchant" ? (
          <div className="animate-fade-in">
            <MerchantPortal
              onOpenStandeeSimulator={() => setStandeeModalOpen(true)}
              onOpenOnboarding={() => setOnboardingModalOpen(true)}
              onBackToMarketing={handleBackToMarketing}
              onOpenStaffConsole={() => {
                setCurrentView("staff");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        ) : currentView === "staff" ? (
          /* ============================================================== */
          /* VIEW 2: SEPARATE STAFF / FOUNDER COMMAND CONSOLE PAGE          */
          /* ============================================================== */
          <div className="animate-fade-in min-h-screen bg-ink-950 text-slate-100 pb-16">
            {/* Top Dedicated Nav for Staff Console */}
            <nav className="sticky top-0 z-40 border-b border-white/8 bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:px-8">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBackToMarketing}
                    className="group inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                    <span>Marketing Site</span>
                  </button>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-2">
                    <img
                      src="/zentap-logo-white.png"
                      alt="Zentap"
                      className="h-6 w-6 rounded-lg object-contain"
                    />
                    <span className="font-display text-sm font-black text-white">
                      Zen<span className="text-gradient-brand">tap</span>
                    </span>
                    <span className="text-[11px] text-cyan-400 font-mono hidden sm:inline">
                      / Staff & Founder Console
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden sm:flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>8 Active Merchant Schemas</span>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView("merchant");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20"
                  >
                    <span>View as Virat Gold Palace →</span>
                  </button>

                  <button
                    onClick={handleBackToMarketing}
                    className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition hover:bg-white/5"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </nav>

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
              {/* Staff Banner */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 font-bold">
                    🛡️
                  </span>
                  <div>
                    <p className="font-bold text-white text-sm">Founder Master Command Center</p>
                    <p className="text-cyan-200 text-xs mt-0.5">
                      Multi-tenant administrative overview across all subscribed merchants. Top Client: <strong>Virat Gold Palace</strong> (Nikol, Ahmedabad).
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleBackToMarketing}
                  className="self-end sm:self-auto shrink-0 rounded-lg bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300 hover:bg-white/15"
                >
                  Exit to Website →
                </button>
              </div>

              <CommandCenter />
              <div className="mt-8">
                <ActionCentre />
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* VIEW 3: MAIN MARKETING WEBSITE                                 */
          /* ============================================================== */
          <>
            <Nav
              onOpenMerchantLogin={handleOpenMerchantLogin}
              onOpenStaffLogin={handleOpenStaffLogin}
              onOpenStandeeSimulator={() => setStandeeModalOpen(true)}
              onOpenOnboarding={() => setOnboardingModalOpen(true)}
            />

            <main>
              <Hero
                onOpenOnboarding={() => setOnboardingModalOpen(true)}
                onOpenMerchantLogin={handleOpenMerchantLogin}
                onOpenStaffLogin={handleOpenStaffLogin}
                onOpenStandeeSimulator={() => setStandeeModalOpen(true)}
              />
              <Stats />
              <Features />
              <CommandCenterIntro onOpenStaffLogin={handleOpenStaffLogin} />
              <ActionCentre />
              <HowItWorks />
              <Benefits />
              <Testimonials />
              <Pricing onSelectPlan={handleSelectPlan} />
              <FAQ />
              <StartCTA />
            </main>

            <Footer
              onOpenPrivacy={() => setLegalModalType("privacy")}
              onOpenTerms={() => setLegalModalType("terms")}
              onOpenStandeeSimulator={() => setStandeeModalOpen(true)}
              onOpenMerchantLogin={handleOpenMerchantLogin}
              onOpenStaffLogin={handleOpenStaffLogin}
            />

            <StickyMobileCta onOpenPilot={() => setOnboardingModalOpen(true)} />
            <BackToTop />
          </>
        )}

        {/* ============================================================== */}
        {/* GLOBAL INTERACTIVE MODALS                                      */}
        {/* ============================================================== */}
        <AuthModal
          isOpen={authModalOpen}
          initialTab={authModalTab}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onOpenPilot={() => setOnboardingModalOpen(true)}
        />

        <StandeeSimulatorModal
          isOpen={standeeModalOpen}
          onClose={() => setStandeeModalOpen(false)}
          businessName="Virat Gold Palace"
          category="Jewellery Showroom"
          city="Nikol, Ahmedabad"
        />

        <OnboardingModal
          isOpen={onboardingModalOpen}
          onClose={() => setOnboardingModalOpen(false)}
          initialPlan={selectedPlan}
        />

        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </TaskProvider>
  );
}

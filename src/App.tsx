import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useScrollReveal, useScrollState, useScrollProgress } from "@/lib/hooks";
import { TaskProvider } from "@/lib/tasks";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import StartCTA from "@/components/StartCTA";
import Footer from "@/components/Footer";
import AuthPage from "@/components/AuthPage";
import AdminDashboard from "@/components/AdminDashboard";
import MerchantPreview from "@/components/MerchantPreview";
import LegalModal from "@/components/LegalModal";
import { hasInitialAuthCallback, isInitialSignupConfirmation, supabase } from "@/lib/supabase";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { IconChevron, IconPulse } from "@/components/Icons";

function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-500 origin-left transition-transform duration-100"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

function StickyMobileCta({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { scrolled } = useScrollState(900);
  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 transition-all duration-500 sm:hidden",
        scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <button
        onClick={onOpenAuth}
        className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/12 bg-ink-900/95 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
      >
        Sign In / Sign Up
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

const previewMerchantDemoEnabled =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_PREVIEW_MERCHANT_DEMO;

function getPageFromHash(): "home" | "auth" | "admin" | "merchant-demo" {
  const hash = window.location.hash.slice(1);
  const authCallback = new URLSearchParams(hash);
  if (
    hasInitialAuthCallback ||
    authCallback.has("access_token") ||
    authCallback.has("error_code") ||
    authCallback.has("error")
  ) {
    return "auth";
  }

  const route = hash.replace(/^\//, "").split("?")[0];
  if (route === "auth") return "auth";
  if (route === "admin") return "admin";
  if (route === "merchant-demo" && previewMerchantDemoEnabled) return "merchant-demo";
  return "home";
}

function getAuthRoleFromHash(): "merchant" | "staff" {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  return params.get("role") === "staff" ? "staff" : "merchant";
}

function getAuthModeFromHash(): "signin" | "signup" {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  return params.get("mode") === "signup" ? "signup" : "signin";
}

function getAuthPlanFromHash(): string | undefined {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  return params.get("plan") ?? undefined;
}

function CommandCenterIntro() {
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
  const [page, setPage] = useState<"home" | "auth" | "admin" | "merchant-demo">(() => getPageFromHash());
  const [authRole, setAuthRole] = useState<"merchant" | "staff">(() => getAuthRoleFromHash());
  const [authMode, setAuthMode] = useState<"signin" | "signup">(() => getAuthModeFromHash());
  const [authPlan, setAuthPlan] = useState<string | undefined>(() => getAuthPlanFromHash());
  const [emailConfirmationResult, setEmailConfirmationResult] = useState<"confirmed" | "error" | null>(null);
  const [legalModalType, setLegalModalType] = useState<"privacy" | "terms" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const syncPage = () => {
      setPage(getPageFromHash());
      setAuthRole(getAuthRoleFromHash());
      setAuthMode(getAuthModeFromHash());
      setAuthPlan(getAuthPlanFromHash());
    };
    window.addEventListener("hashchange", syncPage);
    syncPage();
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    const callbackParams = new URLSearchParams(window.location.hash.slice(1));
    const hasAuthCallback =
      hasInitialAuthCallback ||
      callbackParams.has("access_token") ||
      callbackParams.has("error_code") ||
      callbackParams.has("error");
    if (!hasAuthCallback) return;

    let active = true;
    setPage("auth");
    setAuthRole("merchant");
    setAuthMode("signin");
    setAuthPlan(undefined);

    void (async () => {
      let result: "confirmed" | "error" = "error";
      const accessToken = callbackParams.get("access_token");
      const refreshToken = callbackParams.get("refresh_token");
      const hasError = callbackParams.has("error") || callbackParams.has("error_code");

      if (!hasError && (isInitialSignupConfirmation || accessToken)) {
        try {
          if (accessToken && refreshToken) {
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (!sessionError && sessionData.session) {
              result = "confirmed";
            }
          }
          if (result !== "confirmed") {
            const { data, error } = await supabase.auth.getSession();
            if (!error && data.session) result = "confirmed";
          }
        } catch {
          result = "error";
        }
      }

      if (!active) return;
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#/auth?role=merchant&mode=signin`,
      );
      setPage("auth");
      setAuthRole("merchant");
      setAuthMode("signin");
      setAuthPlan(undefined);
      setEmailConfirmationResult(result);
    })();

    return () => {
      active = false;
    };
  }, []);

  const navigateHome = useCallback(() => {
    setEmailConfirmationResult(null);
    window.location.hash = "top";
  }, []);

  const navigateToAuth = useCallback((
    role: "merchant" | "staff" = "merchant",
    mode: "signin" | "signup" = "signin",
    plan?: string,
  ) => {
    const params = new URLSearchParams({ role, mode });
    if (plan) params.set("plan", plan);
    window.location.hash = `/auth?${params.toString()}`;
  }, []);

  const navigateToAdmin = useCallback(() => {
    window.location.hash = "/admin";
  }, []);

  const navigateToMerchantDemo = useCallback(() => {
    window.location.hash = "/merchant-demo";
  }, []);

  const handleOpenMerchantLogin = useCallback(() => {
    navigateToAuth("merchant");
  }, [navigateToAuth]);

  const handleOpenStaffLogin = useCallback(() => {
    navigateToAuth("staff");
  }, [navigateToAuth]);

  const handleSelectPlan = (plan: string) => navigateToAuth("merchant", "signup", plan);

  if (page === "auth") {
    return (
      <AuthPage
        key={`${authRole}-${authMode}-${authPlan ?? ""}`}
        initialRole={authRole}
        initialMode={authMode}
        initialPlan={authPlan}
        emailConfirmationResult={emailConfirmationResult}
        showDemoLogin={previewMerchantDemoEnabled}
        onBackToHome={navigateHome}
        onDemoLogin={navigateToMerchantDemo}
        onStaffAuthenticated={navigateToAdmin}
      />
    );
  }

  if (page === "merchant-demo" && previewMerchantDemoEnabled) {
    return <MerchantPreview onExit={() => navigateToAuth("merchant")} />;
  }

  if (page === "admin") {
    return (
      <AdminDashboard
        onBackToHome={navigateHome}
        onSignOut={navigateHome}
        onUnauthorized={handleOpenStaffLogin}
      />
    );
  }

  return (
    <TaskProvider>
      <div
        className={cn(
          "relative min-h-screen bg-ink-950 transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      >
        <ScrollProgressBar />
        <Nav onOpenAuth={handleOpenMerchantLogin} />

        <main>
          <Hero onOpenAuth={handleOpenMerchantLogin} />
          <Stats />
          <Features />
          <CommandCenterIntro />
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
          onOpenAuth={handleOpenMerchantLogin}
        />

        <StickyMobileCta onOpenAuth={handleOpenMerchantLogin} />
        <BackToTop />

        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </TaskProvider>
  );
}

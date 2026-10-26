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
        className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg active:scale-95"
      >
        📦 સ્ટેન્ડી ઓર્ડર કરો / Sign In
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
        "fixed bottom-5 right-5 z-40 hidden h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white shadow-md text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 sm:grid",
        scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <IconChevron className="h-4 w-4 rotate-180" strokeWidth={2.2} />
    </button>
  );
}

const previewMerchantDemoEnabled =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_PREVIEW_MERCHANT_DEMO;

function getPageFromHash(): "home" | "auth" | "admin" | "merchant" | "merchant-demo" {
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
  if (route === "merchant" || route === "merchant-demo" || route === "dashboard") return "merchant";
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
    <Section id="command-center" className="pt-0 sm:pt-0 bg-white">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row mb-6">
        <SectionHeading
          eyebrow="મર્ચન્ટ કંટ્રોલ (Merchant Portal)"
          title="તમારા શોરૂમનો સમગ્ર ગ્રોથ"
          highlight="એક જ સ્ક્રીન પરથી"
          copy="તમારા કાઉન્ટર સ્ટેન્ડી સ્કેન, ગૂગલ રિવ્યુ, AI જવાબો અને UPI બિલિંગ — બધું જ તમારા મોબાઇલમાંથી મેનેજ કરો."
          icon={<IconPulse className="h-3.5 w-3.5 text-blue-600" />}
        />
      </div>

      <Reveal delay={180}>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "લાઇવ સ્કેન ટ્રેકિંગ",
              d: "રોજ કેટલા ગ્રાહકોએ સ્ટેન્ડી પર ટેપ કર્યું અને કેટલા રિવ્યુ ગૂગલ પર આવ્યા તેનો ચોક્કસ રિપોર્ટ.",
            },
            {
              t: "નેગેટિવ રિવ્યુ પ્રોટેક્શન",
              d: "કોઈ પણ નારાજ ગ્રાહકનો ફીડબેક સીધો તમારા WhatsApp પર આવશે, જેથી તમે તરત જ સમાધાન લાવી શકો.",
            },
            {
              t: "ઓટોમેટિક ગૂગલ AI રિપ્લાય",
              d: "દરેક ૫-સ્ટાર રિવ્યુનો આભાર માનતો સુંદર જવાબ AI આપોઆપ ગૂગલ મેપ્સ પર ૧૫ મિનિટમાં પોસ્ટ કરે છે.",
            },
          ].map((c, i) => (
            <div
              key={c.t}
              className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md hover:bg-white"
            >
              <p className="font-mono text-xs font-bold text-blue-600">0{i + 1}</p>
              <p className="mt-2 text-base font-bold text-slate-900">{c.t}</p>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{c.d}</p>
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
  const [page, setPage] = useState<"home" | "auth" | "admin" | "merchant" | "merchant-demo">(() => getPageFromHash());
  const [currentUser, setCurrentUser] = useState<any>(null);
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
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        setCurrentUser(data.session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
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

  const navigateToMerchant = useCallback(() => {
    window.location.hash = "/merchant";
  }, []);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    window.location.hash = "top";
  }, []);

  const handleOpenMerchantLogin = useCallback(() => {
    if (currentUser) {
      navigateToMerchant();
    } else {
      navigateToAuth("merchant");
    }
  }, [currentUser, navigateToMerchant, navigateToAuth]);

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
        onDemoLogin={navigateToMerchant}
        onStaffAuthenticated={navigateToAdmin}
        onMerchantAuthenticated={(user) => {
          setCurrentUser(user);
          navigateToMerchant();
        }}
      />
    );
  }

  if (page === "merchant" || (page === "merchant-demo" && previewMerchantDemoEnabled)) {
    return <MerchantPreview user={currentUser} onExit={handleSignOut} />;
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
          "relative min-h-screen bg-slate-50 text-slate-900 transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      >
        <ScrollProgressBar />
        <Nav
          onOpenAuth={handleOpenMerchantLogin}
          currentUser={currentUser}
          onOpenDashboard={navigateToMerchant}
        />

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

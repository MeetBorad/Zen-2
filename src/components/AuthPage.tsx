import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { BUSINESS_CATEGORIES } from "@/lib/business-categories";
import { IconLock } from "./Icons";

type AuthMode = "signin" | "signup";
type AuthRole = "merchant" | "staff";

interface AuthPageProps {
  initialRole: AuthRole;
  initialMode: AuthMode;
  initialPlan?: string;
  emailConfirmationResult?: "confirmed" | "error" | null;
  showDemoLogin: boolean;
  onBackToHome: () => void;
  onDemoLogin: () => void;
  onStaffAuthenticated: () => void;
}

const getAuthRedirectUrl = () => {
  if (typeof window !== "undefined") {
    if (window.location.hostname.includes("zentapdigitalsolutions.com")) {
      return "https://zentapdigitalsolutions.com";
    }
    if (window.location.hostname.endsWith(".vercel.app")) {
      return window.location.origin;
    }
  }
  return "https://zentapdigitalsolutions.com";
};

export default function AuthPage({
  initialRole,
  initialMode,
  initialPlan,
  emailConfirmationResult,
  showDemoLogin,
  onBackToHome,
  onDemoLogin,
  onStaffAuthenticated,
}: AuthPageProps) {
  const [role, setRole] = useState<AuthRole>(initialRole);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [notificationWarning, setNotificationWarning] = useState("");
  const [confirmationPending, setConfirmationPending] = useState(false);

  const changeRole = (nextRole: AuthRole) => {
    setRole(nextRole);
    setMode("signin");
    setMessage("");
    setError("");
    setNotificationWarning("");
    setConfirmationPending(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    setNotificationWarning("");
    setConfirmationPending(false);

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: getAuthRedirectUrl(),
            data: {
              full_name: name.trim(),
              business_name: businessName.trim(),
              business_category: businessCategory,
              business_city: businessCity.trim(),
              phone: phone.trim(),
              ...(initialPlan ? { selected_plan: initialPlan } : {}),
            },
          },
        });
        if (signUpError) throw signUpError;

        let notificationWarningText = "";
        if (data.user) {
          try {
            const notificationResponse = await fetch("/api/notifications/new-customer", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: data.user.id }),
            });
            if (!notificationResponse.ok) {
              notificationWarningText =
                "Your account was created, but the Telegram notification could not be delivered. Your signup details are still saved in Supabase Auth.";
            }
          } catch {
            notificationWarningText =
              "Your account was created, but the Telegram notification could not be delivered. Your signup details are still saved in Supabase Auth.";
          }
        } else {
          notificationWarningText =
            "Your account was created, but its signup details could not be verified for Telegram notification.";
        }

        setMessage(
          data.session
            ? "Your account is ready. Your business details are saved; merchant workspace access must be linked by the Zentap team."
            : "Check your email to confirm your account. Your business details are saved; your merchant workspace will be linked by the Zentap team.",
        );
        setConfirmationPending(!data.session);
        setNotificationWarning(notificationWarningText);
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;

      if (role === "staff") {
        if (data.user.app_metadata.role !== "staff") {
          await supabase.auth.signOut();
          throw new Error("This account is not authorized for staff access.");
        }
        onStaffAuthenticated();
        return;
      }

      setMessage(
        "Signed in successfully. This account does not have a merchant workspace linked yet; contact the Zentap team to enable it.",
      );
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email.trim()) {
      setError("Enter the email address you used to create your account.");
      return;
    }

    setBusy(true);
    setError("");
    setMessage("");
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: { emailRedirectTo: getAuthRedirectUrl() },
      });
      if (resendError) throw resendError;
      setMessage("If this account still needs confirmation, a new confirmation email has been sent.");
    } catch (resendError) {
      setError(resendError instanceof Error ? resendError.message : "Could not resend the confirmation email.");
    } finally {
      setBusy(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setError("Enter your account email first.");
      return;
    }

    setBusy(true);
    setError("");
    setMessage("");
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin,
      });
      if (resetError) throw resetError;
      setMessage("If an account exists for this email, a password reset link has been sent.");
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Could not send the reset email.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4 py-12 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 35% at 50% 0%, rgba(99,102,241,0.2), transparent 75%)",
        }}
      />
      <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-ink-900/90 p-6 shadow-[0_30px_100px_-35px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="mb-7 text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Zentap
        </button>

        <div className="flex items-center gap-3">
          <img src="/zentap-logo-white.png" alt="" className="h-9 w-9 rounded-xl object-contain" />
          <div>
            <p className="font-display text-lg font-black text-white">
              Zen<span className="text-gradient-brand">tap</span>
            </p>
            <p className="text-xs text-slate-400">Sign in or create your account</p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 rounded-xl border border-white/10 bg-ink-950 p-1">
          <button
            type="button"
            onClick={() => changeRole("merchant")}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              role === "merchant" ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Merchant
          </button>
          <button
            type="button"
            onClick={() => changeRole("staff")}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              role === "staff" ? "bg-cyan-400 text-ink-950" : "text-slate-400 hover:text-white"
            }`}
          >
            <IconLock className="h-3.5 w-3.5" />
            Staff login
          </button>
        </div>

        <div className="mt-6">
          {emailConfirmationResult === "confirmed" && (
            <p role="status" className="mb-4 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-2.5 text-sm text-emerald-200">
              Email confirmed successfully. You can now sign in to your merchant account.
            </p>
          )}
          {emailConfirmationResult === "error" && (
            <p role="alert" className="mb-4 rounded-lg border border-rose-400/25 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-200">
              This confirmation link could not be verified or has expired. Enter your email below and use “Resend confirmation email” to get a new link.
            </p>
          )}
          <h1 className="text-xl font-bold text-white">
            {role === "staff"
              ? "Staff console access"
              : mode === "signup"
                ? "Create a merchant account"
                : "Merchant sign in"}
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            {role === "staff"
              ? "Use your authorized staff email and password. Staff accounts must be enabled by an administrator."
              : mode === "signup"
                ? "Add your business details so review insights and reply drafts can be organized around your business."
                : "Sign in to your merchant account to manage Google reviews and business insights."}
          </p>
          {role === "merchant" && initialPlan && (
            <p className="mt-3 rounded-lg border border-brand-400/20 bg-brand-400/10 px-3 py-2 text-sm text-brand-100">
              Selected plan: <strong>{initialPlan}</strong>
            </p>
          )}
        </div>

        {role === "merchant" && (
          <div className="mt-5 flex rounded-lg bg-white/5 p-1 text-sm">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setMessage("");
                setError("");
                setNotificationWarning("");
                setConfirmationPending(false);
              }}
              className={`flex-1 rounded-md py-2 transition ${
                mode === "signin" ? "bg-white/10 text-white" : "text-slate-400"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage("");
                setError("");
                setNotificationWarning("");
                setConfirmationPending(false);
              }}
              className={`flex-1 rounded-md py-2 transition ${
                mode === "signup" ? "bg-white/10 text-white" : "text-slate-400"
              }`}
            >
              Create account
            </button>
          </div>
        )}

        {role === "merchant" && mode === "signin" && showDemoLogin && (
          <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] p-4">
            <p className="text-sm font-semibold text-amber-100">Preview testing</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/70">
              Explore the merchant dashboard with sample data. No account is created and no real customer or billing data is changed.
            </p>
            <button
              type="button"
              onClick={onDemoLogin}
              className="mt-3 w-full rounded-lg border border-amber-300/25 bg-amber-300/10 px-3 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/20"
            >
              Enter merchant preview
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === "signup" && role === "merchant" && (
            <>
              <label className="block text-sm font-medium text-slate-300">
                Your name
                <input
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition focus:border-brand-400"
                />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Business name
                <input
                  autoComplete="organization"
                  required
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  placeholder="e.g. Sample Cafe"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400"
                />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Business category
                <select
                  required
                  value={businessCategory}
                  onChange={(event) => setBusinessCategory(event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition focus:border-brand-400"
                >
                  <option value="" disabled>Select your business type</option>
                  {BUSINESS_CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <span className="mt-1 block text-xs font-normal text-slate-500">
                  Used to tailor your review topics and AI reply suggestions.
                </span>
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Business city
                <input
                  autoComplete="address-level2"
                  required
                  value={businessCity}
                  onChange={(event) => setBusinessCity(event.target.value)}
                  placeholder="e.g. Ahmedabad"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400"
                />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Phone / WhatsApp number
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  minLength={7}
                  maxLength={24}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Include your country code"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400"
                />
              </label>
            </>
          )}
          <label className="block text-sm font-medium text-slate-300">
            {role === "staff" ? "Admin ID (staff email)" : "Email"}
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition focus:border-brand-400"
            />
          </label>
          <label className="block text-sm font-medium text-slate-300">
            Password
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={mode === "signup" ? 8 : undefined}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition focus:border-brand-400"
            />
          </label>

          {role === "merchant" && mode === "signin" && (
            <div className="text-right">
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={busy}
                className="text-xs font-medium text-brand-300 hover:text-brand-200"
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <p role="alert" className="rounded-lg border border-rose-400/25 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-200">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-2.5 text-sm text-emerald-200">
              {message}
            </p>
          )}
          {notificationWarning && (
            <p role="alert" className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-100">
              {notificationWarning}
            </p>
          )}

          {role === "merchant" && (confirmationPending || mode === "signin") && (
            <button
              type="button"
              onClick={handleResendConfirmation}
              disabled={busy}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-60"
            >
              Resend confirmation email
            </button>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          >
            {busy
              ? "Please wait..."
              : mode === "signup"
                ? "Create merchant account"
                : role === "staff"
                  ? "Sign in to staff console"
                  : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

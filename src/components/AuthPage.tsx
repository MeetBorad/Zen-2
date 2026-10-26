import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { BUSINESS_CATEGORIES } from "@/lib/business-categories";
import { IconLock } from "./Icons";

type AuthMode = "signin" | "signup";
type AuthRole = "merchant" | "staff";
type RegistrationMethod = "mobile" | "email";

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
  const [registrationMethod, setRegistrationMethod] = useState<RegistrationMethod>("mobile");

  // Form Fields
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [mobileDigits, setMobileDigits] = useState("");
  const [email, setEmail] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // States
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
      // 1. SIGN UP MODE
      if (mode === "signup") {
        if (registrationMethod === "mobile") {
          const clean = mobileDigits.replace(/\D/g, "");
          if (clean.length < 10) {
            throw new Error("Please enter a valid 10-digit mobile number.");
          }
          const valid10 = clean.slice(-10);

          // Call serverless register-mobile endpoint which auto-confirms user
          let authEmail = `${valid10}@mobile.zentap.in`;
          try {
            const resp = await fetch("/api/auth/register-mobile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phone: valid10,
                password,
                name: name.trim(),
                businessName: businessName.trim(),
                businessCategory,
                businessCity: businessCity.trim(),
                reportEmail: email.trim() || undefined,
                plan: initialPlan,
              }),
            });

            const regData = await resp.json();
            if (!resp.ok) {
              throw new Error(regData.error || "Could not complete mobile registration.");
            }
            if (regData.authEmail) authEmail = regData.authEmail;
          } catch (apiErr: any) {
            // Direct Supabase fallback if API fails
            const { error: signUpError } = await supabase.auth.signUp({
              email: authEmail,
              password,
              options: {
                data: {
                  full_name: name.trim(),
                  business_name: businessName.trim(),
                  business_category: businessCategory,
                  business_city: businessCity.trim(),
                  phone: `+91 ${valid10}`,
                  registration_method: "mobile",
                  report_email: email.trim() || undefined,
                  ...(initialPlan ? { selected_plan: initialPlan } : {}),
                },
              },
            });
            if (signUpError && !signUpError.message.includes("already registered")) {
              throw signUpError;
            }
          }

          // Instant sign in after mobile registration
          const { data: signInData, error: autoSignInError } = await supabase.auth.signInWithPassword({
            email: authEmail,
            password,
          });

          if (!autoSignInError && signInData?.session) {
            setMessage(
              `🎉 Welcome ${name.trim() || "Merchant"}! Your account for +91 ${valid10} is active and verified. Your merchant workspace is being linked.`
            );
            return;
          }

          // If auto-signin session not immediate, prefill login
          setMessage(
            `✅ Account created successfully for +91 ${valid10}! You can now sign in with your mobile number and password.`
          );
          setMode("signin");
          setLoginIdentifier(valid10);
          return;
        }

        // Standard Email Registration
        if (!email.trim() || !email.includes("@")) {
          throw new Error("Please enter a valid email address.");
        }

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
              phone: mobileDigits.trim() || "+91 8788416911",
              registration_method: "email",
              ...(initialPlan ? { selected_plan: initialPlan } : {}),
            },
          },
        });
        if (signUpError) throw signUpError;

        if (data.user) {
          fetch("/api/notifications/new-customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: data.user.id }),
          }).catch(() => {});
        }

        setMessage(
          data.session
            ? "Your account is ready. Your business details are saved; merchant workspace access will be linked by Zentap."
            : "Check your email to confirm your account. Your business details are saved; your merchant workspace will be linked by Zentap."
        );
        setConfirmationPending(!data.session);
        return;
      }

      // 2. SIGN IN MODE
      let targetAuthEmail = "";

      if (role === "staff") {
        targetAuthEmail = email.trim();
      } else {
        const raw = loginIdentifier.trim();
        if (!raw) {
          throw new Error("Please enter your mobile number or email address.");
        }

        // Try resolving mobile number to user email via serverless resolver
        if (!raw.includes("@")) {
          const cleanDigits = raw.replace(/\D/g, "");
          if (cleanDigits.length >= 10) {
            try {
              const res = await fetch("/api/auth/resolve-identifier", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: cleanDigits.slice(-10) }),
              });
              const resolveData = await res.json();
              if (resolveData?.authEmail) {
                targetAuthEmail = resolveData.authEmail;
              }
            } catch {
              targetAuthEmail = `${cleanDigits.slice(-10)}@mobile.zentap.in`;
            }
          }
        }

        if (!targetAuthEmail) {
          targetAuthEmail = raw;
        }
      }

      if (!targetAuthEmail) {
        throw new Error(role === "staff" ? "Enter your staff email." : "Enter your mobile number or email.");
      }

      // First sign-in attempt
      let { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: targetAuthEmail,
        password,
      });

      // If mobile attempt failed and identifier was digits, try direct mobile domain fallback
      if (signInError && !loginIdentifier.includes("@")) {
        const digits = loginIdentifier.replace(/\D/g, "").slice(-10);
        const altEmail = `${digits}@mobile.zentap.in`;
        if (altEmail !== targetAuthEmail) {
          const fallback = await supabase.auth.signInWithPassword({
            email: altEmail,
            password,
          });
          if (!fallback.error) {
            data = fallback.data;
            signInError = null;
          }
        }
      }

      if (signInError) {
        if (signInError.message.includes("Email not confirmed")) {
          throw new Error("Account is pending confirmation. Your mobile number has now been marked for instant access — please try again in 5 seconds.");
        }
        if (signInError.message.includes("Invalid login credentials")) {
          throw new Error("Incorrect mobile number/email or password. Please double-check your credentials.");
        }
        throw signInError;
      }

      if (role === "staff") {
        if (data?.user?.app_metadata?.role !== "staff") {
          await supabase.auth.signOut();
          throw new Error("This account is not authorized for staff access.");
        }
        onStaffAuthenticated();
        return;
      }

      setMessage(
        "Signed in successfully! Your merchant workspace is active."
      );
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  const handlePasswordReset = async () => {
    const raw = (loginIdentifier || email).trim();
    if (!raw) {
      setError("Enter your account mobile number or email first.");
      return;
    }

    setBusy(true);
    setError("");
    setMessage("");
    try {
      let targetEmail = raw;
      if (!raw.includes("@")) {
        const clean = raw.replace(/\D/g, "").slice(-10);
        targetEmail = `${clean}@mobile.zentap.in`;
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo: getAuthRedirectUrl(),
      });
      if (resetError) throw resetError;
      setMessage("Password reset instructions have been initiated. Contact +91 8788416911 for instant WhatsApp PIN reset.");
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Could not process password reset.");
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

        {/* Role Selector: Merchant vs Staff */}
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
              This confirmation link could not be verified or has expired. You can sign in using your credentials below.
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
                ? "Register your showroom or store to start collecting verified 5-star Google reviews."
                : "Sign in with your mobile number or email to manage reviews and standees."}
          </p>
          {role === "merchant" && initialPlan && (
            <p className="mt-3 rounded-lg border border-brand-400/20 bg-brand-400/10 px-3 py-2 text-sm text-brand-100">
              Selected plan: <strong>{initialPlan}</strong>
            </p>
          )}
        </div>

        {/* Mode Selector: Sign in vs Create account */}
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
                mode === "signin" ? "bg-white/10 text-white font-semibold" : "text-slate-400"
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
                mode === "signup" ? "bg-white/10 text-white font-semibold" : "text-slate-400"
              }`}
            >
              Create account
            </button>
          </div>
        )}

        {/* Demo Login Preview */}
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

        {/* Registration Method Switcher (Mobile vs Email) */}
        {role === "merchant" && mode === "signup" && (
          <div className="mt-5 grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.03] p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRegistrationMethod("mobile")}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 transition ${
                registrationMethod === "mobile"
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>📱 Mobile Number</span>
              <span className="rounded bg-emerald-400/20 px-1 py-0.5 text-[10px] text-emerald-300">
                Instant
              </span>
            </button>
            <button
              type="button"
              onClick={() => setRegistrationMethod("email")}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 transition ${
                registrationMethod === "email"
                  ? "bg-white/15 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>✉️ Email Address</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === "signup" && role === "merchant" && (
            <>
              <label className="block text-sm font-medium text-slate-300">
                Your full name
                <input
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Dhruvil Patel"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition focus:border-brand-400"
                />
              </label>

              {/* Mobile Number Field (When registering via Mobile) */}
              {registrationMethod === "mobile" ? (
                <label className="block text-sm font-medium text-slate-300">
                  Mobile / WhatsApp Number
                  <div className="mt-1.5 flex rounded-xl border border-white/10 bg-ink-950 transition focus-within:border-brand-400">
                    <span className="flex items-center gap-1 border-r border-white/10 px-3.5 text-sm font-medium text-slate-300 select-none">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      required
                      maxLength={10}
                      value={mobileDigits}
                      onChange={(event) => setMobileDigits(event.target.value.replace(/\D/g, ""))}
                      placeholder="9898980401"
                      className="w-full bg-transparent px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-600"
                    />
                  </div>
                  <span className="mt-1 block text-xs font-normal text-emerald-400">
                    ⚡ Instant activation — no email verification needed.
                  </span>
                </label>
              ) : (
                <label className="block text-sm font-medium text-slate-300">
                  Email Address
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="dhruvil@example.com"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition focus:border-brand-400"
                  />
                </label>
              )}

              <label className="block text-sm font-medium text-slate-300">
                Business name
                <input
                  autoComplete="organization"
                  required
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  placeholder="e.g. Digitronics Control"
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

              {/* Optional Email when registering with Mobile */}
              {registrationMethod === "mobile" && (
                <label className="block text-sm font-medium text-slate-300">
                  Email address <span className="text-xs font-normal text-slate-500">(Optional for reports)</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="dhruvil@example.com (optional)"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400"
                  />
                </label>
              )}
            </>
          )}

          {/* SIGN IN: Combined Mobile or Email field */}
          {mode === "signin" && role === "merchant" && (
            <label className="block text-sm font-medium text-slate-300">
              Mobile Number or Email
              <input
                type="text"
                autoComplete="username"
                required
                value={loginIdentifier}
                onChange={(event) => setLoginIdentifier(event.target.value)}
                placeholder="e.g. 9662760880 or you@example.com"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400"
              />
            </label>
          )}

          {/* Staff Login ID */}
          {role === "staff" && (
            <label className="block text-sm font-medium text-slate-300">
              Admin ID (staff email)
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@zentapdigitalsolutions.com"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-3 text-sm text-white outline-none transition focus:border-brand-400"
              />
            </label>
          )}

          {/* Password Field */}
          <label className="block text-sm font-medium text-slate-300">
            Password
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={mode === "signup" ? 6 : undefined}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
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

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          >
            {busy
              ? "Please wait..."
              : mode === "signup"
                ? registrationMethod === "mobile"
                  ? "⚡ Create Account with Mobile Number"
                  : "Create merchant account"
                : role === "staff"
                  ? "Sign in to staff console"
                  : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

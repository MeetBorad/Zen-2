import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Merchant } from "@/lib/database.types";

type SubscriptionStatus = "trial" | "active" | "halted" | "cancelled";

interface SubscriptionRecord {
  id: string;
  merchant_id: string | null;
  razorpay_subscription_id: string | null;
  plan_amount_inr: number;
  billing_frequency: string;
  status: SubscriptionStatus;
  trial_ends_at: string | null;
  next_billing_at: string | null;
  created_at: string;
}

interface MerchantRecord extends Pick<Merchant, "id" | "name" | "email" | "city" | "plan" | "is_active" | "created_at"> {}

interface AdminDashboardProps {
  onBackToHome: () => void;
  onSignOut: () => void;
  onUnauthorized: () => void;
}

const statusStyles: Record<SubscriptionStatus, string> = {
  active: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  trial: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/20",
  halted: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
  cancelled: "bg-slate-400/10 text-slate-300 ring-slate-400/20",
};

export default function AdminDashboard({
  onBackToHome,
  onSignOut,
  onUnauthorized,
}: AdminDashboardProps) {
  const [merchants, setMerchants] = useState<MerchantRecord[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const loadDashboard = useCallback(async () => {
    setError("");
    const [merchantResult, subscriptionResult] = await Promise.all([
      supabase
        .from("merchants")
        .select("id, name, email, city, plan, is_active, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("subscriptions")
        .select("id, merchant_id, razorpay_subscription_id, plan_amount_inr, billing_frequency, status, trial_ends_at, next_billing_at, created_at")
        .order("created_at", { ascending: false }),
    ]);

    if (merchantResult.error) {
      setError(merchantResult.error.message);
      return;
    }
    if (subscriptionResult.error) {
      setError(subscriptionResult.error.message);
      return;
    }

    setMerchants((merchantResult.data ?? []) as MerchantRecord[]);
    setSubscriptions((subscriptionResult.data ?? []) as SubscriptionRecord[]);
  }, []);

  useEffect(() => {
    let active = true;
    const authorize = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!sessionData.session) {
          if (active) onUnauthorized();
          return;
        }

        const { data, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!data.user || data.user.app_metadata.role !== "staff") {
          if (active) onUnauthorized();
          return;
        }
        await loadDashboard();
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Could not verify staff access.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void authorize();
    return () => {
      active = false;
    };
  }, [loadDashboard, onUnauthorized]);

  const subscriptionsByMerchant = useMemo(() => {
    const grouped = new Map<string, SubscriptionRecord[]>();
    subscriptions.forEach((subscription) => {
      if (!subscription.merchant_id) return;
      const items = grouped.get(subscription.merchant_id) ?? [];
      items.push(subscription);
      grouped.set(subscription.merchant_id, items);
    });
    return grouped;
  }, [subscriptions]);

  const activeSubscriptions = subscriptions.filter((item) => item.status === "active");
  const trialSubscriptions = subscriptions.filter((item) => item.status === "trial");
  const monthlyRevenue = activeSubscriptions.reduce((total, item) => {
    if (item.billing_frequency !== "monthly") return total;
    return total + item.plan_amount_inr;
  }, 0);

  const visibleMerchants = merchants.filter((merchant) =>
    `${merchant.name} ${merchant.email ?? ""} ${merchant.city ?? ""}`
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()),
  );

  const updateMerchant = async (merchant: MerchantRecord, patch: Partial<Pick<MerchantRecord, "plan" | "is_active">>) => {
    setBusyId(merchant.id);
    setError("");
    setNotice("");
    const { error: updateError } = await supabase
      .from("merchants")
      .update(patch)
      .eq("id", merchant.id);
    if (updateError) {
      setError(updateError.message);
    } else {
      setMerchants((current) =>
        current.map((item) => (item.id === merchant.id ? { ...item, ...patch } : item)),
      );
      setNotice(`${merchant.name} updated.`);
    }
    setBusyId(null);
  };

  const cancelSubscription = async (subscription: SubscriptionRecord, merchantName: string) => {
    if (
      !subscription.razorpay_subscription_id ||
      !window.confirm(`Schedule ${merchantName}'s subscription to cancel at the end of its current billing cycle?`)
    ) {
      return;
    }

    setBusyId(subscription.id);
    setError("");
    setNotice("");
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      const token = data.session?.access_token;
      if (!token) throw new Error("Your session has expired. Sign in again.");

      const response = await fetch("/api/admin/subscriptions/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subscriptionId: subscription.id }),
      });
      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error ?? "Could not cancel the subscription.");
      setNotice(result.message ?? `Cancellation scheduled for ${merchantName}.`);
      await loadDashboard();
    } catch (cancelError) {
      setError(cancelError instanceof Error ? cancelError.message : "Could not cancel the subscription.");
    } finally {
      setBusyId(null);
    }
  };

  const handleSignOut = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      return;
    }
    onSignOut();
  };

  return (
    <main className="min-h-screen bg-ink-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/zentap-logo-white.png" alt="" className="h-8 w-8 rounded-lg object-contain" />
            <div>
              <p className="font-display text-sm font-black text-white">Zentap Admin</p>
              <p className="text-[11px] text-slate-400">Staff workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onBackToHome} className="rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-white/8 hover:text-white">
              Website
            </button>
            <button onClick={handleSignOut} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/8">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Subscription overview</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Business dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">Live records from your Supabase project.</p>
          </div>
          <button
            onClick={() => void loadDashboard()}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-50"
          >
            Refresh data
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-5 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="mb-5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {notice}
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Merchant accounts", merchants.length.toLocaleString("en-IN")],
            ["Active subscriptions", activeSubscriptions.length.toLocaleString("en-IN")],
            ["Trials", trialSubscriptions.length.toLocaleString("en-IN")],
            ["Monthly recurring revenue", `₹${monthlyRevenue.toLocaleString("en-IN")}`],
          ].map(([label, value]) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-ink-900 p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
              <p className="mt-3 font-mono text-2xl font-semibold text-white">{loading ? "—" : value}</p>
            </article>
          ))}
        </div>

        <section className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
          <div className="flex flex-col gap-3 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="font-semibold text-white">Merchants & subscriptions</h2>
              <p className="mt-1 text-xs text-slate-400">Billing status is synchronized by Razorpay webhooks.</p>
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search merchants"
              aria-label="Search merchants"
              className="w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400 sm:max-w-xs"
            />
          </div>

          {loading ? (
            <p className="p-6 text-sm text-slate-400">Loading account data...</p>
          ) : visibleMerchants.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">
              {merchants.length === 0 ? "No merchant records were returned." : "No merchants match this search."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Merchant</th>
                    <th className="px-5 py-3 font-semibold">Plan</th>
                    <th className="px-5 py-3 font-semibold">Subscription</th>
                    <th className="px-5 py-3 font-semibold">Next billing</th>
                    <th className="px-5 py-3 font-semibold">Account</th>
                    <th className="px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {visibleMerchants.map((merchant) => {
                    const merchantSubscriptions = subscriptionsByMerchant.get(merchant.id) ?? [];
                    const subscription = merchantSubscriptions[0];
                    return (
                      <tr key={merchant.id} className="align-top">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-white">{merchant.name}</p>
                          <p className="mt-1 text-xs text-slate-400">{merchant.email || merchant.city || "No contact email"}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-slate-200">{merchant.plan}</p>
                          {subscription && (
                            <p className="mt-1 text-xs text-slate-400">
                              ₹{subscription.plan_amount_inr.toLocaleString("en-IN")} / {subscription.billing_frequency}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {subscription ? (
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${statusStyles[subscription.status]}`}>
                              {subscription.status}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">No subscription</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-xs text-slate-300">
                          {subscription?.next_billing_at
                            ? new Date(subscription.next_billing_at).toLocaleDateString()
                            : subscription?.trial_ends_at
                              ? `Trial ends ${new Date(subscription.trial_ends_at).toLocaleDateString()}`
                              : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${merchant.is_active ? "bg-emerald-400/10 text-emerald-300" : "bg-slate-400/10 text-slate-400"}`}>
                            {merchant.is_active ? "Enabled" : "Disabled"}
                          </span>
                        </td>
                        <td className="space-y-2 px-5 py-4">
                          <button
                            onClick={() => void updateMerchant(merchant, { is_active: !merchant.is_active })}
                            disabled={busyId === merchant.id}
                            className="block whitespace-nowrap text-xs font-semibold text-cyan-300 hover:text-cyan-200 disabled:opacity-50"
                          >
                            {merchant.is_active ? "Disable account" : "Enable account"}
                          </button>
                          {subscription &&
                            (subscription.status === "active" || subscription.status === "trial") &&
                            subscription.razorpay_subscription_id && (
                              <button
                                onClick={() => void cancelSubscription(subscription, merchant.name)}
                                disabled={busyId === subscription.id}
                                className="block whitespace-nowrap text-xs font-semibold text-rose-300 hover:text-rose-200 disabled:opacity-50"
                              >
                                {busyId === subscription.id ? "Scheduling..." : "Cancel at cycle end"}
                              </button>
                            )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

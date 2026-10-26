import { IconCheck } from "./Icons";

export default function StartCTA() {
  return (
    <section id="start" className="relative overflow-hidden bg-slate-50 py-20 px-4 sm:px-8">
      <div className="relative mx-auto max-w-5xl rounded-3xl border-2 border-blue-600/30 bg-gradient-to-br from-blue-50/60 via-white to-blue-50/30 p-8 sm:p-14 text-center shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/70 px-3.5 py-1 text-xs font-bold text-blue-900">
          <span>⚡</span>
          <span>BlueDart Express Courier Delivery in 48 Hours Across Gujarat & India</span>
        </div>

        <h2 className="mt-6 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Put a Smart Standee on Your Counter —{" "}
          <span className="text-blue-600 underline decoration-blue-300 decoration-wavy underline-offset-8">
            Collect 5-Star Reviews Today.
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Capture authentic Google reviews from every happy customer and dominate local search rankings in your city. Zero app downloads, zero staff friction!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#/auth?role=merchant&mode=signup&plan=Growth"
            className="w-full sm:w-auto rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-md transition hover:bg-blue-700 active:scale-95"
          >
            📦 Order Counter Standee (₹2,999/mo)
          </a>
          <a
            href="https://wa.me/918788416911?text=Hello!%20I%20want%20to%20order%20the%20Google%20Review%20Standee%20for%20my%20counter."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-7 py-4 text-base font-bold text-emerald-900 shadow-xs transition hover:bg-emerald-100"
          >
            <span className="text-base">💬</span>
            <span>Chat on WhatsApp: +91 8788416911</span>
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-semibold">
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-4 w-4 text-emerald-600" /> Free 48-Hour BlueDart Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-4 w-4 text-emerald-600" /> Seamless UPI AutoPay (GPay, PhonePe, Paytm)
          </span>
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-4 w-4 text-emerald-600" /> Cancel or Pause Anytime with Zero Lock-in
          </span>
        </div>
      </div>
    </section>
  );
}

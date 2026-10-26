import { Reveal } from "./ui";
import { IconCheck } from "./Icons";

export default function StartCTA() {
  return (
    <section id="start" className="relative overflow-hidden bg-slate-900 py-20 px-4 sm:px-8 text-white">
      <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-700 bg-slate-800/90 p-8 sm:p-12 text-center shadow-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-bold text-amber-300">
          <span>⚡</span>
          <span>૪૮ કલાકમાં બ્લુડાર્ટ એક્સપ્રેસ ડિલિવરી (All Gujarat & India)</span>
        </div>

        <h2 className="mt-6 text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          તમારા કાઉન્ટર પર સ્માર્ટ સ્ટેન્ડી મૂકો —{" "}
          <span className="text-amber-400">આજે જ રિવ્યુ વધારો!</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          દરેક ખુશ ગ્રાહક પાસેથી ૫-સ્ટાર રેટિંગ મેળવો અને ગૂગલ સર્ચમાં તમારા એરિયામાં #1 બનો. કોઈ એપ ડાઉનલોડ નહીં, કોઈ સ્ટાફ ઝંઝટ નહીં!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#/auth?role=merchant&mode=signup&plan=Growth"
            className="w-full sm:w-auto rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-blue-500 active:scale-95"
          >
            📦 સ્ટેન્ડી ઓર્ડર કરો (₹2,999/મહિને)
          </a>
          <a
            href="https://wa.me/918788416911?text=Hello%20Zentap!%20I%20want%20to%20order%20the%20Google%20Review%20Standee%20for%20my%20counter."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-emerald-400 bg-emerald-500/20 px-7 py-4 text-base font-bold text-emerald-200 transition hover:bg-emerald-500/30"
          >
            <span>💬</span>
            <span>WhatsApp પર ઓર્ડર કરો</span>
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-4 w-4 text-emerald-400" /> ₹0 ફ્રી કુરિયર ડિલિવરી
          </span>
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-4 w-4 text-emerald-400" /> UPI AutoPay (PhonePe, GPay, Paytm)
          </span>
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-4 w-4 text-emerald-400" /> ગમે ત્યારે કેન્સલ કરી શકો છો
          </span>
        </div>
      </div>
    </section>
  );
}

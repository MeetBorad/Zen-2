import { Reveal, Section, SectionHeading } from "./ui";
import { IconCheck, IconNfc, IconQr, IconSparkles } from "./Icons";

const STEPS = [
  {
    n: "૧",
    title: "અમે એક્રેલિક સ્ટેન્ડી મોકલીશું",
    subtitle: "We Print & Courier Your Standee",
    copy: "તમારી દુકાન/શોરૂમનું નામ અને ક્યુઆર કોડ સાથેનું A6 પ્રીમિયમ એક્રેલિક સ્ટેન્ડી બ્લુડાર્ટ કુરિયરથી ૪૮ કલાકમાં તમારા કાઉન્ટર પર પહોંચશે.",
    tag: "Free 48h Delivery",
  },
  {
    n: "૨",
    title: "બિલિંગ કાઉન્ટર પર મૂકો",
    subtitle: "Place on Counter / Reception",
    copy: "કોઈ વાયર, બેટરી કે ઇન્ટરનેટ વાયરિંગની જરૂર નથી. બસ તમારા કેશ કાઉન્ટર પર રાખી દો — દેખાવમાં અત્યંત પ્રીમિયમ અને આકર્ષક લાગે છે.",
    tag: "Zero Setup Hassle",
  },
  {
    n: "૩",
    title: "ગ્રાહક ફોન ટેપ કરશે",
    subtitle: "Customer Taps Phone in 5 Seconds",
    copy: "બિલ પે કર્યા પછી ગ્રાહક માત્ર ફોન સ્ટેન્ડી પર અડાડશે. કોઈ એપ ડાઉનલોડ કર્યા વગર ગુજરાતી, હિન્દી કે અંગ્રેજીમાં ૫-સ્ટાર રિવ્યુ સીધો સબમિટ થશે.",
    tag: "NFC + QR Technology",
  },
  {
    n: "૪",
    title: "ગૂગલ પર ઓટોમેટિક રિપ્લાય",
    subtitle: "AI Auto-Reply within 15 Minutes",
    copy: "ગૂગલ પર નવો રિવ્યુ આવતાં જ AI આપમેળે ગ્રાહકનો આભાર માનતો સુંદર રિપ્લાય આપી દેશે, જેથી ગૂગલ સર્ચમાં તમારો નંબર ૧ રેન્ક પાક્કો થાય.",
    tag: "Mode B Active",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how" className="bg-white">
      <SectionHeading
        eyebrow="સરળ ૪ સ્ટેપ્સ (Simple 4-Step Process)"
        title="કાઉન્ટર પર સ્ટેન્ડી મૂકો અને"
        highlight="ગૂગલમાં ટોપ પર આવો"
        copy="તમારા સ્ટાફે કોઈ ગ્રાહકને હાથ જોડીને રિક્વેસ્ટ કરવાની જરૂર નથી. ગ્રાહક જાતે જ ખુશીથી ફોન ટેપ કરીને રિવ્યુ આપશે."
        icon={<span className="text-blue-600">▶</span>}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, idx) => (
          <Reveal key={step.n} delay={idx * 90}>
            <div className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-400 h-full">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 text-white font-mono font-black text-lg shadow-sm">
                    {step.n}
                  </span>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                    {step.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5">{step.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.copy}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <IconCheck className="h-4 w-4" /> ૧૦૦% ઓટોમેટેડ
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import { Reveal, Section, SectionHeading } from "./ui";
import { IconArrow, IconCheck, IconClose } from "./Icons";

const BEFORE = [
  "ગ્રાહકને હાથ જોડીને રિવ્યુ આપવા રિક્વેસ્ટ કરવી પડે છે",
  "ગ્રાહક 'હા કરી દઈશ' કહીને બહાર જઈને ભૂલી જાય છે",
  "કોઈ નારાજ ગ્રાહક સીધો ગૂગલ પર ૧-સ્ટાર રેટિંગ આપી દે છે",
  "ગૂગલમાં તમારા હરીફ શોરૂમ તમારા કરતાં ઉપર દેખાય છે",
  "ગૂગલ રિવ્યુનો જવાબ આપવાનો સમય કોઈ સ્ટાફ પાસે નથી હોતો",
];

const AFTER = [
  "ગ્રાહક બિલિંગ વખતે માત્ર ૫ સેકન્ડમાં ફોન ટેપ કરીને રિવ્યુ આપી દે છે",
  "ગુજરાતી, હિન્દી કે અંગ્રેજીમાં ૫-સ્ટાર રિવ્યુ આપોઆપ લખાઈ જાય છે",
  "કોઈ નારાજ ગ્રાહક હોય તો એ રિવ્યુ ગૂગલ પર નહીં, તમારા પર્સનલ WhatsApp પર ફિલ્ટર થાય છે",
  "ગૂગલ મેપ્સ પર તમારો શોરૂમ નિકોલ કે અમદાવાદમાં #1 રેન્ક કરે છે",
  "AI દરેક ૫-સ્ટાર રિવ્યુનો ૧૫ મિનિટમાં આભાર માનતો સુંદર જવાબ આપે છે",
];

export default function Benefits() {
  return (
    <Section id="benefits" className="bg-slate-50">
      <SectionHeading
        eyebrow="તફાવત જુઓ (The Difference)"
        title="તમારા શોરૂમમાં શું બદલાવ આવશે?"
        highlight="સ્પષ્ટ તફાવત"
        copy="એ જ કાઉન્ટર, એ જ ગ્રાહકો — પણ ગૂગલ પર તમારો બિઝનેસ ક્યાંય આગળ નીકળી જશે."
        icon={<span className="text-blue-600">⚖</span>}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Without Zentap */}
        <Reveal dir="left">
          <div className="h-full rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-800 uppercase tracking-wider">
              ❌ Zentap વગર (Without Standee)
            </span>
            <h3 className="mt-4 text-xl font-bold text-slate-900">રિવ્યુ લેવામાં મુશ્કેલી અને સ્ટાફની ઝંઝટ</h3>
            <ul className="mt-6 space-y-3.5">
              {BEFORE.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-700">
                    <IconClose className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-rose-50/70 border border-rose-200/80 p-4 text-xs text-rose-900 font-semibold">
              ⚠️ પરિણામ: મહિનામાં માંડ ૨-૩ રિવ્યુ આવે છે અને ગૂગલ રેન્કિંગ નીચે રહે છે.
            </div>
          </div>
        </Reveal>

        {/* With Zentap */}
        <Reveal dir="right" delay={90}>
          <div className="h-full rounded-3xl border-2 border-blue-600 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800 uppercase tracking-wider">
                ✅ Zentap સ્માર્ટ સ્ટેન્ડી સાથે
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                4.9 ★ Rating
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">દર મહિને ૩૦ થી ૫૦+ નવા 5-Star રિવ્યુ આપોઆપ!</h3>

            <ul className="mt-6 space-y-3.5">
              {AFTER.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-slate-800 font-medium">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-blue-50/80 border border-blue-200 p-4 text-xs text-blue-950 font-bold flex items-center justify-between">
              <span>🚀 પરિણામ: ગૂગલ મેપ્સ પર #1 રેન્ક અને ૩૫% વધારે ગ્રાહકો!</span>
              <span className="text-emerald-700 font-mono font-black text-sm">₹2,999/મો</span>
            </div>

            <a
              href="#pricing"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              પ્લાન જુઓ અને ઓર્ડર કરો (View Plans)
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

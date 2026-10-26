import { Reveal, Section, SectionHeading } from "./ui";
import { IconStar, IconCheck } from "./Icons";

const FEATURED = {
  quote:
    "અમે જ્યારે અમારા કાઉન્ટર પર Zentap નું એક્રેલિક સ્ટેન્ડી મૂક્યું, ત્યારે માત્ર ૪૫ દિવસમાં ૩૪ થી વધુ ૫-સ્ટાર ગૂગલ રિવ્યુ આવી ગયા! પહેલા સ્ટાફે ગ્રાહકોને રિક્વેસ્ટ કરવી પડતી, પણ હવે ગ્રાહક જાતે જ બિલ ચૂકવતી વખતે ફોન ટેપ કરીને રિવ્યુ આપી દે છે. નિકોલમાં જે પણ જ્વેલરી સર્ચ કરે છે એમને વિરાટ ગોલ્ડ સૌથી પહેલા દેખાય છે. પૈસા વસૂલ સર્વિસ છે!",
  englishQuote:
    "“We used to awkwardly ask customers for reviews. Now the acrylic standee sits right on our billing counter, customers tap their phone, and 5-star reviews appear instantly in Gujarati. We jumped from 4.6★ to 4.9★ on Google Maps!”",
  name: "હર્ષિલ વોરા (Harshil Vora)",
  role: "ઓનર (Owner)",
  business: "વિરાટ ગોલ્ડ પેલેસ (Virat Gold Palace), નિકોલ, અમદાવાદ",
  metric: "+૩૪ વેરિફાઇડ ૫-સ્ટાર રિવ્યુ",
  rating: "4.9 ★ Google Maps",
};

const TESTIMONIALS = [
  {
    quote:
      "ઇન્ડસ્ટ્રિયલ ઇલેક્ટ્રોનિક્સ અને B2B માં ક્લાયન્ટ્સ પાસેથી રિવ્યુ લેવા બહુ મુશ્કેલ હતા. Zentap સ્ટેન્ડીથી અમારા ટેકનિકલ ક્લાયન્ટ્સે સીધા ગૂગલ પર હિન્દી અને અંગ્રેજીમાં પોઝિટિવ રિવ્યુ આપ્યા. અમારી બ્રાન્ડની વિશ્વસનીયતા વધી ગઈ છે.",
    name: "કેતનભાઈ શાહ (Ketan Shah)",
    role: "ડિરેક્ટર",
    business: "ડિજિટ્રોનિક્સ કંટ્રોલ (Digitronics Control), અમદાવાદ",
    metric: "4.9 ★ રેટિંગ",
  },
  {
    quote:
      "બ્રાઇડલ મેકઅપ પત્યા પછી કસ્ટમર્સ ખુશીથી સ્ટેન્ડી પર ફોન ટેપ કરે છે. સ્ટાફને કોઈને કહેવું નથી પડતું. અને જે પણ રિવ્યુ આવે તેનો ૧૫ મિનિટમાં AI થેંક યુ રિપ્લાય પણ આપી દે છે. સુપર ઇઝી!",
    name: "સ્નેહા પટેલ (Sneha Patel)",
    role: "બ્રાઇડલ સ્ટાઈલિસ્ટ & ઓનર",
    business: "ઓરા બ્રાઇડલ સ્ટુડિયો & સ્પા (Aura Bridal Studio), નિકોલ",
    metric: "૧૦૦% પોઝિટિવ ફીડબેક",
  },
  {
    quote:
      "જો કોઈ ગ્રાહકને કોઈ બાબતે ફરિયાદ હોય તો એ પબ્લિક ગૂગલ પર જવાને બદલે સીધી મારા પર્સનલ WhatsApp પર આવી જાય છે. જેથી હું તરત સોલ્યુશન લાવી શકું છું અને પબ્લિક રેટિંગ્સ 4.9★ જળવાઈ રહે છે.",
    name: "ભાવિનભાઈ પટેલ (Bhavin Patel)",
    role: "મેનેજિંગ પાર્ટનર",
    business: "નિલકંઠ જ્વેલર્સ (Nilkanth Jewellers), નિકોલ ગામ રોડ",
    metric: "૦% નેગેટિવ રિવ્યુ",
  },
  {
    quote:
      "કાફેમાં યંગસ્ટર્સ બિલિંગ વખતે ટેપ કરવાનું ખૂબ પસંદ કરે છે. માત્ર ૩ અઠવાડિયામાં ૪૪ થી વધુ ૫-સ્ટાર રેટિંગ્સ આવ્યા અને સ્વિગી-ઝોમેટો કરતાં ગૂગલ મેપ્સ પરથી વધારે કસ્ટમર્સ આવવા લાગ્યા.",
    name: "મિહિર દેસાઈ (Mihir Desai)",
    role: "કો-ફાઉન્ડર",
    business: "કેફે ડી બેલા (Cafe De Bella & Bakers), અમદાવાદ",
    metric: "35% ફૂટફોલ વધારો",
  },
];

function Stars() {
  return (
    <span className="flex text-amber-500 text-sm" aria-label="5 out of 5 stars">
      {"★★★★★"}
    </span>
  );
}

export default function Testimonials() {
  return (
    <Section id="stories" className="bg-white">
      <SectionHeading
        eyebrow="ગ્રાહકોના અનુભવ (Local Merchant Stories)"
        title="અમદાવાદના પ્રતિષ્ઠિત શોરૂમ્સનો"
        highlight="સાચો અનુભવ"
        copy="જે વેપારીઓએ પોતાના કાઉન્ટર પર Zentap સ્ટેન્ડી મૂક્યું છે એમનો સાચો પ્રતિસાદ અહીં વાંચો."
        icon={<span className="text-amber-500">★</span>}
      />

      {/* Featured Anchor Client: Virat Gold Palace */}
      <Reveal delay={100}>
        <div className="mt-12 rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <Stars />
                <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-900">
                  {FEATURED.metric}
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-800">
                  {FEATURED.rating}
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium leading-relaxed text-slate-800">
                “{FEATURED.quote}”
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-600 italic">
                {FEATURED.englishQuote}
              </p>

              <div className="pt-2 border-t border-amber-200/60 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-500 text-white font-bold text-sm">
                  VG
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{FEATURED.name}</p>
                  <p className="text-xs text-slate-600">{FEATURED.business}</p>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">ગૂગલ મેપ્સ રિઝલ્ટ</p>
              <p className="font-mono text-3xl font-black text-amber-600 mt-2">4.9 ★</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">નિકોલ વિસ્તારમાં #1 જ્વેલર</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                <IconCheck className="h-3.5 w-3.5" /> Zentap વેરિફાઇડ પાર્ટનર
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Grid of Other Local Merchants */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t, idx) => (
          <Reveal key={t.name} delay={idx * 80}>
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-white h-full">
              <div>
                <div className="flex items-center justify-between">
                  <Stars />
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {t.metric}
                  </span>
                </div>
                <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-slate-700 font-medium">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/70">
                <p className="font-bold text-slate-900 text-xs">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.business}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

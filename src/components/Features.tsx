import { Reveal, Section, SectionHeading } from "./ui";
import {
  IconCheck,
  IconNfc,
  IconShield,
  IconSparkles,
  IconChat,
  IconCard,
  IconStar,
} from "./Icons";

const FEATURES = [
  {
    icon: <IconNfc className="h-6 w-6 text-blue-600" />,
    title: "પ્રીમિયમ એક્રેલિક સ્ટેન્ડી (NFC + QR)",
    englishTitle: "Premium Acrylic Standee Hardware",
    copy: "સોના-ચાંદીના શોરૂમ, બ્રાઇડલ સલૂન કે કાફેના કાઉન્ટર પર શોભે તેવું લક્ઝરી ફિનિશ એક્રેલિક સ્ટેન્ડી. ગ્રાહક માત્ર ફોન અડાડશે અને રિવ્યુ શરૂ થશે.",
    badge: "કોઈ એપ નહીં",
  },
  {
    icon: <IconSparkles className="h-6 w-6 text-amber-600" />,
    title: "ગુજરાતી, હિન્દી અને અંગ્રેજી AI રિવ્યુ",
    englishTitle: "Multilingual Gujarati, Hindi & English",
    copy: "ગ્રાહકને લાંબુ લખાણ ટાઇપ કરવાનો કંટાળો આવે છે. અમારું AI ગ્રાહકના સંતોષ મુજબ ગુજરાતી કે હિન્દીમાં આપોઆપ સુંદર ૫-સ્ટાર રિવ્યુ તૈયાર કરી આપે છે.",
    badge: "Gemini 1.5 Flash",
  },
  {
    icon: <IconShield className="h-6 w-6 text-emerald-600" />,
    title: "ખરાબ રિવ્યુથી ૧૦૦% રક્ષણ (Private Filter)",
    englishTitle: "Negative Review Protection Shield",
    copy: "જો કોઈ ગ્રાહક કોઈ બાબતે નારાજ હોય, તો તેનો ૧-૩ સ્ટાર ફીડબેક ગૂગલ પર પબ્લિક નહીં થાય, પણ સીધો તમારા અંગત વોટ્સએપ પર આવશે. તમારું ગૂગલ રેટિંગ હંમેશા 4.9★ રહેશે!",
    badge: "100% Policy Safe",
  },
  {
    icon: <IconChat className="h-6 w-6 text-indigo-600" />,
    title: "૧૫ મિનિટમાં ગૂગલ પર ઓટો-રિપ્લાય (Mode B)",
    englishTitle: "Automated Google API Responses",
    copy: "ગૂગલ પર જે પણ રિવ્યુ આવે તેનો આભાર માનતો સુંદર જવાબ AI આપમેળે આપી દે છે. ગૂગલના અલ્ગોરિધમમાં જે બિઝનેસ ઝડપી રિપ્લાય આપે તે હંમેશા #1 રેન્ક કરે છે.",
    badge: "Official Google API",
  },
  {
    icon: <IconCard className="h-6 w-6 text-cyan-600" />,
    title: "સરળ UPI AutoPay (GPay, PhonePe)",
    englishTitle: "Hassle-Free UPI AutoPay Mandates",
    copy: "કોઈ ક્રેડિટ કાર્ડ કે પેપરવર્કની જરૂર નથી. ગૂગલ પે કે ફોનપે દ્વારા સરળ મંથલી ઓટોપે સેટ કરો. કોઈ લોક-ઇન પિરિયડ નથી, ગમે ત્યારે કેન્સલ કરી શકો છો.",
    badge: "Razorpay Verified",
  },
  {
    icon: <IconStar className="h-6 w-6 text-rose-600" />,
    title: "લાઇવ વોટ્સએપ સપોર્ટ (Direct Founder Help)",
    englishTitle: "Dedicated WhatsApp Assistance",
    copy: "સેટઅપ કરવામાં કે ગૂગલ કનેક્ટ કરવામાં કોઈ પણ પ્રશ્ન હોય તો અમારા ફાઉન્ડર હેલ્પલાઇન (+91 8788416911) પર સીધો ગુજરાતીમાં સપોર્ટ મળશે.",
    badge: "+91 8788416911",
  },
];

export default function Features() {
  return (
    <Section id="features" className="bg-slate-50">
      <SectionHeading
        eyebrow="વેપારીઓ માટે ખાસ સુવિધાઓ (Business Features)"
        title="શા માટે ગુજરાતના વેપારીઓ"
        highlight="Zentap પસંદ કરે છે?"
        copy="તમારા બિઝનેસનું ગૂગલ રેટિંગ વધારવા અને કાઉન્ટર પરથી જ રોજ નવા કસ્ટમર્સ લાવવા માટે આ સિસ્ટમ ડિઝાઇન કરવામાં આવી છે."
        icon={<span className="text-emerald-600">✓</span>}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feat, idx) => (
          <Reveal key={feat.title} delay={idx * 70}>
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-400 h-full">
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                    {feat.icon}
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10.5px] font-bold text-slate-700">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5">
                  {feat.englishTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {feat.copy}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                <IconCheck className="h-3.5 w-3.5" /> સિસ્ટમમાં ઇન્ક્લુડેડ
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

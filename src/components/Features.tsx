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
    title: "Premium Acrylic Standee (NFC + QR)",
    sub: "પ્રીમિયમ એક્રેલિક સ્ટેન્ડી",
    copy: "Designed with a luxury finish to complement jewellery showrooms, salons, cafes, and healthcare clinics. Guests tap or scan to open reviews instantly.",
    badge: "No App Required",
  },
  {
    icon: <IconSparkles className="h-6 w-6 text-amber-600" />,
    title: "Multilingual AI Drafts (English, Gujarati, Hindi)",
    sub: "ત્રણ ભાષાઓમાં ઓટોમેટિક રિવ્યુ",
    copy: "Customers don't like typing long paragraphs. Our AI drafts personalized 5-star reviews matching their purchase in their preferred language.",
    badge: "Gemini 1.5 Flash",
  },
  {
    icon: <IconShield className="h-6 w-6 text-emerald-600" />,
    title: "Negative Feedback Protection Filter",
    sub: "ખરાબ રિવ્યુથી ૧૦૦% રક્ષણ",
    copy: "Unhappy guests (1–3 stars) are diverted directly to your private WhatsApp so you can resolve issues immediately, keeping your Google rating at 4.9★.",
    badge: "100% Policy Safe",
  },
  {
    icon: <IconChat className="h-6 w-6 text-indigo-600" />,
    title: "Automated 15-Minute Google API Replies",
    sub: "Mode B ઓટોમેટિક રિપ્લાય",
    copy: "Every verified review receives a warm, customized thank-you reply published directly via the official Google Business Profile API within 15 minutes.",
    badge: "Official Google API",
  },
  {
    icon: <IconCard className="h-6 w-6 text-cyan-600" />,
    title: "Seamless UPI AutoPay (GPay, PhonePe)",
    sub: "સરળ મંથલી ઓટોપે",
    copy: "No credit cards or complex paperwork. Set up recurring billing easily via your preferred UPI app. Cancel or pause anytime with zero lock-in.",
    badge: "Razorpay Verified",
  },
  {
    icon: <IconStar className="h-6 w-6 text-rose-600" />,
    title: "Dedicated Founder WhatsApp Support",
    sub: "લાઈવ ફોન & વોટ્સએપ સપોર્ટ",
    copy: "Direct setup assistance and ongoing support via phone and WhatsApp (+91 8788416911). Our Ahmedabad team is always available to help.",
    badge: "+91 8788416911",
  },
];

export default function Features() {
  return (
    <Section id="features" className="bg-slate-50">
      <SectionHeading
        eyebrow="Commercial Features"
        title="Why Business Owners"
        highlight="Choose Our Standees"
        copy="Engineered specifically to help local retail showrooms capture more 5-star Google reviews and drive daily footfall."
        icon={<span className="text-emerald-600">✓</span>}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feat, idx) => (
          <Reveal key={feat.title} delay={idx * 70}>
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-400 h-full">
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
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {feat.sub}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {feat.copy}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                <IconCheck className="h-3.5 w-3.5" /> Included in all plans
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

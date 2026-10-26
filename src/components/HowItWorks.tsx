import { Reveal, Section, SectionHeading } from "./ui";
import { IconCheck } from "./Icons";

const STEPS = [
  {
    n: "01",
    title: "We Courier Your Standee",
    gujaratiTitle: "અમે એક્રેલિક સ્ટેન્ડી મોકલીશું",
    copy: "Your custom A6 acrylic standee with your shop name, logo, and NFC+QR link is shipped via BlueDart within 48 hours.",
    tag: "Free 48h Delivery",
  },
  {
    n: "02",
    title: "Place on Billing Counter",
    gujaratiTitle: "કાઉન્ટર પર મૂકો",
    copy: "No wires, no batteries, and no software installation required. Simply unbox and place it near your cash register or reception desk.",
    tag: "Zero Setup Hassle",
  },
  {
    n: "03",
    title: "Customer Taps Phone",
    gujaratiTitle: "ગ્રાહક ફોન ટેપ કરશે",
    copy: "While their bill is being printed, customers tap their iPhone or Android phone. In 1 second, Google Maps opens with ready-made 5-star review drafts.",
    tag: "NFC + QR Technology",
  },
  {
    n: "04",
    title: "AI Auto-Replies on Google",
    gujaratiTitle: "૧૫ મિનિટમાં AI રિપ્લાય",
    copy: "Our Gemini 1.5 AI engine immediately detects the new review and publishes a warm, customized reply on Google Maps within 15 minutes.",
    tag: "Mode B Active",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how" className="bg-white">
      <SectionHeading
        eyebrow="Simple 4-Step Process"
        title="From Billing Counter to"
        highlight="Top of Google Maps"
        copy="Your staff doesn't need to ask or chase customers. Guests happily tap while their bill is being processed."
        icon={<span className="text-blue-600">▶</span>}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, idx) => (
          <Reveal key={step.n} delay={idx * 90}>
            <div className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-400 h-full">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 text-white font-mono font-black text-sm shadow-xs">
                    {step.n}
                  </span>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                    {step.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">{step.gujaratiTitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.copy}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <IconCheck className="h-4 w-4" /> 100% Automated System
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

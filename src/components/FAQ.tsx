import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading } from "./ui";
import { IconChevron } from "./Icons";

const FAQS = [
  {
    q: "ગ્રાહકે કોઈ નવી એપ ડાઉનલોડ કરવી પડશે? (Does the customer need to download an app?)",
    a: "બિલકુલ નહીં! કોઈ પણ એપ કે સોફ્ટવેર ડાઉનલોડ કરવાની જરૂર નથી. દરેક આઇફોન અને એન્ડ્રોઇડ ફોનમાં NFC અને ક્યુઆર કોડ સ્કેનર પહેલેથી જ ઇનબિલ્ટ હોય છે. ગ્રાહક માત્ર ફોન સ્ટેન્ડી પર અડાડશે એટલે સીધું જ ગૂગલ રિવ્યુ પેજ ખુલી જશે.",
  },
  {
    q: "આનાથી ગૂગલ મેપ્સ પર મારો શોરૂમ #1 રેન્ક કેવી રીતે થશે? (How does this rank my shop #1?)",
    a: "ગૂગલનું અલ્ગોરિધમ એવા બિઝનેસને સૌથી ઉપર બતાવે છે જેમના ૫-સ્ટાર રિવ્યુ સતત આવતા હોય અને જે દરેક રિવ્યુનો ઝડપથી જવાબ આપતા હોય. Zentap થી દર મહિને ૩૦ થી ૫૦+ નવા રિવ્યુ આવે છે અને AI ૧૫ મિનિટમાં જવાબ આપે છે, જેથી તમારો બિઝનેસ લોકલ સર્ચમાં ટોપ પર આવે છે.",
  },
  {
    q: "મને એક્રેલિક સ્ટેન્ડી કેવી રીતે મળશે? (How will I receive the physical standee?)",
    a: "પ્લાન સિલેક્ટ કર્યા પછી અમારી અમદાવાદ પ્રિન્ટ યુનિટ તમારા શોરૂમનું નામ અને ક્યુઆર કોડ સાથેનું A6 એક્રેલિક સ્ટેન્ડી બ્લુડાર્ટ કુરિયર દ્વારા ૪૮ કલાકમાં તમારી દુકાને ડિલિવર કરી દેશે. કોઈ ડિલિવરી ચાર્જ નથી.",
  },
  {
    q: "જો કોઈ ગ્રાહક નારાજ હોય તો શું એ ગૂગલ પર ખરાબ રિવ્યુ આપી શકશે? (What if someone leaves 1-star?)",
    a: "અમારી સ્માર્ટ સિસ્ટમમાં નેગેટિવ રિવ્યુ પ્રોટેક્શન શિલ્ડ છે! જો કોઈ ગ્રાહક ૧ થી ૩ સ્ટાર સિલેક્ટ કરશે, તો એ રિવ્યુ ગૂગલ પર પબ્લિક નહીં થાય, પણ સીધો તમારા પર્સનલ WhatsApp પર આવી જશે જેથી તમે ગ્રાહક સાથે સીધી વાત કરીને પ્રોબ્લેમ સોલ્વ કરી શકો અને તમારું ગૂગલ રેટિંગ 4.9★ જળવાઈ રહે.",
  },
  {
    q: "પેમેન્ટ કેવી રીતે કરવાનું રહેશે? (How is payment handled?)",
    a: "ગૂગલ પે, ફોનપે, પેટીએમ કે નેટબેંકિંગ દ્વારા સરળ UPI AutoPay સેટ કરી શકાય છે. દર મહિને આપોઆપ પેમેન્ટ થાય છે, કોઈ ક્રેડિટ કાર્ડની જરૂર નથી અને તમે ગમે ત્યારે પ્લાન પોઝ કે કેન્સલ કરી શકો છો.",
  },
  {
    q: "મને કોઈ મદદ જોઈતી હોય તો કોનો સંપર્ક કરવો? (Who do I contact for help?)",
    a: "અમારી અમદાવાદ બેઝ્ડ સપોર્ટ ટીમ અને ફાઉન્ડર હેલ્પલાઇન (+91 8788416911) પર તમે સીધો ફોન અથવા WhatsApp પર ગુજરાતી, હિન્દી કે અંગ્રેજીમાં વાત કરી શકો છો. સેટઅપમાં સંપૂર્ણ મદદ કરવામાં આવશે.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-white">
      <SectionHeading
        eyebrow="વારંવાર પૂછાતા પ્રશ્નો (FAQ)"
        title="તમારા મનમાં કોઈ સવાલ છે?"
        highlight="અહીં વાંચો જવાબો"
        copy="Zentap સ્માર્ટ સ્ટેન્ડી વિશે વેપારી ભાઈઓ જે સામાન્ય પ્રશ્નો પૂછે છે તેના સરળ જવાબો."
        icon={<span className="text-blue-600">?</span>}
      />

      <div className="mt-12 max-w-3xl mx-auto space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = open === idx;
          return (
            <Reveal key={faq.q} delay={idx * 60}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden transition-all duration-200">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 transition"
                >
                  <span className="pr-4">{faq.q}</span>
                  <IconChevron
                    className={cn(
                      "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200",
                      isOpen && "rotate-180 text-blue-600",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs sm:text-sm text-slate-600">
          હજુ પણ કોઈ સવાલ છે? સીધો WhatsApp પર મેસેજ કરો:{" "}
          <a
            href="https://wa.me/918788416911?text=Hello%20Zentap!%20I%20have%20a%20question."
            target="_blank"
            rel="noreferrer"
            className="font-bold text-emerald-700 hover:underline"
          >
            +91 8788416911
          </a>
        </p>
      </div>
    </Section>
  );
}

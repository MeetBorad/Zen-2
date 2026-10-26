import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading } from "./ui";
import { IconChevron } from "./Icons";

const FAQS = [
  {
    q: "Does the customer need to download an app to review?",
    a: "No app or software required! Every modern iPhone and Android phone comes with native NFC and camera QR scanning built-in. When the customer taps their phone on your standee, Google Maps opens instantly.",
  },
  {
    q: "How does this actually rank my business #1 on Google Maps?",
    a: "Google's search algorithm strongly favors local businesses that gather frequent, verified 5-star reviews and respond quickly. Our system drives 30–50+ authentic reviews every month while our AI automatically replies within 15 minutes, boosting your ranking above local competitors.",
  },
  {
    q: "How do I receive the physical acrylic standee?",
    a: "Once you choose a plan, our Ahmedabad print facility generates your custom QR code and showroom branding. We dispatch your premium A6 acrylic standee via BlueDart Express Courier directly to your counter within 48 to 72 hours with free shipping.",
  },
  {
    q: "What happens if an unhappy customer tries to leave a negative rating?",
    a: "Our standee includes a built-in Private Feedback Shield. If an unhappy guest selects 1 to 3 stars, they are immediately prompted to send a private message directly to your WhatsApp so you can resolve their issue immediately, preventing a public 1-star drop on Google Maps.",
  },
  {
    q: "How does the monthly subscription and payment work?",
    a: "Payments are processed via RBI-compliant UPI AutoPay using Google Pay, PhonePe, or Paytm. There are zero setup fees, no lock-in periods, and you can pause or cancel your subscription whenever you wish.",
  },
  {
    q: "Can customers write reviews in Gujarati or Hindi as well as English?",
    a: "Yes! When the review interface opens on the customer's phone, they can select whether they want to draft their review in English, Gujarati (ગુજરાતી), or Hindi (हिंदी). AI pre-fills a glowing 5-star draft matching their purchase so they can submit in under 5 seconds.",
  },
  {
    q: "Who do I contact if I need help setting up?",
    a: "Our founder helpline and dedicated support team are directly reachable via call and WhatsApp at +91 8788416911. We guide you through connecting your Google Business account in under 3 minutes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-white">
      <SectionHeading
        eyebrow="Frequently Asked Questions"
        title="Everything You Need to Know"
        highlight="Before Ordering"
        copy="Clear answers to common questions asked by retail showroom owners and managers."
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
          Have an urgent question? Message our team directly on WhatsApp:{" "}
          <a
            href="https://wa.me/918788416911?text=Hello!%20I%20have%20a%20question%20about%20the%20Standee."
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

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal, Section, SectionHeading } from "./ui";
import { IconPlus } from "./Icons";

const QA = [
  {
    q: "What exactly happens in the 14-day pilot?",
    a: "You get a branded NFC + QR standee shipped to you, your Google Business Profile connected, AI reply drafts and the full scan-and-review dashboard. No card is required. At day 12 we send a pilot summary — if you have not seen movement, simply do nothing and it ends.",
  },
  {
    q: "Does the AI really post replies on its own?",
    a: "On the Growth plan, yes — replies are drafted, checked and published to your connected Google Business Profile, with an approval queue you can switch on at any time. Automation depends on a healthy Google connection and API permissions, so the dashboard flags any token or publishing failure immediately instead of failing silently.",
  },
  {
    q: "How do you handle unhappy customers?",
    a: "A low rating can open a private feedback conversation with the business first. What Zentap never does is block, gate or selectively hide an honest public Google review — every customer keeps a clear path to review publicly, in line with Google's review policies. Private feedback is an extra channel, not a filter.",
  },
  {
    q: "Is a scan the same as a review?",
    a: "No, and we never mix the two. A scan or NFC tap proves someone engaged with your standee. A review is only counted when a Google review is actually published and can be attributed. Both metrics are reported separately inside the command center.",
  },
  {
    q: "What if my standee is delayed or lost in delivery?",
    a: "Every order moves through artwork → printer acknowledgement → production → dispatch → tracking → delivered, and each stage is timestamped. If a print partner misses an acknowledgement window, the system raises an alert with the affected customer attached so nobody pays and then disappears.",
  },
  {
    q: "How is my business data protected?",
    a: "Each business lives in its own isolated record with strict access controls, OAuth credentials are encrypted and rotated, incoming webhooks are signature-verified, and administrative actions are logged. You can export your data whenever you leave.",
  },
  {
    q: "Can I cancel or move down a plan?",
    a: "Yes. Plans are monthly with no lock-in and you can cancel from the dashboard. Your standee keeps working until the end of the billing period, and your review history stays exportable.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Straight answers,"
        highlight="no fine print"
        copy="Everything owners ask before they put a standee on their counter."
        icon={<span className="text-slate-400">◆</span>}
      />

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {QA.map((item, i) => {
          const on = open === i;
          return (
            <Reveal key={item.q} delay={i * 60}>
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-500",
                  on ? "border-brand-400/30 bg-white/[0.05]" : "border-white/8 bg-white/[0.02] hover:border-white/16",
                )}
              >
                <h3>
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="flex-1 text-[14.5px] font-semibold text-white sm:text-[15px]">{item.q}</span>
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        on ? "rotate-45 border-transparent bg-brand-500 text-white" : "border-white/12 text-slate-400",
                      )}
                    >
                      <IconPlus className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-500",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <p className="min-h-0 px-5 pb-5 text-[13.5px] leading-relaxed text-slate-400 sm:px-6 sm:pb-6">
                    {item.a}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[12.5px] text-slate-500">
          Still deciding?{" "}
          <a href="#start" className="font-semibold text-brand-200 underline-offset-4 hover:underline">
            Tell us where your business is today
          </a>{" "}
          and we'll send a tailored rollout plan.
        </p>
      </Reveal>
    </Section>
  );
}

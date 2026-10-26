import { Reveal, Section, SectionHeading } from "./ui";
import { IconStar } from "./Icons";
import { cn } from "@/utils/cn";

const FEATURED = {
  quote:
    "We used to beg regulars for reviews. Now the standee sits at the till, guests tap, and Zentap answers them before I've cleared the table. In eleven weeks we went from 214 reviews to 612 — and our rating is the highest it has been in five years.",
  name: "Aditi Kulkarni",
  role: "Founder",
  business: "Aditi's Bake Studio, Pune",
  img: "https://images.pexels.com/photos/7752818/pexels-photo-7752818.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
  metric: "+398 Google reviews",
};

const QUOTES = [
  {
    quote:
      "The replies sound like I wrote them on a good day. That was my biggest fear with AI and it disappeared in the first week.",
    name: "Karthik Reddy",
    role: "Owner",
    business: "Iron Works Fitness",
    img: "https://images.pexels.com/photos/7752822/pexels-photo-7752822.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
    metric: "3 min avg. reply",
  },
  {
    quote:
      "I can see which of my three branches is actually collecting reviews. That alone changed how I train my front desk.",
    name: "Dr. Meera Rao",
    role: "Practice head",
    business: "Dr. Rao Dental Care",
    img: "https://images.pexels.com/photos/7752809/pexels-photo-7752809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
    metric: "3 locations tracked",
  },
  {
    quote:
      "One dashboard for reviews, subscriptions and standee delivery. I stopped juggling four apps and a spreadsheet.",
    name: "Rohit Malhotra",
    role: "Co-founder",
    business: "Urban Click Studio",
    img: "https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
    metric: "4 tools replaced",
  },
  {
    quote:
      "Private feedback caught two service issues before they ever reached Google. My team fixed them the same evening.",
    name: "Sanya Iyer",
    role: "Manager",
    business: "Nirvana Salon & Spa",
    img: "https://images.pexels.com/photos/7752808/pexels-photo-7752808.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200",
    metric: "Rating held at 4.8",
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className="h-3.5 w-3.5 text-amber-300" strokeWidth={0} fill="currentColor" />
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <Section id="stories">
      <SectionHeading
        eyebrow="Customer stories"
        title="Owners who stopped chasing reviews"
        highlight="and started collecting them"
        copy="Bakeries, salons, gyms, clinics, cafés and studios — every business that lives on local trust."
        icon={<span className="text-amber-300">◆</span>}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <Reveal dir="left" className="lg:row-span-2">
          <figure className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-400/25 bg-gradient-to-br from-brand-600/18 via-ink-900/60 to-cyan-500/10 p-7 shadow-[0_40px_100px_-45px_rgba(79,70,229,0.9)]">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl"
            />
            <Stars />
            <blockquote className="relative mt-5 text-[15.5px] leading-relaxed text-slate-100">
              “{FEATURED.quote}”
            </blockquote>
            <figcaption className="relative mt-auto flex items-center gap-3 pt-7">
              <img
                src={FEATURED.img}
                alt=""
                loading="lazy"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="text-[13.5px] font-semibold text-white">{FEATURED.name}</p>
                <p className="text-[11.5px] text-slate-400">{FEATURED.business}</p>
              </div>
              <span className="ml-auto rounded-full bg-emerald-500/12 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
                {FEATURED.metric}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {QUOTES.slice(0, 2).map((q, i) => (
          <Reveal key={q.name} delay={i * 90}>
            <figure className="group flex h-full flex-col rounded-3xl border border-white/8 bg-white/[0.025] p-6 card-hover hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
              <Stars />
              <blockquote className="mt-4 text-[13.5px] leading-relaxed text-slate-300">“{q.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={q.img} alt="" loading="lazy" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15" />
                <div>
                  <p className="text-[12.5px] font-semibold text-white">{q.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {q.role}, {q.business}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}

        {QUOTES.slice(2).map((q, i) => (
          <Reveal key={q.name} delay={i * 90}>
            <figure className="group flex h-full flex-col rounded-3xl border border-white/8 bg-white/[0.025] p-6 card-hover hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
              <Stars />
              <blockquote className="mt-4 text-[13.5px] leading-relaxed text-slate-300">“{q.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={q.img} alt="" loading="lazy" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15" />
                <div>
                  <p className="text-[12.5px] font-semibold text-white">{q.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {q.role}, {q.business}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* rating strip */}
      <Reveal delay={120}>
        <div
          className={cn(
            "mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5",
          )}
        >
          {[
            { k: "4.9 / 5", v: "average owner rating" },
            { k: "180+", v: "businesses onboarded" },
            { k: "12", v: "cities live" },
            { k: "< 24 hrs", v: "support response" },
          ].map((s) => (
            <div key={s.k} className="text-center">
              <p className="font-mono text-lg font-semibold text-white">{s.k}</p>
              <p className="text-[11.5px] text-slate-500">{s.v}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

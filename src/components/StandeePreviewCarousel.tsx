import { useState, useEffect, useRef } from "react";
import { IconCheck } from "./Icons";

export interface BusinessSlide {
  id: string;
  category: string;
  emoji: string;
  businessName: string;
  location: string;
  image: string;
  counterType: string;
  reviewerName: string;
  reviewerInitials: string;
  avatarBg: string;
  reviewText: string;
  aiReplyTime: string;
  ratingJump: string;
  ratingSub: string;
  footfallJump: string;
  footfallSub: string;
}

export const BUSINESS_SLIDES: BusinessSlide[] = [
  {
    id: "jewellery",
    category: "Jewellery",
    emoji: "💎",
    businessName: "Virat Gold Palace",
    location: "Nikol Gam Road, Ahmedabad",
    image: "/hero-standee.jpg",
    counterType: "Gold Billing Counter",
    reviewerName: "Harshil Vora",
    reviewerInitials: "HV",
    avatarBg: "bg-amber-600",
    reviewText:
      "“Outstanding bridal collection and certified 916 purity. Digital scale verification and courteous staff. Best jewellery showroom in Nikol!”",
    aiReplyTime: "Mode B AI Reply in 3 mins",
    ratingJump: "4.6★ ➔ 4.9★",
    ratingSub: "+34 reviews in 30 days",
    footfallJump: "+38% Footfall",
    footfallSub: "#1 Jeweller on Google Maps",
  },
  {
    id: "clinic",
    category: "Medical Clinic",
    emoji: "🩺",
    businessName: "Dr. Rao Dental & Implant Centre",
    location: "Drive-In Road, Ahmedabad",
    image: "/standee-clinic.jpg",
    counterType: "Reception & Billing Desk",
    reviewerName: "Dr. Alok Rao",
    reviewerInitials: "AR",
    avatarBg: "bg-blue-600",
    reviewText:
      "“Patients tap their phone right after their cleaning or treatment. We jumped to 4.9★ and rank top for dental implants in West Ahmedabad!”",
    aiReplyTime: "Private WhatsApp Shield Active",
    ratingJump: "4.2★ ➔ 4.9★",
    ratingSub: "+48 reviews in 45 days",
    footfallJump: "+52% Patients",
    footfallSub: "#1 Dental Clinic on Google Maps",
  },
  {
    id: "hotel",
    category: "Hotel & Stay",
    emoji: "🏨",
    businessName: "The Grand Heritage Hotel & Suites",
    location: "Bodakdev, Ahmedabad",
    image: "/standee-hotel.jpg",
    counterType: "Concierge & Check-in Desk",
    reviewerName: "Rajiv Singhal",
    reviewerInitials: "RS",
    avatarBg: "bg-indigo-600",
    reviewText:
      "“Corporate guests tap the standee with their phone while returning room key cards. 100% genuine guest feedback, zero staff intervention required.”",
    aiReplyTime: "Automatic 24/7 AI Guest Reply",
    ratingJump: "4.4★ ➔ 4.9★",
    ratingSub: "+62 reviews in 60 days",
    footfallJump: "+45% Direct Bookings",
    footfallSub: "Top Rated Hotel in Ahmedabad",
  },
  {
    id: "bridal",
    category: "Bridal Studio",
    emoji: "💄",
    businessName: "Aura Bridal Studio & Luxury Spa",
    location: "Nikol, Ahmedabad",
    image: "/standee-bridal.jpg",
    counterType: "Makeover Checkout Desk",
    reviewerName: "Sneha Patel",
    reviewerInitials: "SP",
    avatarBg: "bg-rose-600",
    reviewText:
      "“Brides love tapping the standee right after their bridal makeover when they look and feel their best. Our 5-star photos on Maps bring us bookings daily!”",
    aiReplyTime: "Mode B AI Reply in 5 mins",
    ratingJump: "4.5★ ➔ 5.0★",
    ratingSub: "+41 reviews in 30 days",
    footfallJump: "+60% Inquiries",
    footfallSub: "Trending Salon on Google Maps",
  },
  {
    id: "restaurant",
    category: "Restaurant",
    emoji: "☕",
    businessName: "Cafe De Bella & Artisan Bakery",
    location: "Vastrapur, Ahmedabad",
    image: "/standee-cafe.jpg",
    counterType: "Cafe POS Billing Counter",
    reviewerName: "Mihir Desai",
    reviewerInitials: "MD",
    avatarBg: "bg-amber-700",
    reviewText:
      "“Customers tap while their coffee or pastry bill is printing. Young crowd loves the instant NFC tap. Over 50 new 5-star reviews made us trending on Maps!”",
    aiReplyTime: "Instant Review in 5 Seconds",
    ratingJump: "4.3★ ➔ 4.8★",
    ratingSub: "+55 reviews in 3 weeks",
    footfallJump: "+35% Footfall",
    footfallSub: "#1 Artisan Cafe in Vastrapur",
  },
];

export default function StandeePreviewCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = BUSINESS_SLIDES.length;
  const current = BUSINESS_SLIDES[activeIdx];

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  };

  // Autoplay rotation every 7 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[500px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer Card wrapper */}
      <div className="relative rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl transition-all">
        {/* Header Row: Live Preview title + NFC badge */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold text-slate-800">Countertop Standee Live Preview</p>
          </div>
          <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
            NFC + QR Integrated
          </span>
        </div>

        {/* Business Category Selector Tabs */}
        <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {BUSINESS_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-bold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{slide.emoji}</span>
                <span>{slide.category}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Photo Frame with Right-to-Left Slide Option */}
        <div className="relative mt-3.5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-inner group">
          <img
            key={current.image}
            src={current.image}
            alt={`${current.businessName} - ${current.counterType}`}
            className="h-52 sm:h-56 w-full object-cover transition-all duration-300 group-hover:scale-102"
          />

          {/* Floating Category & Counter Badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[10.5px] font-bold text-white shadow-sm">
            <span>{current.emoji}</span>
            <span>{current.businessName}</span>
          </div>

          <div className="absolute top-3 right-3 z-10 rounded-full bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 text-[10.5px] shadow-sm">
            A6 Acrylic
          </div>

          {/* Bottom Photo Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent p-3.5 text-white">
            <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              {current.counterType}
            </p>
            <p className="text-xs font-semibold text-slate-200">
              Placed directly on cash counter • Customer taps phone to review
            </p>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous standee reference photo"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-md transition hover:bg-white hover:scale-110 active:scale-95"
          >
            <span className="text-sm font-black leading-none">‹</span>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next standee reference photo"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-md transition hover:bg-white hover:scale-110 active:scale-95"
          >
            <span className="text-sm font-black leading-none">›</span>
          </button>
        </div>

        {/* Swipe / Scroll Right-to-Left Indicator Bar */}
        <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-600 font-bold">⇄</span>
            <span>Scroll or swipe right/left</span>
          </div>
          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {BUSINESS_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`Go to ${s.category}`}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIdx ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10.5px] font-bold text-slate-400">
            {activeIdx + 1}/{total}
          </span>
        </div>

        {/* Live Google Review Simulation Card */}
        <div className="mt-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full ${current.avatarBg} text-white font-bold text-xs shadow-xs`}
              >
                {current.reviewerInitials}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{current.reviewerName}</p>
                <p className="text-[10.5px] text-slate-500">{current.location}</p>
              </div>
            </div>
            <div className="flex text-amber-500 text-sm">
              {"★★★★★"}
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-800 font-medium">
            {current.reviewText}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-amber-200/60 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <IconCheck className="h-3.5 w-3.5" /> Verified Google Review
            </span>
            <span className="text-slate-500 font-mono text-[10.5px]">{current.aiReplyTime}</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-3.5 grid grid-cols-2 gap-2.5 text-center">
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/80">
            <p className="text-[10.5px] font-bold text-slate-500 uppercase">Google Rating Jump</p>
            <p className="font-mono text-lg font-black text-slate-900">{current.ratingJump}</p>
            <p className="text-[10px] text-emerald-600 font-semibold">{current.ratingSub}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/80">
            <p className="text-[10.5px] font-bold text-slate-500 uppercase">Customer Growth</p>
            <p className="font-mono text-lg font-black text-slate-900">{current.footfallJump}</p>
            <p className="text-[10px] text-blue-600 font-semibold">{current.footfallSub}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

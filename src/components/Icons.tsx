import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const IconZap = (p: P) => (
  <svg {...base(p)}>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
  </svg>
);
export const IconStar = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9 6.6 19.8l1.1-6.1L3.2 9.4l6.1-.8L12 3Z" />
  </svg>
);
export const IconNfc = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 5.5a9 9 0 0 0 0 13M9 8.2a5.6 5.6 0 0 1 0 7.6M12.6 11a2.4 2.4 0 0 1 0 2M17 3.5a12.6 12.6 0 0 1 0 17" />
  </svg>
);
export const IconQr = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" />
  </svg>
);
export const IconSparkles = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3ZM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2ZM5 14l.6 1.7L7.3 16l-1.7.6L5 18.3l-.6-1.7L2.7 16l1.7-.6L5 14Z" />
  </svg>
);
export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const IconChart = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);
export const IconUsers = (p: P) => (
  <svg {...base(p)}>
    <path d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM20 20v-1.4a3.5 3.5 0 0 0-2.6-3.4M15.6 4.3a3.5 3.5 0 0 1 0 6.8" />
  </svg>
);
export const IconCard = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5" width="19" height="14" rx="3" />
    <path d="M2.5 10h19M6.5 15h3" />
  </svg>
);
export const IconTruck = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.5 6.5h11v9h-11zM13.5 10h4l3 3v2.5h-7z" />
    <circle cx="6.5" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </svg>
);
export const IconActivity = (p: P) => (
  <svg {...base(p)}>
    <path d="M22 12h-4l-3 8-4-16-3 8H2" />
  </svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 13 4.5 4.5L19 7" />
  </svg>
);
export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5" />
  </svg>
);
export const IconChevron = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);
export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);
export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const IconPlus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconGlobe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9h17M3.5 15h17M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
  </svg>
);
export const IconLock = (p: P) => (
  <svg {...base(p)}>
    <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
  </svg>
);
export const IconPrinter = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 9V4h10v5M7 18H5.5A2.5 2.5 0 0 1 3 15.5v-4A2.5 2.5 0 0 1 5.5 9h13A2.5 2.5 0 0 1 21 11.5v4A2.5 2.5 0 0 1 18.5 18H17" />
    <path d="M7 14h10v6H7z" />
  </svg>
);
export const IconChat = (p: P) => (
  <svg {...base(p)}>
    <path d="M20.5 12c0 4-3.8 7-8.5 7-1.2 0-2.3-.2-3.3-.6L4 20l1.4-3.4A6.6 6.6 0 0 1 3.5 12c0-4 3.8-7 8.5-7s8.5 3 8.5 7Z" />
  </svg>
);
export const IconRocket = (p: P) => (
  <svg {...base(p)}>
    <path d="M13.5 3.5c3.5 0 7 3.5 7 7-2 3-5.5 6-9 7.5L7 14.5C8.5 11 11.5 7.5 14.5 5.5" />
    <path d="M7 14.5 4.5 17M9 19.5c-1 1-3 1.5-4.5 1.5C4.5 19.5 5 17.5 6 16.5M14 9.5h.01" />
  </svg>
);
export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3.5 2" />
  </svg>
);
export const IconTarget = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);
export const IconBell = (p: P) => (
  <svg {...base(p)}>
    <path d="M18 15.5V11a6 6 0 1 0-12 0v4.5L4.5 18h15L18 15.5ZM10 21h4" />
  </svg>
);
export const IconList = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 6.5h11M9 12h11M9 17.5h11M4 6.5h.01M4 12h.01M4 17.5h.01" />
  </svg>
);
export const IconPulse = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 12h3.5l2 5 4-11 2.5 6H21" />
  </svg>
);
export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 8 8 5 8-5" />
  </svg>
);

export const IconGoogle = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      fill="#4285F4"
      d="M21.6 12.2c0-.7-.06-1.36-.18-2H12v3.79h5.4a4.62 4.62 0 0 1-2 3.03v2.5h3.23c1.89-1.74 2.97-4.3 2.97-7.32Z"
    />
    <path
      fill="#34A853"
      d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.6A10 10 0 0 0 12 22Z"
    />
    <path
      fill="#FBBC05"
      d="M6.41 13.9a6 6 0 0 1 0-3.83v-2.6H3.06a10 10 0 0 0 0 9.03l3.35-2.6Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.47l3.35 2.6C7.2 7.72 9.4 5.98 12 5.98Z"
    />
  </svg>
);

export const IconRazorpay = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M15.1 2 8.6 9.1l-3.3-1 6.3 4.2-4.5 9.7 8.4-10.1 3.5 1-5.9-4.4L18.7 3 15.1 2Z" />
  </svg>
);

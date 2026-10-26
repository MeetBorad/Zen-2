export const BUSINESS_CATEGORIES = [
  "Restaurant & Cafe",
  "Retail & Fashion",
  "Healthcare & Wellness",
  "Hotel & Hospitality",
  "Home Services",
  "Automotive",
  "Education",
  "Professional Services",
  "Other",
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

export const BUSINESS_REVIEW_TOPICS: Record<BusinessCategory, readonly [string, string, string, string]> = {
  "Restaurant & Cafe": ["Food quality", "Service", "Wait time", "Value"],
  "Retail & Fashion": ["Product quality", "Staff service", "Product range", "Pricing"],
  "Healthcare & Wellness": ["Care quality", "Communication", "Wait time", "Facilities"],
  "Hotel & Hospitality": ["Cleanliness", "Staff service", "Amenities", "Check-in"],
  "Home Services": ["Work quality", "Professionalism", "Timeliness", "Pricing"],
  Automotive: ["Repair quality", "Communication", "Timeliness", "Pricing"],
  Education: ["Teaching quality", "Communication", "Learning progress", "Support"],
  "Professional Services": ["Expertise", "Communication", "Timeliness", "Value"],
  Other: ["Service", "Quality", "Communication", "Value"],
};

export const BUSINESS_REVIEW_CONTEXT: Record<BusinessCategory, string> = {
  "Restaurant & Cafe": "your dining experience",
  "Retail & Fashion": "your shopping experience",
  "Healthcare & Wellness": "your care experience",
  "Hotel & Hospitality": "your stay",
  "Home Services": "the service at your home",
  Automotive: "your vehicle service",
  Education: "your learning experience",
  "Professional Services": "your experience working with us",
  Other: "your experience",
};

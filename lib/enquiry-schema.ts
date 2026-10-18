import { z } from "zod";

export const queryTypes = ["general", "buy", "build", "materials", "guidance", "site-visit", "callback"] as const;
export type QueryType = (typeof queryTypes)[number];

export const queryTabs: { value: QueryType; label: string; hint: string }[] = [
  { value: "general", label: "General query", hint: "Ask us anything about Patel Sons." },
  { value: "buy", label: "Buy a home", hint: "Row house or apartment in one of our projects." },
  { value: "build", label: "Build on my plot", hint: "Labour-rate or with-material contract." },
  { value: "materials", label: "Order materials", hint: "Cement, steel, bricks, tiles and more at contractor rates." },
  { value: "guidance", label: "Real estate guidance", hint: "Plot buying, legal checks, approvals or a contractor audit." },
  { value: "site-visit", label: "Book site visit", hint: "Pick a project and a convenient day." },
  { value: "callback", label: "Request callback", hint: "We call you at a time you choose." },
];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const enquirySchema = z.object({
  queryType: z.enum(queryTypes),
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email").max(120).optional().or(z.literal("")),
  // buying
  interest: z.enum(["row-house", "apartment", "either"]).optional(),
  project: optionalText(120),
  // building on a plot
  contractType: z.enum(["labour-rate", "with-material", "not-sure"]).optional(),
  plotSize: optionalText(60),
  location: optionalText(120),
  // materials order
  items: optionalText(2000),
  deliveryLocation: optionalText(160),
  // guidance
  guidanceTopic: z.enum(["plot-buying", "legal-check", "approvals", "cost-estimate", "contractor-audit", "investment", "other"]).optional(),
  // shared
  budget: z.enum(["under-50l", "50l-1cr", "1cr-2cr", "above-2cr", "undecided"]).optional(),
  timeline: z.enum(["immediately", "3-months", "6-months", "1-year", "exploring"]).optional(),
  preferredContact: z.enum(["call", "whatsapp", "email"]).optional(),
  preferredDate: optionalText(20),
  preferredTime: z.enum(["morning", "afternoon", "evening"]).optional(),
  message: optionalText(1000),
  website: z.string().max(0).optional(), // honeypot
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const budgetOptions = [
  { value: "under-50l", label: "Under ₹50 L" },
  { value: "50l-1cr", label: "₹50 L – ₹1 Cr" },
  { value: "1cr-2cr", label: "₹1 Cr – ₹2 Cr" },
  { value: "above-2cr", label: "Above ₹2 Cr" },
  { value: "undecided", label: "Not decided yet" },
] as const;

export const timelineOptions = [
  { value: "immediately", label: "Immediately" },
  { value: "3-months", label: "Within 3 months" },
  { value: "6-months", label: "Within 6 months" },
  { value: "1-year", label: "Within a year" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const timeOptions = [
  { value: "morning", label: "Morning (9:30 – 12)" },
  { value: "afternoon", label: "Afternoon (12 – 4)" },
  { value: "evening", label: "Evening (4 – 7)" },
] as const;

export const guidanceOptions = [
  { value: "plot-buying", label: "Buying a plot or land" },
  { value: "legal-check", label: "Title / legal due diligence" },
  { value: "approvals", label: "AUDA/AMC or NA approvals" },
  { value: "cost-estimate", label: "Construction cost estimate / BOQ review" },
  { value: "contractor-audit", label: "Audit my contractor's work" },
  { value: "investment", label: "Investment / resale advice" },
  { value: "other", label: "Something else" },
] as const;

/** Map legacy ?interest= values (used by CTA links) to a tab + preset. */
export function presetFromInterest(raw: string | null): { queryType: QueryType; contractType?: EnquiryInput["contractType"]; interest?: EnquiryInput["interest"] } {
  switch (raw) {
    case "labour-rate-contract":
      return { queryType: "build", contractType: "labour-rate" };
    case "with-material-contract":
      return { queryType: "build", contractType: "with-material" };
    case "row-house":
      return { queryType: "buy", interest: "row-house" };
    case "apartment":
      return { queryType: "buy", interest: "apartment" };
    case "materials":
      return { queryType: "materials" };
    case "guidance":
      return { queryType: "guidance" };
    case "site-visit":
      return { queryType: "site-visit" };
    case "callback":
      return { queryType: "callback" };
    default:
      return { queryType: "general" };
  }
}

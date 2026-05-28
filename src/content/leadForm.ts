import { services } from "./services";

export const leadForm = {
  steps: [
    {
      key: "interest",
      label: "Your interest",
      heading: "What can we help with?",
      sub: "Select all that apply. We'll route you to the right practitioner.",
    },
    {
      key: "context",
      label: "Your context",
      heading: "Tell us about your organization.",
      sub: "This helps us scope the conversation and bring the right people.",
    },
    {
      key: "you",
      label: "About you",
      heading: "Last step — how do we reach you?",
      sub: "We respond to every qualified inquiry within one business day.",
    },
  ],

  interestOptions: services.map((s) => ({
    id: s.id,
    title: s.title,
    summary: s.summary,
  })),

  companySizeOptions: [
    "Individual / self",
    "1–10",
    "11–50",
    "51–250",
    "251–1,000",
    "1,000+",
  ] as const,

  roleOptions: [
    "C-suite / Owner",
    "VP / Director",
    "Manager",
    "Individual contributor",
    "HR / L&D",
    "Other",
  ] as const,
} as const;

export type LeadPayload = {
  services: string[];
  companySize: string;
  role: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

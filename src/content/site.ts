export const site = {
  name: "Vigilance Consulting",
  shortName: "Vigilance",
  tagline: "Strategy, performance, and leadership consulting.",
  description:
    "We help organizations turn strategy into measurable performance — through KPIs, OKRs, leadership development, and ROI-driven training.",
  // TODO: replace with the real production domain before launch.
  url: "https://vigilance.consulting",
  email: "hello@vigilance.consulting",
  phone: "+1 (555) 010-0100",
  cta: {
    primary: "Book a consultation",
    secondary: "See our services",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const site = {
  name: "Vigilance Consulting",
  shortName: "Vigilance",
  tagline: "Strategy, performance, and leadership consulting.",
  description:
    "We help organizations turn strategy into measurable performance — through KPIs, OKRs, leadership development, and ROI-driven training.",
  // Live Vercel URL — swap for the custom domain once it's connected.
  url: "https://vigilance-consulting-website.vercel.app",
  email: "info@vigilanceconsulting.com",
  phone: "+973 17226000",
  address: "P. O. Box 16116, Adliya, Bahrain",
  coursesUrl: "https://partnership.kpiinstitute.org/scheduled-courses/",
  cta: {
    primary: "Book a consultation",
    secondary: "See our courses",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

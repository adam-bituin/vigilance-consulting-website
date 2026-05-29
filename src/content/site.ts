// Non-translated config + structural data. All display copy lives in
// messages/{locale}.json. The brand name stays Latin in both locales.
export const site = {
  name: "Vigilance Consulting",
  // English source copy — also used by the (non-localized) OG/Twitter images.
  tagline: "Strategy, performance, and leadership consulting.",
  description:
    "We help organizations turn strategy into measurable performance — through KPIs, OKRs, leadership development, and ROI-driven training.",
  // Live Vercel URL — swap for the custom domain once it's connected.
  url: "https://vigilance-consulting-website.vercel.app",
  email: "info@vigilanceconsulting.com",
  phone: "+973 17226000",
  coursesUrl: "https://partnership.kpiinstitute.org/scheduled-courses/",
  partner: {
    logoSrc: "/kpi-institute.svg",
  },
  // `key` maps to the `nav` namespace in the message catalogs.
  nav: [
    { key: "services", href: "/services" },
    { key: "training", href: "/training" },
    { key: "about", href: "/about" },
    { key: "insights", href: "/insights" },
    { key: "contact", href: "/contact" },
  ],
} as const;

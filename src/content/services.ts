export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
  offerings: { name: string; blurb: string }[];
};

export const services: Service[] = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy & Performance",
    summary:
      "Translate ambition into a measurable plan — and a system that keeps the organization accountable to it.",
    details:
      "We work with leadership teams to define what winning looks like, decompose it into the few measures that actually drive outcomes, and stand up the cadence that holds people to it. The deliverable is not a deck — it's a working scorecard your managers run from on Monday morning.",
    offerings: [
      {
        name: "Strategy & Business Planning",
        blurb:
          "From ambition to a sequenced, resourced, measurable plan with clear owners.",
      },
      {
        name: "Balanced Scorecard",
        blurb:
          "A four-perspective scorecard tailored to your strategy, cascaded down the org.",
      },
      {
        name: "KPIs & OKRs",
        blurb:
          "The right indicators, defined operationally, with thresholds that drive action.",
      },
      {
        name: "Benchmarking",
        blurb:
          "Compare against peers on the dimensions that decide market position.",
      },
    ],
  },
  {
    id: "management",
    number: "02",
    title: "Management & Development",
    summary:
      "Build the management muscle that turns plans into outcomes — performance, innovation, and on-the-job capability.",
    details:
      "Strategy fails at the front line, not in the boardroom. We install the management practices — feedback, coaching, structured on-the-job training — that compound capability quarter over quarter without bloating the org.",
    offerings: [
      {
        name: "Employee Performance Management",
        blurb:
          "Objective-setting, calibration, and review cadences that managers will actually run.",
      },
      {
        name: "Innovation Frameworks",
        blurb:
          "Stage-gated processes for taking ideas from concept to validated outcome.",
      },
      {
        name: "Structured On-the-Job Training",
        blurb:
          "S-OJT systems that transfer expert know-how to new hires in weeks, not years.",
      },
    ],
  },
  {
    id: "data",
    number: "03",
    title: "Data & ROI",
    summary:
      "Put numbers behind every decision. Analyze what matters, prove what works, certify your team to do it again.",
    details:
      "Most organizations have data. Few use it to make decisions. We help you isolate the questions worth answering, build the analyses that answer them defensibly, and certify your people in the ROI methodology so the discipline outlasts the engagement.",
    offerings: [
      {
        name: "Data Analysis",
        blurb:
          "Targeted analyses on the questions that change resource allocation decisions.",
      },
      {
        name: "ROI Methodology",
        blurb:
          "Phillips ROI Methodology applied to programs, projects, and initiatives.",
      },
      {
        name: "ROI Certification Training",
        blurb:
          "Certify internal practitioners so ROI work continues without us in the room.",
      },
    ],
  },
  {
    id: "leadership",
    number: "04",
    title: "Leadership",
    summary:
      "Develop leaders who can mobilize people toward what is hard, novel, and worth doing — at every level.",
    details:
      "We partner with leaders to grow the specific practices that move people from compliance to commitment. The Leadership Challenge® and LPI® provide an evidence-based, measurable spine; coaching and cohort work make the practices stick.",
    offerings: [
      {
        name: "The Leadership Challenge® Program",
        blurb:
          "Kouzes & Posner's evidence-based program, delivered as workshops or cohorts.",
      },
      {
        name: "Executive Coaching",
        blurb:
          "1:1 engagements for senior leaders, anchored to LPI data and strategy.",
      },
      {
        name: "Leadership Practices Inventory (LPI)",
        blurb:
          "360° assessment, debrief, and development planning against the five practices.",
      },
    ],
  },
];

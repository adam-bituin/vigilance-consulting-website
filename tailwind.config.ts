import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FFFFFF",
        muted: "#FAFAFA",
        line: "#EAEAEA",
        subtle: "#6B6B6B",
        brand: {
          DEFAULT: "#F1512A",
          hover: "#D8431F",
          soft: "#FFF1EB",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.02em",
        display: "-0.035em",
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,0.04), 0 10px 28px -14px rgba(10,10,10,0.14)",
        lift: "0 4px 12px -6px rgba(10,10,10,0.10), 0 24px 48px -18px rgba(10,10,10,0.26)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marquee 45s linear infinite reverse",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: {
          50: "#18181B",
          100: "#141416",
          200: "#101012",
          300: "#0D0D0E",
          DEFAULT: "#121214",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          medium: "rgba(255, 255, 255, 0.16)",
          bold: "rgba(255, 255, 255, 0.3)",
        },
        accent: {
          DEFAULT: "#E5A93C",
          hover: "#F3C066",
          muted: "rgba(229, 169, 60, 0.15)",
        },
        muted: {
          DEFAULT: "#8E8E93",
          light: "#A1A1AA",
          dark: "#52525B",
        },
      },
      fontFamily: {
        heading: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        cinema: "0.35em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

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
        background: {
          DEFAULT: "#080808",
          secondary: "#111111",
          elevated: "#161616",
          tertiary: "#1C1C1C",
        },
        surface: {
          50: "#18181B",
          100: "#141416",
          200: "#101012",
          300: "#0D0D0E",
          DEFAULT: "#111111",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.07)",
          medium: "rgba(255, 255, 255, 0.14)",
          bold: "rgba(255, 255, 255, 0.28)",
          lime: "rgba(212, 255, 0, 0.35)",
        },
        accent: {
          DEFAULT: "#D4FF00", // Subtle electric lime
          hover: "#E4FF4D",
          dim: "#A6C700",
          muted: "rgba(212, 255, 0, 0.12)",
          glow: "rgba(212, 255, 0, 0.25)",
        },
        muted: {
          DEFAULT: "#929292",
          light: "#B5B5B5",
          dark: "#5A5A5A",
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
        cinema: "0.3em",
        ultra: "0.45em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
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

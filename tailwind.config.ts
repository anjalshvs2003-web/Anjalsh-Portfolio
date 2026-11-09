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
          DEFAULT: "#100D0F",
          secondary: "#191417",
          card: "#211A1D",
          elevated: "#211A1D",
          tertiary: "#2A2125",
        },
        surface: {
          50: "#2A2125",
          100: "#211A1D",
          200: "#191417",
          300: "#100D0F",
          DEFAULT: "#211A1D",
        },
        border: {
          subtle: "#33292C",
          medium: "#483A3F",
          bold: "#604E55",
          orange: "rgba(240, 120, 61, 0.4)",
        },
        accent: {
          DEFAULT: "#F0783D", // Signature Accent Orange
          hover: "#FF9157",
          dim: "#D4642C",
          muted: "rgba(240, 120, 61, 0.12)",
          glow: "rgba(240, 120, 61, 0.25)",
        },
        primary: {
          DEFAULT: "#F5F2F0",
        },
        muted: {
          DEFAULT: "#999194",
          light: "#B8B1B4",
          dark: "#6B6366",
        },
      },
      fontFamily: {
        heading: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
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

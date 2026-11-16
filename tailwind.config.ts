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
          DEFAULT: "#0A0D12", // Deep cinematic charcoal / near-black
          secondary: "#111620", // Dark slate grey
          card: "#161D2A", // Elevated surface
          elevated: "#161D2A",
          tertiary: "#1E2638",
        },
        surface: {
          50: "#1E2638",
          100: "#161D2A",
          200: "#111620",
          300: "#0A0D12",
          DEFAULT: "#161D2A",
        },
        border: {
          subtle: "#222C3D",
          medium: "#2D394E",
          bold: "#3D4D68",
          accent: "rgba(59, 130, 246, 0.4)",
        },
        accent: {
          DEFAULT: "#3B82F6", // Signature Editorial Blue
          hover: "#60A5FA",
          dim: "#1D4ED8",
          muted: "rgba(59, 130, 246, 0.12)",
          glow: "rgba(59, 130, 246, 0.25)",
        },
        primary: {
          DEFAULT: "#F8FAFC",
        },
        muted: {
          DEFAULT: "#94A3B8",
          light: "#CBD5E1",
          dark: "#64748B",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
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

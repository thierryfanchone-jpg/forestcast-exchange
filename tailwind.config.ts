import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#e8c96a",
          DEFAULT: "#c9a84c",
          dark: "#9e7a2a",
        },
        cream: "#f5f0e8",
        forest: "#1a3a2a",
        deep: "#0a0a0a",
        surface: {
          1: "#111111",
          2: "#181818",
          3: "#222222",
        },
        danger: "#FF4560",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-gold": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 1.6s infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      boxShadow: {
        "gold-glow": "0 0 40px -10px rgba(201, 168, 76, 0.5)",
        "gold-sm": "0 0 20px -5px rgba(201, 168, 76, 0.25)",
        card: "0 4px 32px rgba(0, 0, 0, 0.5)",
        drawer: "-4px 0 40px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;

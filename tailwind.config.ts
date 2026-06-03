import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0b1120",
          light: "#111827",
          border: "#1e2d4a",
          muted: "#1e293b",
        },
        gold: {
          light: "#e8c96a",
          DEFAULT: "#c9a84c",
          dark: "#9e7a2a",
        },
        orion: {
          blue: "#2563eb",
          "blue-dark": "#1d4ed8",
        },
        danger: "#ef4444",
        success: "#22c55e",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-gold": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        shimmer: "shimmer 1.6s infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
      },
      boxShadow: {
        "gold-glow": "0 0 40px -10px rgba(201,168,76,0.4)",
        "gold-sm": "0 0 20px -5px rgba(201,168,76,0.2)",
        card: "0 4px 32px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 48px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;

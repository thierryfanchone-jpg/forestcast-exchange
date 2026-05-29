import type { Config } from "tailwindcss";

/**
 * Palette TrustLayer AI :
 * - background clair, bleu foncé pour la marque,
 * - vert "confiance", orange "risque", rouge "danger".
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe6fe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e3a8a",
          900: "#0f1f4b",
        },
        trust: {
          DEFAULT: "#16a34a",
          light: "#dcfce7",
        },
        warn: {
          DEFAULT: "#ea580c",
          light: "#ffedd5",
        },
        danger: {
          DEFAULT: "#dc2626",
          light: "#fee2e2",
        },
        ink: "#0f172a",
        muted: "#64748b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(15,23,42,0.08), 0 10px 30px -12px rgba(15,23,42,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

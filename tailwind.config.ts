import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#080A0F",
          light: "#FAFAFA",
        },
        surface: {
          1: "#0F1218",
          2: "#161B24",
          3: "#1C2331",
        },
        accent: {
          DEFAULT: "#00D084",
          green: "#00D084",
          blue: "#1E6FFF",
        },
        ink: {
          primary: "#F0F2F5",
          secondary: "#8A93A2",
          tertiary: "#5B6373",
          dark: "#1A1D23",
        },
        danger: "#FF4560",
        warn: "#FFB020",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(circle at 20% 20%, rgba(0,208,132,0.18) 0%, transparent 45%), radial-gradient(circle at 80% 30%, rgba(30,111,255,0.18) 0%, transparent 45%), radial-gradient(circle at 50% 90%, rgba(0,208,132,0.10) 0%, transparent 55%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 32px -8px rgba(0, 208, 132, 0.45)",
        "glow-blue": "0 0 32px -8px rgba(30, 111, 255, 0.45)",
        panel:
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.6)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;

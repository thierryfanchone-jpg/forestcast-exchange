import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b1120",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ORION ACADEMY — Apprends. Entraîne-toi. Progresse.",
    template: "%s · ORION ACADEMY",
  },
  description:
    "ORION ACADEMY t'aide à parler avec clarté, réussir tes entretiens, convaincre et progresser grâce à des modules courts et un coach IA.",
  keywords: [
    "formation",
    "prise de parole",
    "entretien embauche",
    "pitch",
    "leadership",
    "coach IA",
    "communication",
    "ORION ACADEMY",
  ],
  openGraph: {
    title: "ORION ACADEMY — Apprends. Entraîne-toi. Progresse.",
    description:
      "Plateforme de formation pratique avec coach IA pour développer tes compétences en communication.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-navy font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

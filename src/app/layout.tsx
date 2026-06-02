import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/electro/Navbar";
import { Footer } from "@/components/electro/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ElectroSécurité Inc — Électricité & Sécurité en Martinique",
    template: "%s · ElectroSécurité Inc",
  },
  description:
    "Expert en électricité, sécurité incendie et dépannage à distance en Martinique. Diagnostic IA, intervention rapide sur site. Thierry Fanchone — Le Gros-Morne.",
  keywords: [
    "électricien Martinique",
    "dépannage électrique",
    "sécurité incendie",
    "borne de recharge",
    "diagnostic électrique",
    "Le Gros-Morne",
    "ElectroSécurité Inc",
    "Thierry Fanchone",
  ],
  openGraph: {
    title: "ElectroSécurité Inc — Électricité & Sécurité en Martinique",
    description:
      "Expert en électricité, sécurité incendie et dépannage à distance en Martinique. Diagnostic IA, intervention rapide sur site.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-gray-950 font-sans text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

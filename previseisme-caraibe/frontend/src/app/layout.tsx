import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DemoModeBanner } from "@/components/layout/demo-mode-banner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "PréviSéisme Caraïbe — Information sismique officielle des Caraïbes",
    template: "%s · PréviSéisme Caraïbe",
  },
  description:
    "Plateforme professionnelle d'information sismique pour les Caraïbes : données USGS, EMSC et IPGP/OVSM agrégées en temps réel, jamais inventées.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <DemoModeBanner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

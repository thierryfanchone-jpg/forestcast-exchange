import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ToastProvider } from "@/components/ui/Toast";
import { Analytics } from "@vercel/analytics/next";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080A0F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Forecaxt — The Forecast Exchange",
    template: "%s · Forecaxt",
  },
  description:
    "Forecaxt is a regulated forecast exchange for European, African and Caribbean event contracts. Trade probability across politics, economy, crypto and more.",
  keywords: [
    "forecast exchange",
    "prediction market",
    "event contracts",
    "probability market",
    "Forecaxt",
  ],
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Forecaxt — The Forecast Exchange",
    description:
      "Trade event contracts across politics, economy, crypto, sports and more. Real probability, real liquidity.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} dark`}>
      <body className="min-h-screen bg-bg font-sans text-ink-primary antialiased">
        <ToastProvider>
          <div className="relative isolate">
            <Navbar />
            <main className="pb-24 pt-16 md:pb-0">{children}</main>
            <Footer />
            <MobileNav />
          </div>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}

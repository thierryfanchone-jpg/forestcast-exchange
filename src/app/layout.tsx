import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "DepannIA — Assistant dépannage habitat 24h/24",
    template: "%s · DepannIA",
  },
  description:
    "DepannIA vous aide à diagnostiquer vos pannes habitat, évaluer les risques et trouver un artisan qualifié rapidement. Électricité, plomberie, climatisation, électroménager, serrurerie.",
  keywords: [
    "dépannage",
    "diagnostic panne",
    "artisan urgent",
    "électricien",
    "plombier",
    "climatisation",
    "serrurier",
    "aide dépannage",
    "assistant IA habitat",
  ],
  openGraph: {
    title: "DepannIA — Assistant dépannage habitat 24h/24",
    description: "Diagnostic IA, conseils de sécurité et mise en relation avec des artisans qualifiés.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

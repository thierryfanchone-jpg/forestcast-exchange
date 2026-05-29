import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TrustLayer AI — Vérifie la fiabilité des réponses IA",
  description:
    "TrustLayer AI analyse les réponses générées par IA, détecte les risques, vérifie les sources et attribue un score de confiance.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <I18nProvider initialLocale={locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}

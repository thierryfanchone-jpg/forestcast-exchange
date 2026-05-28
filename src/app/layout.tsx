import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import { SiteFooter } from "@/components/SiteFooter";

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
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Les Ateliers de la Forme — Cuisine Saine, Gourmande & Premium",
    template: "%s · Les Ateliers de la Forme",
  },
  description:
    "Cuisine premium, saine et gourmande, sans gluten et sans lactose. Des créations maison inspirées des saveurs caribéennes, pensées pour le plaisir et le bien-être. Fondé par Thierry Fanchone en 2017.",
  keywords: [
    "cuisine saine",
    "sans gluten",
    "sans lactose",
    "caribéen",
    "traiteur antillais",
    "épicerie fine",
    "Thierry Fanchone",
    "Les Ateliers de la Forme",
    "bien-être",
    "gâteau sans gluten",
  ],
  openGraph: {
    title: "Les Ateliers de la Forme — Cuisine Caribéenne Premium",
    description:
      "Cuisine saine, gourmande et premium. Sans gluten, sans lactose. Des créations maison inspirées des Caraïbes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-deep font-sans text-cream antialiased">
        <CartProvider>
          <Header />
          <Cart />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}

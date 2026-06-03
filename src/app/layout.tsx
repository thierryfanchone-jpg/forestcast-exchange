import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'IA Artisan — Diagnostic IA pour pannes et travaux',
    template: '%s · IA Artisan',
  },
  description:
    'Prenez une photo de votre panne. Obtenez un diagnostic clair en quelques minutes. Électricité, plomberie, climatisation, sécurité incendie et plus.',
  keywords: [
    'diagnostic panne',
    'diagnostic électricité',
    'diagnostic plomberie',
    'artisan',
    'IA diagnostic',
    'travaux maison',
    'panne maison',
    'expert en ligne',
  ],
  openGraph: {
    title: 'IA Artisan — Diagnostic IA pour pannes et travaux',
    description:
      'Prenez une photo de votre panne. Obtenez un diagnostic clair en quelques minutes.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

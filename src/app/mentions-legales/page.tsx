import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <h1 className="mb-8 text-3xl font-bold text-white">Mentions légales</h1>
          <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Éditeur du site</h2>
              <p>ORION ACADEMY<br />Plateforme de formation en ligne<br />contact@orion-academy.fr</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Hébergement</h2>
              <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 1600, San Francisco, CA 94104, États-Unis.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Propriété intellectuelle</h2>
              <p>L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d&apos;auteur. Toute reproduction est interdite sans autorisation préalable.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Données personnelles</h2>
              <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à : contact@orion-academy.fr</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
              <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement. Des cookies analytiques peuvent être utilisés avec votre consentement.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions Générales d'Utilisation" };

export default function CGUPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <h1 className="mb-8 text-3xl font-bold text-white">Conditions Générales d&apos;Utilisation</h1>
          <div className="space-y-8 text-slate-300">
            {[
              { title: "1. Accès à la plateforme", content: "ORION ACADEMY est accessible à tout utilisateur disposant d'un accès Internet. La plateforme est disponible 24h/24, 7j/7, sous réserve de maintenances techniques." },
              { title: "2. Inscription", content: "L'utilisation de la plateforme nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants." },
              { title: "3. Utilisation acceptable", content: "Il est interdit de partager son accès, de télécharger les contenus protégés, d'utiliser la plateforme à des fins commerciales non autorisées ou de tenter d'accéder à des zones non autorisées." },
              { title: "4. Propriété intellectuelle", content: "Tous les contenus sont protégés par le droit d'auteur. L'utilisateur dispose d'une licence personnelle, non exclusive et non cessible pour accéder aux contenus achetés." },
              { title: "5. Responsabilité", content: "ORION ACADEMY s'engage à fournir une plateforme de qualité mais ne peut garantir une disponibilité continue. La plateforme ne saurait être tenue responsable des dommages indirects liés à son utilisation." },
              { title: "6. Modification des CGU", content: "ORION ACADEMY se réserve le droit de modifier les présentes CGU. Les utilisateurs seront informés par email de toute modification substantielle." },
            ].map(({ title, content }) => (
              <section key={title}>
                <h2 className="mb-3 text-xl font-semibold text-white">{title}</h2>
                <p>{content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

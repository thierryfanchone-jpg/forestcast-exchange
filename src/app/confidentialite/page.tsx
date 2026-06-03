import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <h1 className="mb-8 text-3xl font-bold text-white">Politique de confidentialité</h1>
          <div className="space-y-8 text-slate-300">
            {[
              { title: "Responsable du traitement", content: "ORION ACADEMY, joignable à contact@orion-academy.fr, est responsable du traitement de vos données personnelles." },
              { title: "Données collectées", content: "Nous collectons : nom, prénom, adresse email lors de l'inscription ; données de progression et de simulation pour personnaliser votre expérience ; données de paiement traitées par Stripe (nous ne stockons pas vos informations bancaires)." },
              { title: "Finalités du traitement", content: "Vos données sont utilisées pour : gérer votre compte et vos accès ; personnaliser votre parcours de formation ; émettre vos certificats ; vous envoyer des communications liées à votre compte (avec votre consentement pour le marketing)." },
              { title: "Durée de conservation", content: "Vos données sont conservées pendant toute la durée de votre compte, puis 3 ans après sa suppression pour les obligations légales." },
              { title: "Vos droits", content: "Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de limitation et de portabilité. Pour exercer vos droits : contact@orion-academy.fr" },
              { title: "Cookies", content: "Nous utilisons des cookies essentiels au fonctionnement du site. Les cookies analytiques (mesure d'audience) sont utilisés uniquement avec votre consentement explicite." },
              { title: "Contact DPO", content: "Pour toute question relative à vos données personnelles : contact@orion-academy.fr" },
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

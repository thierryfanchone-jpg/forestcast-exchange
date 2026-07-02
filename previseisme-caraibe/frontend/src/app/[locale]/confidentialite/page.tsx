import { setRequestLocale } from "next-intl/server";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Politique de confidentialité</h1>
      <div className="prose prose-sm text-muted-foreground mt-8 max-w-none space-y-4 text-sm leading-relaxed">
        <p>
          Nous collectons uniquement les informations nécessaires au fonctionnement de votre compte
          (nom, e-mail, préférences d&apos;alerte) et ne les partageons jamais avec des tiers sans
          consentement explicite.
        </p>
        <p>
          En environnement de démonstration, les données de compte sont stockées localement dans
          votre navigateur et ne transitent par aucun serveur distant.
        </p>
        <p>
          En production, PréviSéisme Caraïbe applique les principes du RGPD : minimisation des
          données, droit d&apos;accès, de rectification et de suppression sur simple demande via la
          page Contact.
        </p>
      </div>
    </div>
  );
}

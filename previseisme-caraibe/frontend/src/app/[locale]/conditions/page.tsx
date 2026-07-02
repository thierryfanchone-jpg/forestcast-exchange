import { setRequestLocale } from "next-intl/server";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Conditions d&apos;utilisation</h1>
      <div className="prose prose-sm text-muted-foreground mt-8 max-w-none space-y-4 text-sm leading-relaxed">
        <p>
          L&apos;utilisation de PréviSéisme Caraïbe implique l&apos;acceptation des présentes
          conditions. La plateforme fournit des informations sismiques agrégées à titre informatif
          et ne constitue pas un système officiel d&apos;alerte précoce.
        </p>
        <p>
          Aucune technologie actuelle ne permet de prédire avec certitude un séisme. PréviSéisme
          Caraïbe décline toute responsabilité quant aux décisions prises sur la seule base des
          informations affichées.
        </p>
        <p>
          L&apos;accès à l&apos;API publique est soumis à des limites de requêtes détaillées sur la
          page API et peut être suspendu en cas d&apos;usage abusif.
        </p>
      </div>
    </div>
  );
}

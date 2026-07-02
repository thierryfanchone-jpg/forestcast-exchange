import { setRequestLocale } from "next-intl/server";

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Mentions légales</h1>
      <div className="prose prose-sm text-muted-foreground mt-8 max-w-none space-y-4 text-sm leading-relaxed">
        <p>
          PréviSéisme Caraïbe est un projet de démonstration présentant une plateforme de
          surveillance sismique pour la région Caraïbe. Les informations affichées sur ce site
          combinent des données de démonstration et des connecteurs préparés pour les flux publics
          USGS, EMSC, IPGP et FDSN.
        </p>
        <p>
          Éditeur : PréviSéisme Caraïbe — Hébergement : infrastructure cloud régionale (à préciser
          en environnement de production).
        </p>
        <p>
          Ce site ne doit pas être utilisé comme seule source d&apos;information en cas
          d&apos;urgence sismique réelle. Consultez toujours les autorités officielles de protection
          civile de votre territoire.
        </p>
      </div>
    </div>
  );
}

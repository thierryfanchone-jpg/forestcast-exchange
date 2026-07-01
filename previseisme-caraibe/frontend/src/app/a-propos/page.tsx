import { PageHero } from "@/components/marketing/page-hero";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une plateforme conçue pour la fiabilité, pas pour la vitesse à tout prix"
        description="PréviSéisme Caraïbe est né d'un constat simple : les Caraïbes sont une région à forte sismicité, mal couverte par une information consolidée, multilingue et fiable."
      />
      <section className="container flex flex-col gap-8 py-16">
        <Card>
          <CardContent className="flex flex-col gap-6 p-6 text-sm text-muted-foreground">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notre principe non négociable</h2>
              <p className="mt-2">
                L&apos;application n&apos;invente jamais de données. Toute magnitude, localisation, profondeur
                ou heure affichée provient d&apos;une source scientifique officielle citée : USGS, EMSC,
                IPGP/OVSM, ou tout observatoire national conforme au standard FDSN ajouté ultérieurement.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Ce que nous ne sommes pas (encore)</h2>
              <p className="mt-2">
                PréviSéisme Caraïbe est une plateforme d&apos;information sismique, pas un système d&apos;alerte
                précoce (EEW) certifié. Cette capacité, prévue à terme, nécessite une instrumentation dédiée,
                une validation scientifique indépendante et un partenariat institutionnel avec les autorités
                de sécurité civile — nous ne la présenterons jamais comme acquise avant cela.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notre feuille de route</h2>
              <p className="mt-2">
                De l&apos;agrégation multi-agences avec indice de confiance (V2) à l&apos;intégration de
                réseaux de capteurs et au calcul de délai d&apos;ondes (V3), chaque étape est documentée et
                conditionnée à une validation scientifique et institutionnelle explicite.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

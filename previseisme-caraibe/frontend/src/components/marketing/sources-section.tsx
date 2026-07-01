import { Card, CardContent } from "@/components/ui/card";

const SOURCES = [
  {
    name: "USGS",
    description: "United States Geological Survey — flux FDSN et GeoJSON temps réel, couverture mondiale.",
  },
  {
    name: "EMSC",
    description: "European-Mediterranean Seismological Centre — diffusion temps réel par WebSocket.",
  },
  {
    name: "IPGP / OVSM",
    description: "Institut de Physique du Globe de Paris — Observatoire Volcanologique et Sismologique de Martinique, source de référence pour la sismicité fine des Antilles françaises.",
  },
];

export function SourcesSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Des sources, jamais d&apos;inventions</h2>
          <p className="mt-4 text-muted-foreground">
            Chaque donnée affichée est traçable jusqu&apos;à l&apos;organisme scientifique qui l&apos;a
            publiée. Architecture prête à intégrer tout observatoire national conforme au standard FDSN.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SOURCES.map((source) => (
            <Card key={source.name}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary">{source.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{source.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

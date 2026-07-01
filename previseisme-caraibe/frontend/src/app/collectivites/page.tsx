import Link from "next/link";
import { Landmark, MessageSquareWarning, Radio, Siren } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Siren,
    title: "Communication de crise",
    description: "Diffusez une information vérifiée à vos administrés dès la confirmation d'un événement.",
  },
  {
    icon: Radio,
    title: "État des sources en direct",
    description: "Suivez la disponibilité de l'IPGP/OVSM, de l'USGS et de l'EMSC pour votre territoire.",
  },
  {
    icon: MessageSquareWarning,
    title: "Accusés de réception",
    description: "Mesurez le taux de réception de vos alertes pour vos exercices de sécurité civile.",
  },
  {
    icon: Landmark,
    title: "Conforme au cadre institutionnel",
    description: "Ne se substitue jamais aux autorités : chaque alerte renvoie vers les canaux officiels.",
  },
];

export default function LocalGovPage() {
  return (
    <>
      <PageHero
        eyebrow="Solution Collectivité"
        title="Un outil de vigilance sismique pour la sécurité civile locale"
        description="PréviSéisme Caraïbe complète — sans jamais s'y substituer — les dispositifs officiels de sécurité civile, en donnant à vos équipes une vision claire et sourcée de la sismicité du territoire."
      />
      <section className="container py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Cette plateforme est un outil d&apos;information complémentaire. Elle ne remplace pas les alertes
          officielles émises par les autorités de sécurité civile compétentes.
        </div>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Échanger avec notre équipe</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

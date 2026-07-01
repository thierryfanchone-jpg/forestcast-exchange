import Link from "next/link";
import { Bell, Building2, LifeBuoy, Map, ShieldQuestion } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const TOPICS = [
  {
    icon: Map,
    title: "Utiliser les cartes",
    description: "Naviguer sur la carte mondiale et Caraïbes, comprendre les couleurs de magnitude et les popups d'événement.",
  },
  {
    icon: Bell,
    title: "Configurer mes alertes",
    description: "Créer une règle de notification par zone, magnitude minimale et canal (push, e-mail).",
  },
  {
    icon: ShieldQuestion,
    title: "Comprendre l'indice de confiance",
    description: "Ce que signifient les niveaux « faible », « moyen », « élevé » et « confirmé multi-source ».",
  },
  {
    icon: Building2,
    title: "Espace Entreprise / Collectivité",
    description: "Gérer vos sites surveillés, vos rôles utilisateurs et vos exports de rapports.",
  },
  {
    icon: LifeBuoy,
    title: "Signaler un problème",
    description: "Contacter le support pour une donnée qui semble incorrecte ou un bug applicatif.",
  },
];

export default function HelpCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="Centre d'aide"
        title="Comment pouvons-nous vous aider ?"
        description="Parcourez nos guides ou consultez la FAQ pour les questions les plus fréquentes."
      />
      <section className="container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <Card key={topic.title}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <topic.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Vous ne trouvez pas de réponse ? Consultez la{" "}
          <Link href="/faq" className="font-medium text-primary hover:underline">
            FAQ
          </Link>{" "}
          ou{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            contactez-nous
          </Link>
          .
        </p>
      </section>
    </>
  );
}

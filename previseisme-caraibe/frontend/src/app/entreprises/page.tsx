import Link from "next/link";
import { Building2, FileSpreadsheet, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Building2,
    title: "Gestion multi-sites",
    description: "Géolocalisez vos bâtiments et sites, avec des seuils d'alerte spécifiques par emplacement.",
  },
  {
    icon: Users,
    title: "Rôles et permissions",
    description: "Attribuez des rôles (propriétaire, administrateur, opérateur, lecteur) à vos équipes.",
  },
  {
    icon: FileSpreadsheet,
    title: "Exports PDF / Excel",
    description: "Générez des rapports d'historique d'alertes pour vos audits internes ou assurances.",
  },
  {
    icon: ShieldCheck,
    title: "API et intégrations",
    description: "Connectez vos propres systèmes de sécurité via notre API REST/GraphQL documentée.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Solution Entreprise"
        title="Protégez vos sites grâce à une information sismique fiable"
        description="Configurez des règles d'alerte par bâtiment, suivez l'historique et exportez vos rapports de conformité — sur la base de données provenant exclusivement de sources scientifiques officielles."
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
        <div className="mt-10 flex justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/contact">Demander une démonstration</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/api-publique">Voir la documentation API</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

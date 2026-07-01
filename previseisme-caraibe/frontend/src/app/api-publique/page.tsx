import { PageHero } from "@/components/marketing/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ENDPOINTS = [
  { method: "GET", path: "/v1/events", description: "Liste des événements sismiques filtrés (magnitude, pays, ville, région)." },
  { method: "GET", path: "/v1/events/{id}", description: "Détail d'un événement, sources contributrices et indice de confiance." },
  { method: "GET", path: "/v1/events/{id}/ai-summary", description: "Résumé explicatif généré par IA, avec sources citées (grounding)." },
  { method: "POST", path: "/v1/felt-reports", description: "Soumettre un signalement « J'ai ressenti ce séisme »." },
  { method: "GET", path: "/v1/sources/health", description: "État de santé des sources sismiques intégrées." },
];

export default function ApiPage() {
  return (
    <>
      <PageHero
        eyebrow="Développeurs"
        title="API publique PréviSéisme Caraïbe"
        description="Intégrez des données sismiques fiables, sourcées et documentées dans vos propres applications. Authentification OAuth2, quotas par plan, réponses REST et GraphQL."
      />
      <section className="container flex flex-col gap-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des endpoints REST</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            {ENDPOINTS.map((ep) => (
              <div key={ep.path} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
                <Badge variant={ep.method === "GET" ? "secondary" : "default"} className="w-fit font-mono">
                  {ep.method}
                </Badge>
                <code className="font-mono text-sm">{ep.path}</code>
                <span className="text-sm text-muted-foreground">{ep.description}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exemple de requête</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs sm:text-sm">
{`curl -H "Authorization: Bearer <token>" \\
  "https://api.previsisme-caraibe.example/v1/events?region=caraibes&min_magnitude=4"`}
            </pre>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          La spécification OpenAPI complète et le schéma GraphQL sont documentés dans{" "}
          <code>docs/previsisme-caraibe/06-api-specifications.md</code> du dépôt du projet.
        </p>
      </section>
    </>
  );
}

import { setRequestLocale, getTranslations } from "next-intl/server";
import { Code2, KeyRound, Gauge, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/v1/events",
    desc: "Liste filtrée des événements sismiques (bbox, magnitude, pays, ville, période).",
  },
  {
    method: "GET",
    path: "/v1/events/{eventId}",
    desc: "Détail d'un événement et sources contributrices.",
  },
  {
    method: "GET",
    path: "/v1/events/{eventId}/ai-summary",
    desc: "Résumé généré automatiquement d'un événement.",
  },
  { method: "POST", path: "/v1/felt-reports", desc: "Envoyer un signalement « J'ai ressenti »." },
  {
    method: "GET",
    path: "/v1/sites",
    desc: "Liste des sites surveillés (entreprises/collectivités).",
  },
  {
    method: "POST",
    path: "/v1/sites/{siteId}/alert-rules",
    desc: "Créer une règle d'alerte pour un site.",
  },
  {
    method: "GET",
    path: "/v1/sources/health",
    desc: "État de santé des sources sismiques (USGS, EMSC, IPGP, FDSN).",
  },
  { method: "GET", path: "/v1/auth/token", desc: "Obtenir un jeton d'accès Bearer JWT." },
];

const METHOD_STYLE: Record<string, string> = {
  GET: "success",
  POST: "warning",
};

const CODE_SNIPPET = `curl "https://api.previseisme-caraibe.org/v1/events?country=Ha%C3%AFti&min_magnitude=4" \\
  -H "Authorization: Bearer <votre_jeton>"`;

export default async function ApiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "apiPage" });

  return (
    <div>
      <section className="border-border bg-muted/30 border-b">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="border-border bg-card text-muted-foreground mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium">
            <Code2 className="text-primary size-3.5" />
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("hero.title")}</h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/inscription">
                <KeyRound className="size-4" /> {t("getKey")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/aide">
                {t("readDocs")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold">{t("quickstart")}</h2>
        <pre className="border-border mt-4 overflow-x-auto rounded-xl border bg-[#0b0f19] p-5 text-sm text-emerald-300">
          <code>{CODE_SNIPPET}</code>
        </pre>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="text-primary size-4" /> {t("authTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {t("authDescription")}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Gauge className="text-primary size-4" /> {t("rateLimits")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {t("rateLimitsDescription")}
            </CardContent>
          </Card>
        </div>

        <h2 className="mt-14 text-xl font-semibold">{t("endpoints")}</h2>
        <div className="divide-border border-border mt-4 divide-y overflow-hidden rounded-xl border">
          {ENDPOINTS.map((ep) => (
            <div
              key={ep.path}
              className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <Badge
                variant={METHOD_STYLE[ep.method] as "success" | "warning"}
                className="w-fit shrink-0 font-mono"
              >
                {ep.method}
              </Badge>
              <code className="shrink-0 font-mono text-sm">{ep.path}</code>
              <p className="text-muted-foreground text-sm">{ep.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

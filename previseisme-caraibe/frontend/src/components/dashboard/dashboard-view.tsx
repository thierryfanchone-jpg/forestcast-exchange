"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Building2,
  Activity,
  ShieldCheck,
  Download,
  Settings2,
  MapPin,
} from "lucide-react";

import { Link, useRouter } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MagnitudeBadge } from "@/components/magnitude-badge";
import { useAuth } from "@/components/providers/auth-provider";
import { caribbeanEarthquakes, sourcesHealth } from "@/lib/demo-data/earthquakes";
import { formatDate } from "@/lib/utils";

const WEEKLY_ACTIVITY = [
  { day: "Lun", events: 4 },
  { day: "Mar", events: 7 },
  { day: "Mer", events: 3 },
  { day: "Jeu", events: 9 },
  { day: "Ven", events: 6 },
  { day: "Sam", events: 2 },
  { day: "Dim", events: 5 },
];

const STATUS_VARIANT: Record<string, "success" | "warning" | "destructive"> = {
  operational: "success",
  degraded: "warning",
  down: "destructive",
};

export function DashboardView() {
  const t = useTranslations("dashboard");
  const tDash = useTranslations("dashboard");
  const locale = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) router.replace("/connexion");
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-64" />
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  const recentEvents = caribbeanEarthquakes.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground text-sm">
          {t("welcome")}, {user.fullName.split(" ")[0]}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={AlertTriangle} label={tDash("activeAlerts")} value="3" tone="warning" />
        <MetricCard icon={Building2} label={tDash("monitoredSites")} value="12" />
        <MetricCard
          icon={Activity}
          label={tDash("recentEvents")}
          value={String(recentEvents.length)}
        />
        <MetricCard icon={ShieldCheck} label={tDash("riskLevel")} value="Modéré" tone="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>{t("weeklyActivity")}</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_ACTIVITY}>
                <defs>
                  <linearGradient id="fillEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="currentColor" opacity={0.6} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  opacity={0.6}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="events"
                  stroke="var(--color-primary)"
                  fill="url(#fillEvents)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("sourcesStatus")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sourcesHealth.map((source) => (
              <div key={source.code} className="flex items-center justify-between gap-2 text-sm">
                <div>
                  <p className="font-medium">{source.name}</p>
                  <p className="text-muted-foreground text-xs">{source.region}</p>
                </div>
                <Badge variant={STATUS_VARIANT[source.status]}>
                  {tDash(
                    `source${source.status === "operational" ? "Operational" : source.status === "degraded" ? "Degraded" : "Down"}`,
                  )}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>{t("recentEvents")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="border-border flex items-center justify-between gap-3 rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <MagnitudeBadge magnitude={event.magnitude} />
                  <div>
                    <p className="flex items-center gap-1 text-sm font-medium">
                      <MapPin className="text-muted-foreground size-3.5" /> {event.place}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(event.timeUtc, locale)}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/carte-caraibes">Voir</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Building2 className="size-4" /> {t("manageSites")}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Settings2 className="size-4" /> {t("manageAlerts")}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Download className="size-4" /> {t("exportReport")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "warning";
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-lg ${
            tone === "warning"
              ? "bg-magnitude-high/15 text-magnitude-high"
              : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-muted-foreground text-xs">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  );
}

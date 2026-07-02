"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, TrendingUp, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MagnitudeBadge } from "@/components/magnitude-badge";
import { caribbeanEarthquakes, magnitudeTier } from "@/lib/demo-data/earthquakes";
import { formatDate, formatNumber } from "@/lib/utils";

const TIER_COLORS: Record<string, string> = {
  low: "var(--color-magnitude-low)",
  moderate: "var(--color-magnitude-moderate)",
  high: "var(--color-magnitude-high)",
  severe: "var(--color-magnitude-severe)",
};

export function HistoryView() {
  const t = useTranslations("history");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const events = caribbeanEarthquakes;

  const stats = React.useMemo(() => {
    const strongest = [...events].sort((a, b) => b.magnitude - a.magnitude)[0];
    const avg = events.reduce((sum, e) => sum + e.magnitude, 0) / events.length;
    return { total: events.length, avg: avg.toFixed(1), strongest };
  }, [events]);

  const byYear = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const e of events) {
      const year = new Date(e.timeUtc).getFullYear().toString();
      map.set(year, (map.get(year) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [events]);

  const byCountry = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const e of events) map.set(e.country, (map.get(e.country) ?? 0) + 1);
    return Array.from(map.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [events]);

  const byMagnitude = React.useMemo(() => {
    const tiers = { low: 0, moderate: 0, high: 0, severe: 0 };
    for (const e of events) tiers[magnitudeTier(e.magnitude)]++;
    return [
      { tier: "< 3.5", count: tiers.low, key: "low" },
      { tier: "3.5 – 4.5", count: tiers.moderate, key: "moderate" },
      { tier: "4.5 – 6.0", count: tiers.high, key: "high" },
      { tier: "≥ 6.0", count: tiers.severe, key: "severe" },
    ];
  }, [events]);

  const recent = React.useMemo(
    () => [...events].sort((a, b) => new Date(b.timeUtc).getTime() - new Date(a.timeUtc).getTime()),
    [events],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl text-sm">{t("subtitle")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Activity}
          label={t("totalEvents")}
          value={formatNumber(stats.total, locale)}
        />
        <StatCard icon={TrendingUp} label={t("avgMagnitude")} value={stats.avg} />
        <StatCard
          icon={Zap}
          label={t("strongestEvent")}
          value={`M ${stats.strongest.magnitude.toFixed(1)} — ${stats.strongest.city}`}
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("byYear")}</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byYear}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="currentColor" opacity={0.6} />
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
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("byCountry")}</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCountry} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  opacity={0.6}
                  allowDecimals={false}
                />
                <YAxis
                  dataKey="country"
                  type="category"
                  width={110}
                  tick={{ fontSize: 11 }}
                  stroke="currentColor"
                  opacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("byMagnitude")}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byMagnitude}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="tier" tick={{ fontSize: 12 }} stroke="currentColor" opacity={0.6} />
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
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {byMagnitude.map((entry) => (
                    <Cell key={entry.key} fill={TIER_COLORS[entry.key]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t("table")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tCommon("magnitude")}</TableHead>
                <TableHead>{tCommon("location")}</TableHead>
                <TableHead className="hidden sm:table-cell">{tCommon("depth")}</TableHead>
                <TableHead className="hidden md:table-cell">{tCommon("date")}</TableHead>
                <TableHead className="hidden md:table-cell">{tCommon("confidence")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <MagnitudeBadge magnitude={event.magnitude} />
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{event.place}</p>
                    <p className="text-muted-foreground text-xs">{event.country}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{event.depthKm} km</TableCell>
                  <TableCell className="hidden text-xs md:table-cell">
                    {formatDate(event.timeUtc, locale)}
                  </TableCell>
                  <TableCell className="hidden text-xs capitalize md:table-cell">
                    {event.confidence}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
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

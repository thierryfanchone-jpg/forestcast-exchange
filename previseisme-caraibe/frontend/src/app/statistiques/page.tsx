"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSeismicEvents } from "@/hooks/use-seismic-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MAGNITUDE_COLORS = [
  "hsl(var(--magnitude-minor))",
  "hsl(var(--magnitude-light))",
  "hsl(var(--magnitude-moderate))",
  "hsl(var(--magnitude-strong))",
  "hsl(var(--magnitude-major))",
];

export default function StatisticsPage() {
  const { data, isLoading } = useSeismicEvents();

  const magnitudeDistribution = React.useMemo(() => {
    const buckets = [
      { name: "< 3", count: 0 },
      { name: "3 – 4", count: 0 },
      { name: "4 – 5", count: 0 },
      { name: "5 – 6", count: 0 },
      { name: "6+", count: 0 },
    ];
    data?.events.forEach((e) => {
      const idx = e.magnitude < 3 ? 0 : e.magnitude < 4 ? 1 : e.magnitude < 5 ? 2 : e.magnitude < 6 ? 3 : 4;
      const bucket = buckets[idx];
      if (bucket) bucket.count += 1;
    });
    return buckets;
  }, [data]);

  const byCountry = React.useMemo(() => {
    const counts = new Map<string, number>();
    data?.events.forEach((e) => counts.set(e.countryName, (counts.get(e.countryName) ?? 0) + 1));
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [data]);

  const avgMagnitude = data?.events.length
    ? (data.events.reduce((sum, e) => sum + e.magnitude, 0) / data.events.length).toFixed(2)
    : "—";

  if (isLoading) {
    return (
      <div className="container flex flex-col gap-6 py-10">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiques sismiques</h1>
        <p className="mt-2 text-muted-foreground">
          Vue d&apos;ensemble calculée à partir des événements actuellement en base
          {data?.isDemo ? " de démonstration" : ""}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Événements suivis" value={String(data?.events.length ?? 0)} />
        <StatCard label="Magnitude moyenne" value={avgMagnitude} />
        <StatCard
          label="Signalements citoyens cumulés"
          value={String(data?.events.reduce((s, e) => s + e.feltReportCount, 0) ?? 0)}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par magnitude</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={magnitudeDistribution} dataKey="count" nameKey="name" innerRadius={50} outerRadius={90}>
                  {magnitudeDistribution.map((_, i) => (
                    <Cell key={i} fill={MAGNITUDE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Événements par pays/territoire</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCountry} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={140} fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-2xl font-bold text-primary">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

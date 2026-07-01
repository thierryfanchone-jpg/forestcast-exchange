const BUCKETS = [
  { label: "< 3 (mineur)", varName: "--magnitude-minor" },
  { label: "3 – 4 (léger)", varName: "--magnitude-light" },
  { label: "4 – 5 (modéré)", varName: "--magnitude-moderate" },
  { label: "5 – 6 (fort)", varName: "--magnitude-strong" },
  { label: "6+ (majeur)", varName: "--magnitude-major" },
];

export function MapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-3 text-xs">
      <span className="font-semibold text-muted-foreground">Magnitude :</span>
      {BUCKETS.map((bucket) => (
        <span key={bucket.label} className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: `hsl(var(${bucket.varName}))` }}
          />
          {bucket.label}
        </span>
      ))}
    </div>
  );
}

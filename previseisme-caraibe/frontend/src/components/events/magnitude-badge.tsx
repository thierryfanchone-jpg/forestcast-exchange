import { cn, formatMagnitude, magnitudeLabel } from "@/lib/utils";

function magnitudeBucketClasses(magnitude: number): string {
  if (magnitude < 3) return "bg-magnitude-minor/15 text-magnitude-minor";
  if (magnitude < 4) return "bg-magnitude-light/15 text-magnitude-light";
  if (magnitude < 5) return "bg-magnitude-moderate/15 text-magnitude-moderate";
  if (magnitude < 6) return "bg-magnitude-strong/15 text-magnitude-strong";
  return "bg-magnitude-major/15 text-magnitude-major";
}

export function MagnitudeBadge({ magnitude, className }: { magnitude: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        magnitudeBucketClasses(magnitude),
        className,
      )}
    >
      M {formatMagnitude(magnitude)}
      <span className="font-medium opacity-70">{magnitudeLabel(magnitude)}</span>
    </span>
  );
}

export function MagnitudeDot({ magnitude, className }: { magnitude: number; className?: string }) {
  return (
    <span
      className={cn("inline-block h-2.5 w-2.5 rounded-full", magnitudeBucketClasses(magnitude), className)}
      style={{ backgroundColor: "currentColor" }}
    />
  );
}

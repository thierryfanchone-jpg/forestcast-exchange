import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-border bg-muted/30 py-16", className)}>
      <div className="container max-w-3xl text-center">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-4 text-muted-foreground">{description}</p>}
      </div>
    </section>
  );
}

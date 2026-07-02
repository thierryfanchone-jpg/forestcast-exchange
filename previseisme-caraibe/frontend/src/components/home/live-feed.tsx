import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MapPin } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MagnitudeBadge } from "@/components/magnitude-badge";
import { caribbeanEarthquakes } from "@/lib/demo-data/earthquakes";
import { formatDate } from "@/lib/utils";

export function LiveFeed() {
  const t = useTranslations("home.liveFeed");
  const locale = useLocale();
  const events = caribbeanEarthquakes.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">{t("subtitle")}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/carte-caraibes">
            {t("cta")} <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <MagnitudeBadge magnitude={event.magnitude} />
              <span className="text-muted-foreground text-xs">
                {formatDate(event.timeUtc, locale)}
              </span>
            </div>
            <p className="mt-3 flex items-start gap-1.5 text-sm font-medium">
              <MapPin className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
              {event.place}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {event.country} · {event.depthKm} km · {event.source}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

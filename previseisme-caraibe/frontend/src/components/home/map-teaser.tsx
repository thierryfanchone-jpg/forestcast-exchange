"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function MapTeaser() {
  const t = useTranslations("home.map");

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="border-border from-primary/10 via-card to-card relative overflow-hidden rounded-2xl border bg-gradient-to-br p-10 sm:p-14">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_50%_80%_at_100%_0%,black,transparent)] opacity-40" />
        <div className="relative max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <p className="text-muted-foreground mt-4">{t("subtitle")}</p>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/carte-caraibes">
              {t("cta")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

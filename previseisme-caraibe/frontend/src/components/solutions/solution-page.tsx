"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Building2,
  Layers,
  ShieldCheck,
  FileBarChart,
  Landmark,
  Megaphone,
  Users2,
  FileText,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ICON_SETS = {
  businesses: [Layers, ShieldCheck, Users2, FileBarChart],
  communities: [Landmark, Megaphone, Users2, FileText],
};

const BADGE_ICONS = {
  businesses: Building2,
  communities: Landmark,
};

export function SolutionPage({ namespace }: { namespace: "businesses" | "communities" }) {
  const t = useTranslations(namespace);
  const icons = ICON_SETS[namespace];
  const BadgeIcon = BADGE_ICONS[namespace];
  const items = t.raw("features.items") as { title: string; description: string }[];

  return (
    <div>
      <section className="border-border relative overflow-hidden border-b">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] opacity-50" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-border bg-card text-muted-foreground mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          >
            <BadgeIcon className="text-primary size-3.5" />
            {t("hero.badge")}
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-balance sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">
              {t("hero.cta")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight">{t("features.title")}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Card key={item.title} className="flex gap-4 p-6">
                <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-sm">{item.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-border bg-muted/30 border-t py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Building2 className="text-primary/60 mx-auto size-8" />
          <h2 className="mt-4 text-2xl font-bold">
            {namespace === "businesses" ? t("plans.title") : t("hero.title")}
          </h2>
          <Button className="mt-6" asChild>
            <Link href="/contact">
              {namespace === "businesses" ? t("plans.cta") : t("hero.cta")}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

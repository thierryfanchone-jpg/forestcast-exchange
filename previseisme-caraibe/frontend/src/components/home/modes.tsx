"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Home, Building2, Landmark, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const MODES = [
  { key: "family", icon: Home, href: "/", accent: "from-emerald-500/15" },
  { key: "business", icon: Building2, href: "/entreprises", accent: "from-primary/15" },
  { key: "community", icon: Landmark, href: "/collectivites", accent: "from-amber-500/15" },
] as const;

export function Modes() {
  const t = useTranslations("home.modes");

  return (
    <section className="border-border bg-muted/30 border-y py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <p className="text-muted-foreground mt-4">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {MODES.map((mode, i) => {
            const Icon = mode.icon;
            const copy = t.raw(mode.key) as { title: string; description: string; cta: string };
            return (
              <motion.div
                key={mode.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`border-border relative overflow-hidden rounded-2xl border bg-gradient-to-b ${mode.accent} to-card p-7`}
              >
                <div className="bg-background flex size-12 items-center justify-center rounded-xl shadow-sm">
                  <Icon className="text-primary size-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{copy.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{copy.description}</p>
                <Button variant="link" className="mt-4 h-auto px-0" asChild>
                  <Link href={mode.href}>
                    {copy.cta} <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

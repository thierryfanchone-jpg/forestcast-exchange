"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Map, SlidersHorizontal, BellRing, History, LayoutGrid, Code2 } from "lucide-react";

const ICONS = [Map, SlidersHorizontal, BellRing, History, LayoutGrid, Code2];

export function Features() {
  const t = useTranslations("home.features");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
        <p className="text-muted-foreground mt-4">{t("subtitle")}</p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group border-border bg-card rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-11 items-center justify-center rounded-lg transition-colors">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

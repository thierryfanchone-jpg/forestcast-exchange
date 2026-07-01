"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { value: "3", label: "Sources scientifiques officielles intégrées" },
  { value: "< 30 s", label: "Latence cible d'ingestion des événements" },
  { value: "24/7", label: "Surveillance continue de la région Caraïbes" },
  { value: "FR · EN · ES", label: "Interface multilingue" },
];

export function StatsSection() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="container grid grid-cols-2 gap-4 py-12 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-2 text-center">
                <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

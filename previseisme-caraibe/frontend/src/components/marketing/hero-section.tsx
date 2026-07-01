"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container flex flex-col items-center gap-8 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Données officielles USGS · EMSC · IPGP / OVSM
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          L&apos;information sismique{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            officielle des Caraïbes
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl text-lg text-muted-foreground"
        >
          PréviSéisme Caraïbe agrège en temps quasi réel les données de séismes provenant
          d&apos;organismes scientifiques officiels — sans jamais inventer de données — pour les
          familles, les entreprises et les collectivités de la région.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="/caraibes">
              Voir la carte Caraïbes <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/api-publique">Découvrir l&apos;API</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          Aucune donnée inventée — chaque événement cite sa source scientifique.
        </motion.div>
      </div>
    </section>
  );
}

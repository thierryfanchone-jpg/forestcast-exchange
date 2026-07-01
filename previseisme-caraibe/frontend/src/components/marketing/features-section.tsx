"use client";

import { motion } from "framer-motion";
import { Bell, Building2, Globe2, History, Landmark, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Globe2,
    title: "Carte mondiale et Caraïbes",
    description: "Visualisez les séismes en temps réel sur une carte interactive, mondiale ou centrée sur les Caraïbes.",
  },
  {
    icon: Bell,
    title: "Notifications instantanées",
    description: "Recevez une alerte push dès qu'un événement dépasse vos seuils de magnitude et de distance.",
  },
  {
    icon: History,
    title: "Historique complet",
    description: "Consultez l'historique sismique de n'importe quelle zone, filtré par magnitude, profondeur ou date.",
  },
  {
    icon: Building2,
    title: "Mode Entreprise",
    description: "Surveillez vos sites et bâtiments, configurez des règles d'alerte et exportez vos rapports.",
  },
  {
    icon: Landmark,
    title: "Mode Collectivité",
    description: "Pilotez la communication de crise avec un tableau de bord dédié à la sécurité civile locale.",
  },
  {
    icon: ShieldCheck,
    title: "Indice de confiance",
    description: "Chaque événement affiche son niveau de confiance et les sources qui le confirment.",
  },
];

export function FeaturesSection() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Une plateforme complète</h2>
        <p className="mt-4 text-muted-foreground">
          Conçue pour les familles, les entreprises et les collectivités, avec la même exigence de
          fiabilité des données à chaque étage.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

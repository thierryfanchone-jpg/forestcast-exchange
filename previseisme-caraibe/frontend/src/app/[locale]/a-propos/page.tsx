import { setRequestLocale, getTranslations } from "next-intl/server";
import { ShieldCheck, Eye, Users, Globe2, Microscope, Database } from "lucide-react";

import { Card } from "@/components/ui/card";

const VALUE_ICONS = [ShieldCheck, Eye, Users, Globe2];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const values = t.raw("values.items") as { title: string; description: string }[];

  return (
    <div>
      <section className="border-border bg-muted/30 border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("hero.title")}</h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl sm:text-lg">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">{t("mission.title")}</h2>
        <p className="text-muted-foreground mt-4 leading-relaxed">{t("mission.text")}</p>
      </section>

      <section className="border-border bg-muted/30 border-y py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold">{t("values.title")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <Card key={value.title} className="p-6 text-center">
                  <div className="bg-primary/10 text-primary mx-auto flex size-11 items-center justify-center rounded-lg">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
              <Microscope className="size-5" />
            </div>
            <h2 className="mt-4 text-xl font-bold">{t("team.title")}</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t("team.text")}</p>
          </div>
          <div>
            <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
              <Database className="size-5" />
            </div>
            <h2 className="mt-4 text-xl font-bold">{t("sources.title")}</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {t("sources.text")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

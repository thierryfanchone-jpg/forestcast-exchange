"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Rocket,
  BellRing,
  UserCog,
  Building2,
  Code2,
  Database,
  LifeBuoy,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CATEGORY_ICONS = {
  gettingStarted: Rocket,
  alerts: BellRing,
  account: UserCog,
  business: Building2,
  api: Code2,
  data: Database,
} as const;

export function HelpView() {
  const t = useTranslations("help");
  const tFaq = useTranslations("faq");
  const [query, setQuery] = React.useState("");

  const categories = Object.keys(CATEGORY_ICONS) as (keyof typeof CATEGORY_ICONS)[];
  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];

  const filtered = query
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(query.toLowerCase()) ||
          item.answer.toLowerCase().includes(query.toLowerCase()),
      )
    : faqItems;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl">{t("subtitle")}</p>

        <div className="relative mx-auto mt-8 max-w-lg">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((key) => {
          const Icon = CATEGORY_ICONS[key];
          return (
            <Card key={key} className="flex items-center gap-3 p-4">
              <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-5" />
              </div>
              <p className="text-sm font-medium">{t(`categories.${key}`)}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <Accordion type="single" collapsible className="mt-4">
          {filtered.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {filtered.length === 0 && (
          <p className="text-muted-foreground py-8 text-center text-sm">Aucun résultat.</p>
        )}
      </div>

      <Card className="mt-14 flex flex-col items-center gap-3 p-8 text-center">
        <LifeBuoy className="text-primary size-7" />
        <p className="text-muted-foreground text-sm">{t("contactCta")}</p>
        <Button asChild>
          <Link href="/contact">Contact</Link>
        </Button>
      </Card>
    </div>
  );
}

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function TestimonialAndCta() {
  const t = useTranslations("home.testimonial");
  const tCta = useTranslations("home.cta");

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="border-border bg-muted/30 rounded-2xl border p-8 text-center sm:p-12">
          <Quote className="text-primary/50 mx-auto size-8" />
          <p className="mt-4 text-xl font-medium text-balance sm:text-2xl">“{t("quote")}”</p>
          <p className="text-muted-foreground mt-4 text-sm">{t("author")}</p>
        </div>
      </section>

      <section className="border-border bg-primary text-primary-foreground border-t">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{tCta("title")}</h2>
          <p className="text-primary-foreground/85 mx-auto mt-4 max-w-xl">{tCta("subtitle")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/inscription">{tCta("primary")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              asChild
            >
              <Link href="/contact">{tCta("secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

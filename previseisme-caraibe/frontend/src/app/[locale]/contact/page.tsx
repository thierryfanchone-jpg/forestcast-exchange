import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, LifeBuoy, Briefcase, Newspaper } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold">{t("info.title")}</h2>
            <a
              href={`mailto:${t("info.email")}`}
              className="text-primary mt-3 flex items-center gap-2 text-sm hover:underline"
            >
              <Mail className="size-4" /> {t("info.email")}
            </a>
          </div>
          <ContactInfoRow icon={LifeBuoy} title={t("info.supportTitle")} />
          <ContactInfoRow icon={Briefcase} title={t("info.salesTitle")} />
          <ContactInfoRow icon={Newspaper} title={t("info.pressTitle")} />
        </div>
      </div>
    </div>
  );
}

function ContactInfoRow({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="border-border flex items-center gap-3 rounded-lg border p-4">
      <Icon className="text-muted-foreground size-4" />
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}

import { useTranslations } from "next-intl";
import { AtSign, Rss, Share2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const productLinks = [
    { href: "/carte-mondiale", label: tNav("worldMap") },
    { href: "/carte-caraibes", label: tNav("caribbeanMap") },
    { href: "/recherche", label: tNav("search") },
    { href: "/historique", label: tNav("history") },
    { href: "/api", label: tNav("api") },
  ];

  const companyLinks = [
    { href: "/a-propos", label: tNav("about") },
    { href: "/entreprises", label: tNav("businesses") },
    { href: "/collectivites", label: tNav("communities") },
    { href: "/contact", label: tNav("contact") },
  ];

  const resourceLinks = [
    { href: "/aide", label: tNav("help") },
    { href: "/faq", label: "FAQ" },
    { href: "/api", label: t("sources") },
    { href: "/api", label: t("status") },
  ];

  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-xs text-sm">{t("description")}</p>
            <div className="text-muted-foreground mt-5 flex items-center gap-3">
              <AtSign className="size-4" />
              <Share2 className="size-4" />
              <Rss className="size-4" />
            </div>
          </div>

          <FooterColumn title={t("product")} links={productLinks} />
          <FooterColumn title={t("company")} links={companyLinks} />
          <FooterColumn title={t("resources")} links={resourceLinks} />
        </div>

        <div className="border-border text-muted-foreground mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} PréviSéisme Caraïbe — {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-foreground">
              {t("legalNotice")}
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground">
              {t("privacy")}
            </Link>
            <Link href="/conditions" className="hover:text-foreground">
              {t("terms")}
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground/70 mt-4 text-xs">{t("madeFor")}</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link, i) => (
          <li key={`${link.href}-${i}`}>
            <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

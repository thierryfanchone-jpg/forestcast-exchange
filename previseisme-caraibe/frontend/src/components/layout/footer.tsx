import Link from "next/link";
import { Activity } from "lucide-react";
import { footerNav, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Sources officielles : USGS · EMSC · IPGP / OVSM · réseaux FDSN.
          </p>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} PréviSéisme Caraïbe. Plateforme d&apos;information, pas un service d&apos;alerte officiel.</p>
          <p>Aucune donnée sismique n&apos;est inventée — toute information provient de sources scientifiques citées.</p>
        </div>
      </div>
    </footer>
  );
}

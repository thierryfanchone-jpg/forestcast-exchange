import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary px-8 py-16 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Prêt à surveiller la sismicité des Caraïbes ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
          Créez votre compte gratuitement, configurez vos zones de surveillance et recevez vos
          premières alertes en quelques minutes.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/connexion">
              Créer un compte <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10" asChild>
            <Link href="/contact">Parler à un expert</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

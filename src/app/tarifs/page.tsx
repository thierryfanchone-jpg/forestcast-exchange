import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRICING_PLANS } from "@/lib/demo-data";
import { Check, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Choisissez la formule ORION ACADEMY qui correspond à vos ambitions.",
};

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-navy-light py-20">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
            <h1 className="section-title mb-4">Tarifs transparents</h1>
            <p className="section-subtitle mx-auto max-w-xl">
              Investis dans ta progression. Choisis la formule adaptée à ton objectif.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`card-orion flex flex-col ${
                    plan.is_popular
                      ? "border-gold/40 shadow-gold-glow relative"
                      : ""
                  }`}
                >
                  {plan.is_popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold px-4 py-1 text-xs font-bold text-navy">
                        <Zap size={12} /> Populaire
                      </span>
                    </div>
                  )}

                  <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    {plan.name}
                  </div>

                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price === 0 ? "0€" : `${plan.price}€`}
                    </span>
                    {plan.period && (
                      <span className="mb-1 text-sm text-slate-400">/{plan.period}</span>
                    )}
                  </div>

                  <p className="mb-6 text-sm text-slate-400">{plan.description}</p>

                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check size={14} className="mt-0.5 shrink-0 text-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.price === 0 ? "/inscription" : "/inscription"}
                    className={`justify-center text-sm ${
                      plan.is_popular ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            {/* FAQ teaser */}
            <div className="mt-16 text-center">
              <p className="text-slate-400">
                Des questions ?{" "}
                <Link href="/#faq" className="text-gold underline-offset-2 hover:underline">
                  Consultez notre FAQ
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { PageHero } from "@/components/marketing/page-hero";

const FAQ_ITEMS = [
  {
    question: "D'où viennent les données affichées ?",
    answer:
      "Exclusivement d'organismes scientifiques officiels : USGS (États-Unis), EMSC (Europe/Méditerranée), IPGP/OVSM (Antilles françaises), et à terme tout observatoire national conforme au standard FDSN. Aucune donnée n'est générée ou estimée par l'application sans être clairement identifiée comme telle.",
  },
  {
    question: "PréviSéisme Caraïbe est-il un système d'alerte précoce ?",
    answer:
      "Non, pas encore. La version actuelle est une plateforme d'information sismique : elle agrège et diffuse des données déjà publiées par des tiers, avec une latence de plusieurs dizaines de secondes à quelques minutes. Un véritable système d'alerte précoce (détection des ondes P avant les ondes S) nécessite une instrumentation dédiée et une validation scientifique/institutionnelle — voir notre page À propos.",
  },
  {
    question: "Que signifie l'indice de confiance affiché sur un événement ?",
    answer:
      "Il reflète le nombre de sources indépendantes confirmant l'événement, leur statut de revue (automatique ou vérifié par un sismologue), et la cohérence entre elles. Un événement à confiance « faible » reste affiché par transparence mais ne déclenche pas d'alerte push à large échelle.",
  },
  {
    question: "Puis-je utiliser l'application hors connexion ?",
    answer:
      "Oui. La dernière donnée connue reste consultable hors ligne, avec une bannière indiquant l'heure de la dernière synchronisation.",
  },
  {
    question: "Comment fonctionne le signalement « J'ai ressenti ce séisme » ?",
    answer:
      "Vous indiquez votre position et l'intensité perçue. Le signalement est automatiquement rattaché à l'événement correspondant s'il existe, sinon il reste visible en modération pour analyse.",
  },
  {
    question: "L'IA peut-elle se tromper ou inventer des informations ?",
    answer:
      "Les résumés générés par IA sont construits exclusivement à partir des données déjà validées en base (principe de « grounding » strict), avec un contrôle automatique qui rejette toute génération citant un chiffre ne correspondant pas aux données sources. Ils sont explicitement étiquetés comme assistés par IA, non comme un avis d'expert humain.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions fréquentes" />
      <section className="container max-w-3xl py-16">
        <div className="flex flex-col divide-y divide-border">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium">
                {item.question}
                <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

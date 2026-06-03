import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DEMO_COURSES } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { Clock, BookOpen, Check, ArrowLeft, Award, MessageSquare } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEMO_COURSES.map((c) => ({ slug: c.slug }));
}

export default async function FormationDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = DEMO_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const WHAT_YOU_LEARN = [
    "Structurer clairement tes idées et messages",
    "Gérer le stress et la pression avant et pendant",
    "Captiver et convaincre ton audience",
    "Répondre aux questions difficiles avec assurance",
    "Adapter ton discours à chaque situation",
    "Mesurer et améliorer ton impact communication",
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <Link href="/formations" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold">
            <ArrowLeft size={16} /> Retour aux formations
          </Link>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className={`mb-6 h-40 rounded-xl bg-gradient-to-br ${course.color} flex items-end p-6`}>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-white/60">{course.category}</div>
                  <div className="text-3xl font-bold text-white">{course.title}</div>
                </div>
              </div>

              <h1 className="mb-4 text-2xl font-bold text-white">{course.subtitle}</h1>
              <p className="mb-8 text-slate-400 leading-relaxed">{course.description}</p>

              <div className="mb-8 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="badge-gold">{course.level}</span>
                <span className="flex items-center gap-1"><Clock size={14} />{course.duration_hours}h</span>
                <span className="flex items-center gap-1"><BookOpen size={14} />{course.lesson_count} leçons</span>
              </div>

              <div className="card-orion mb-8">
                <h2 className="mb-4 text-lg font-bold text-white">Ce que tu vas apprendre</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {WHAT_YOU_LEARN.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={16} className="mt-0.5 shrink-0 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-orion">
                <h2 className="mb-4 text-lg font-bold text-white">Ce module inclut</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: BookOpen, text: `${course.lesson_count} leçons vidéo` },
                    { icon: MessageSquare, text: "Coach IA inclus" },
                    { icon: Award, text: "Certificat officiel" },
                    { icon: Clock, text: "Accès à vie" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-slate-300">
                      <Icon size={16} className="text-gold" /> {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div>
              <div className="card-orion sticky top-24">
                <div className="mb-4 text-3xl font-bold text-gold">{formatPrice(course.price)}</div>
                <p className="mb-6 text-sm text-slate-400">Accès à vie · Certificat inclus · Coach IA</p>
                <Link href="/inscription" className="btn-primary mb-3 w-full justify-center">
                  Acheter maintenant
                </Link>
                <Link href="/inscription" className="btn-outline w-full justify-center">
                  Essai gratuit
                </Link>
                <div className="mt-6 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2"><Check size={12} className="text-green-400" /> Satisfait ou remboursé 14 jours</div>
                  <div className="flex items-center gap-2"><Check size={12} className="text-green-400" /> Paiement sécurisé Stripe</div>
                  <div className="flex items-center gap-2"><Check size={12} className="text-green-400" /> Certificat officiel inclus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

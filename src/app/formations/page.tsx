import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DEMO_COURSES } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations",
  description: "Tous les modules ORION ACADEMY pour développer tes compétences en communication.",
};

export default function FormationsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-navy-light py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <h1 className="section-title mb-4">Nos formations</h1>
              <p className="section-subtitle mx-auto max-w-2xl">
                5 modules pratiques, des exercices guidés et un coach IA pour progresser rapidement dans les compétences qui comptent le plus.
              </p>
            </div>
          </div>
        </section>

        {/* Courses grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {DEMO_COURSES.map((course) => (
                <article key={course.id} className="card-orion card-hover group flex flex-col overflow-hidden">
                  {/* Gradient header */}
                  <div className={`h-32 rounded-lg bg-gradient-to-br ${course.color} mb-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
                        {course.category}
                      </div>
                      <div className="text-2xl font-bold text-white">{course.title}</div>
                    </div>
                  </div>

                  <h2 className="mb-2 text-lg font-bold text-white">{course.subtitle}</h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">{course.description}</p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    <span className="badge-gold">{course.level}</span>
                    {course.tags.map((tag) => (
                      <span key={tag} className="badge bg-navy-muted text-slate-400">{tag}</span>
                    ))}
                  </div>

                  <div className="mb-5 flex gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {course.duration_hours}h de contenu
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} />
                      {course.lesson_count} leçons
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-navy-border pt-5">
                    <span className="text-xl font-bold text-gold">{formatPrice(course.price)}</span>
                    <Link
                      href={`/formations/${course.slug}`}
                      className="btn-primary py-2 px-4 text-xs group-hover:shadow-gold-sm inline-flex items-center gap-1"
                    >
                      Commencer <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

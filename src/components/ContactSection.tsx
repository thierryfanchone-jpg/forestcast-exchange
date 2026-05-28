"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { WHATSAPP_NUMBER, SITE_EMAIL } from "@/lib/config";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const waNumber = WHATSAPP_NUMBER.replace(/[\s+\-()]/g, "");

  const CARDS = [
    {
      Icon: MessageCircle,
      title: "WhatsApp",
      value: WHATSAPP_NUMBER,
      href: `https://wa.me/${waNumber}?text=${encodeURIComponent("Bonjour, je souhaite passer une commande.")}`,
      cta: "Commandez maintenant",
      highlight: true,
    },
    {
      Icon: Mail,
      title: "Email",
      value: SITE_EMAIL,
      href: `mailto:${SITE_EMAIL}`,
      cta: "Nous écrire",
      highlight: false,
    },
    {
      Icon: Clock,
      title: "Horaires",
      value: "Lun – Sam : 8h – 20h",
      href: null as string | null,
      cta: null as string | null,
      highlight: false,
    },
  ];

  return (
    <section ref={ref} className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
            Contact
          </p>
          <h2 className="section-title">Nous retrouver</h2>
          <div className="gold-line mx-auto mt-4 w-24" />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map(({ Icon, title, value, href, cta, highlight }, i) => (
            <motion.div
              key={title}
              className={`border p-8 text-center transition-all duration-300 ${
                highlight
                  ? "border-gold/30 bg-surface-1 shadow-gold-sm"
                  : "border-cream/5 hover:border-cream/10"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center border transition-all ${
                  highlight
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-cream/10 text-cream/35"
                }`}
              >
                <Icon size={20} />
              </div>

              <p className="mb-2 text-[10px] uppercase tracking-widest text-cream/35">
                {title}
              </p>
              <p
                className={`mb-5 text-sm font-medium ${
                  highlight ? "text-gold" : "text-cream/65"
                }`}
              >
                {value}
              </p>

              {href && cta && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    highlight
                      ? "btn-gold px-6 py-2.5 text-[11px]"
                      : "text-[11px] uppercase tracking-widest text-cream/35 transition-colors hover:text-gold"
                  }
                >
                  {cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

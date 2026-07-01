"use client";

import * as React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [sent, setSent] = React.useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Une question, un partenariat scientifique, une démonstration entreprise ou collectivité ? Notre équipe vous répond."
      />
      <section className="container grid gap-10 py-16 md:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <ContactItem icon={Mail} label="E-mail" value="contact@previsisme-caraibe.example" />
          <ContactItem icon={Phone} label="Téléphone" value="+596 (0)5 96 00 00 00" />
          <ContactItem icon={MapPin} label="Siège" value="Fort-de-France, Martinique" />
        </div>

        <Card>
          <CardContent className="p-6">
            {sent ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Merci, votre message a été enregistré (mode démonstration — aucun e-mail n&apos;est
                envoyé pour le moment).
              </p>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <Button type="submit">Envoyer</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Activity, Building2, Home, Landmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth, type DemoUser } from "@/lib/auth-store";

const MODES: { value: DemoUser["organizationMode"]; label: string; icon: typeof Home }[] = [
  { value: "famille", label: "Famille", icon: Home },
  { value: "entreprise", label: "Entreprise", icon: Building2 },
  { value: "collectivite", label: "Collectivité", icon: Landmark },
];

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isDemoAuth } = useAuth();
  const [email, setEmail] = React.useState("");
  const [mode, setMode] = React.useState<DemoUser["organizationMode"]>("famille");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    await signIn(email, mode);
    setIsSubmitting(false);
    router.push("/dashboard");
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </span>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            {isDemoAuth
              ? "Mode démonstration : aucune donnée n'est envoyée à un serveur externe."
              : "Connectez-vous avec votre adresse e-mail."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Mode d&apos;utilisation</Label>
              <div className="grid grid-cols-3 gap-2">
                {MODES.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMode(m.value)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors",
                      mode === m.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <m.icon className="h-4 w-4" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? "Connexion…" : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

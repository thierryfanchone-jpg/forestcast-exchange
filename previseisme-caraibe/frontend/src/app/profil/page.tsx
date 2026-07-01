"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-store";

export default function ProfilePage() {
  const { user, signOut, isDemoAuth } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) router.replace("/connexion");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="container flex max-w-2xl flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mon profil</h1>
        <p className="mt-1 text-muted-foreground">Gérez vos informations et vos préférences.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg">{user.displayName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.displayName}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="display-name">Nom affiché</Label>
            <Input id="display-name" defaultValue={user.displayName} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Langue</Label>
            <Select defaultValue={user.locale}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Mode d&apos;utilisation</Label>
            <Select defaultValue={user.organizationMode}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="famille">Famille</SelectItem>
                <SelectItem value="entreprise">Entreprise</SelectItem>
                <SelectItem value="collectivite">Collectivité</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isDemoAuth && (
            <p className="text-xs text-muted-foreground">
              Mode démonstration : ces informations sont stockées uniquement dans votre navigateur.
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <Button>Enregistrer</Button>
            <Button
              variant="outline"
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            >
              Se déconnecter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

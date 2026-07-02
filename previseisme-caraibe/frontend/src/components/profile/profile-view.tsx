"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useRouter } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/providers/auth-provider";

export function ProfileView() {
  const t = useTranslations("profile");
  const tNav = useTranslations("nav");
  const tAuth = useTranslations("auth");
  const { user, isLoading, updateProfile, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) router.replace("/connexion");
  }, [isLoading, user, router]);

  const [fullName, setFullName] = React.useState(user?.fullName ?? "");
  const [homeLocation, setHomeLocation] = React.useState(user?.homeLocation ?? "");
  const [alertThreshold, setAlertThreshold] = React.useState(user?.alertThreshold ?? 4);
  const [channels, setChannels] = React.useState(
    user?.channels ?? { email: true, sms: false, push: true },
  );

  React.useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setHomeLocation(user.homeLocation);
      setAlertThreshold(user.alertThreshold);
      setChannels(user.channels);
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const initials = fullName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function savePersonal() {
    updateProfile({ fullName, homeLocation });
    toast.success(t("saveChanges"));
  }

  function savePreferences() {
    updateProfile({ alertThreshold, channels });
    toast.success(t("saveChanges"));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="mt-8">
        <TabsList>
          <TabsTrigger value="personal">{t("personalInfo")}</TabsTrigger>
          <TabsTrigger value="preferences">{t("preferences")}</TabsTrigger>
          <TabsTrigger value="security">{t("security")}</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>{t("personalInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>{tAuth("fullName")}</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{t("homeLocation")}</Label>
                <Input value={homeLocation} onChange={(e) => setHomeLocation(e.target.value)} />
              </div>
              <Button onClick={savePersonal}>{t("saveChanges")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>{t("preferences")}</CardTitle>
              <CardDescription>{t("notificationChannels")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label>
                  {t("alertThreshold")} — M{alertThreshold.toFixed(1)}
                </Label>
                <input
                  type="range"
                  min={2.5}
                  max={7}
                  step={0.1}
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(Number(e.target.value))}
                  className="accent-primary w-full"
                />
              </div>

              <div className="space-y-3">
                <ChannelRow
                  label={t("channelEmail")}
                  checked={channels.email}
                  onChange={(v) => setChannels((c) => ({ ...c, email: v }))}
                />
                <ChannelRow
                  label={t("channelSms")}
                  checked={channels.sms}
                  onChange={(v) => setChannels((c) => ({ ...c, sms: v }))}
                />
                <ChannelRow
                  label={t("channelPush")}
                  checked={channels.push}
                  onChange={(v) => setChannels((c) => ({ ...c, push: v }))}
                />
              </div>

              <Button onClick={savePreferences}>{t("saveChanges")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t("security")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={logout}>
                {tNav("logout")}
              </Button>
              <div className="border-destructive/30 bg-destructive/5 rounded-lg border p-4">
                <p className="text-destructive text-sm font-medium">{t("deleteAccount")}</p>
                <Button variant="destructive" size="sm" className="mt-3">
                  <Trash2 className="size-4" /> {t("deleteAccount")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChannelRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

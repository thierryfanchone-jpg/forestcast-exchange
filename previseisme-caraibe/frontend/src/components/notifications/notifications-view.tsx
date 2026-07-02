"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { AlertTriangle, Info, ShieldAlert, CheckCheck } from "lucide-react";

import { useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/providers/auth-provider";
import { demoNotifications } from "@/lib/demo-data/notifications";
import { cn, formatDate } from "@/lib/utils";

const ICONS = { info: Info, warning: AlertTriangle, critical: ShieldAlert };
const ICON_STYLES = {
  info: "bg-primary/10 text-primary",
  warning: "bg-magnitude-high/15 text-magnitude-high",
  critical: "bg-destructive/15 text-destructive",
};

export function NotificationsView() {
  const t = useTranslations("notifications");
  const locale = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = React.useState(demoNotifications);

  React.useEffect(() => {
    if (!isLoading && !user) router.replace("/connexion");
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{t("subtitle")}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setNotifications((list) => list.map((n) => ({ ...n, read: true })))}
        >
          <CheckCheck className="size-4" /> {t("markAllRead")}
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {notifications.length === 0 && (
          <p className="text-muted-foreground py-10 text-center text-sm">{t("empty")}</p>
        )}
        {notifications.map((n) => {
          const Icon = ICONS[n.severity];
          return (
            <Card
              key={n.id}
              className={cn(
                "flex items-start gap-3 p-4",
                !n.read && "border-primary/40 bg-primary/[0.03]",
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  ICON_STYLES[n.severity],
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {!n.read && <span className="bg-primary size-2 shrink-0 rounded-full" />}
                </div>
                <p className="text-muted-foreground mt-1 text-sm">{n.message}</p>
                <p className="text-muted-foreground/70 mt-2 text-xs">
                  {formatDate(n.timeUtc, locale)}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

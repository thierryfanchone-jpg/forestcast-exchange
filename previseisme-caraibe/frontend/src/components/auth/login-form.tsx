"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { LogIn, Info } from "lucide-react";

import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { demoAccounts } from "@/lib/demo-data/users";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const t = useTranslations("auth");
  const { login } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: demoAccounts[0].email, password: demoAccounts[0].password },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const { error } = await login(values.email, values.password);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(t("loginTitle"));
    router.push("/tableau-de-bord");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("loginTitle")}</CardTitle>
        <CardDescription>{t("loginSubtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("password")}</Label>
              <button type="button" className="text-primary text-xs hover:underline">
                {t("forgotPassword")}
              </button>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-destructive text-xs">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            <LogIn className="size-4" /> {t("loginCta")}
          </Button>
        </form>

        <div className="bg-muted text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-xs">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <div>
            {t("demoNotice")}
            <button
              type="button"
              className="text-primary mt-1 block font-medium hover:underline"
              onClick={() => {
                setValue("email", demoAccounts[0].email);
                setValue("password", demoAccounts[0].password);
              }}
            >
              {demoAccounts[0].email} / {demoAccounts[0].password}
            </button>
          </div>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          {t("noAccount")}{" "}
          <Link href="/inscription" className="text-primary font-medium hover:underline">
            {t("signupCta")}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

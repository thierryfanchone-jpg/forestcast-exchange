"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <CheckCircle2 className="text-primary size-10" />
          <p className="text-muted-foreground text-sm">{t("success")}</p>
          <Button variant="outline" onClick={() => setSent(false)}>
            {t("submit")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t("name")}</Label>
              <Input {...register("name")} />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>{t("email")}</Label>
              <Input type="email" {...register("email")} />
              {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{t("organization")}</Label>
            <Input {...register("organization")} />
          </div>
          <div className="space-y-1.5">
            <Label>{t("subject")}</Label>
            <Input {...register("subject")} />
            {errors.subject && <p className="text-destructive text-xs">{errors.subject.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>{t("message")}</Label>
            <Textarea rows={5} {...register("message")} />
            {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            <Send className="size-4" /> {t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

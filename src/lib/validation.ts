import { z } from "zod";

export const auditInputSchema = z.object({
  original_question: z
    .string()
    .trim()
    .min(5, "Question trop courte")
    .max(5000, "Question trop longue"),
  ai_answer: z
    .string()
    .trim()
    .min(5, "Réponse trop courte")
    .max(20000, "Réponse trop longue"),
  report_language: z.enum(["fr", "en", "es"]).default("fr"),
});

export type AuditInput = z.infer<typeof auditInputSchema>;

export const checkoutSchema = z.object({
  product_type: z.enum(["starter", "pro", "unlimited"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

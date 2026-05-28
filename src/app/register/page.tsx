import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = { title: "Open an account" };

export default function RegisterPage() {
  return <AuthCard mode="register" />;
}

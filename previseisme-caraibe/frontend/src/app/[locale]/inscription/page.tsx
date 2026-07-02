import { setRequestLocale } from "next-intl/server";
import { SignupForm } from "@/components/auth/signup-form";

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <SignupForm />
    </div>
  );
}

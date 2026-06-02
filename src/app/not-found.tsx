import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page introuvable — 404",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400/10">
          <Zap className="h-10 w-10 text-yellow-400" fill="currentColor" />
        </div>
        <h1 className="mb-2 text-6xl font-extrabold text-yellow-400">404</h1>
        <h2 className="mb-4 text-2xl font-extrabold text-white">
          Page introuvable
        </h2>
        <p className="mb-8 text-gray-400">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Retour à l&apos;accueil
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

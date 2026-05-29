# TrustLayer AI

> Vérifie si une réponse IA est fiable avant de l'utiliser.

TrustLayer AI analyse les réponses générées par IA, détecte les risques,
vérifie les sources via une recherche web et attribue un **score de confiance
sur 100** accompagné d'une réponse corrigée et d'une recommandation claire.

## Sommaire

- [Stack technique](#stack-technique)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration Supabase](#configuration-supabase)
- [Configuration OAuth Google (et Apple)](#configuration-oauth-google-et-apple)
- [Configuration OpenAI & Tavily](#configuration-openai--tavily)
- [Configuration Stripe](#configuration-stripe)
- [Configuration PayPal](#configuration-paypal)
- [Configuration crypto](#configuration-crypto)
- [Lancement local](#lancement-local)
- [Déploiement Vercel](#déploiement-vercel)
- [Architecture du projet](#architecture-du-projet)

## Stack technique

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Supabase** — authentification (Google OAuth + magic link, Apple prévu) et base de données PostgreSQL
- **OpenAI** — analyse de fiabilité
- **Tavily** — recherche web et sources
- **Stripe / PayPal / Coinbase Commerce ou NOWPayments** — paiements
- **Zod** + **React Hook Form** — validation des formulaires
- **i18n** simple : Français (défaut), Anglais, Espagnol

> L'application fonctionne **même sans toutes les clés** : chaque service
> manquant affiche un message propre au lieu de provoquer une erreur bloquante.

## Fonctionnalités

- 2 audits gratuits par nouvel utilisateur, puis packs / abonnement.
- Score de confiance, niveau de risque, statut.
- Affirmations vérifiées / incertaines / risquées.
- Sources cliquables, réponse corrigée, recommandation finale.
- Tableau de bord avec crédits restants, plan et historique.
- Paiement carte (Stripe), PayPal et crypto.

## Installation

```bash
npm install
cp .env.example .env.local   # puis remplissez les variables
```

## Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com).
2. Dans **Project Settings → API**, récupérez :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (secret, serveur uniquement)
3. Dans **SQL Editor**, exécutez le contenu de [`supabase/schema.sql`](./supabase/schema.sql).
   Cela crée les tables `profiles`, `audits`, `payments`, active les **RLS**,
   les **policies** et un **trigger** qui crée automatiquement un profil avec
   **2 audits gratuits** à chaque inscription.

## Configuration OAuth Google (et Apple)

1. Dans la [Google Cloud Console](https://console.cloud.google.com), créez des
   identifiants **OAuth 2.0** (type *Web application*).
2. Ajoutez l'URL de redirection autorisée fournie par Supabase :
   `https://<votre-ref>.supabase.co/auth/v1/callback`.
3. Dans Supabase **Authentication → Providers → Google**, collez le `Client ID`
   et le `Client Secret`, puis activez le provider.
4. Dans **Authentication → URL Configuration**, ajoutez votre `Site URL`
   (`http://localhost:3000` en local) et l'URL de redirection
   `${NEXT_PUBLIC_APP_URL}/auth/callback`.

**Apple** : le code est déjà prêt (bouton « Continuer avec Apple » + provider
`apple` dans `signInWithOAuth`). Pour l'activer, configurez le provider Apple
dans Supabase avec un **Apple Developer Account** (Services ID, clé privée,
Team ID). Aucune modification de code n'est nécessaire.

**Magic link** : activé par défaut (`signInWithOtp`). Vérifiez que les emails
sont activés dans Supabase **Authentication → Providers → Email**.

## Configuration OpenAI & Tavily

- `OPENAI_API_KEY` — clé sur [platform.openai.com](https://platform.openai.com).
- `OPENAI_MODEL` — modèle utilisé (défaut `gpt-4o-mini`).
- `TAVILY_API_KEY` — clé sur [tavily.com](https://tavily.com). Optionnelle :
  sans elle, l'audit fonctionne mais sans sources web externes.

## Configuration Stripe

1. Récupérez `STRIPE_SECRET_KEY` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` dans le
   [dashboard Stripe](https://dashboard.stripe.com/apikeys).
2. (Optionnel) Créez 3 prix et renseignez `STRIPE_PRICE_STARTER`,
   `STRIPE_PRICE_PRO`, `STRIPE_PRICE_UNLIMITED`. Sans ces IDs, l'application
   crée les prix à la volée à partir de `NEXT_PUBLIC_PRICE_*`.
3. Créez un webhook pointant vers `${NEXT_PUBLIC_APP_URL}/api/webhooks/stripe`
   (événement `checkout.session.completed`) et copiez le secret dans
   `STRIPE_WEBHOOK_SECRET`.
4. En local : `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

## Configuration PayPal

1. Créez une application sur [developer.paypal.com](https://developer.paypal.com).
2. Renseignez `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` et `PAYPAL_ENV`
   (`sandbox` ou `live`).
3. Créez un webhook (`PAYMENT.CAPTURE.COMPLETED`) vers
   `${NEXT_PUBLIC_APP_URL}/api/webhooks/paypal` et copiez son ID dans
   `PAYPAL_WEBHOOK_ID`. La capture se fait aussi au retour utilisateur via
   `/api/checkout/paypal/capture`.

## Configuration crypto

Choisissez le fournisseur via `CRYPTO_PROVIDER` :

- **Coinbase Commerce** (`coinbase`) :
  - `COINBASE_COMMERCE_API_KEY`
  - `COINBASE_COMMERCE_WEBHOOK_SECRET`
  - Webhook (`charge:confirmed`) → `${NEXT_PUBLIC_APP_URL}/api/webhooks/crypto`
- **NOWPayments** (`nowpayments`) :
  - `NOWPAYMENTS_API_KEY`
  - `NOWPAYMENTS_IPN_SECRET`
  - IPN callback → `${NEXT_PUBLIC_APP_URL}/api/webhooks/crypto`

## Lancement local

```bash
npm run dev        # serveur de développement (http://localhost:3000)
npm run build      # build de production
npm run start      # serveur de production
npm run typecheck  # vérification TypeScript
npm run lint       # ESLint
```

## Déploiement Vercel

1. Importez le dépôt dans [Vercel](https://vercel.com).
2. Renseignez **toutes les variables d'environnement** (cf. `.env.example`)
   dans **Settings → Environment Variables**.
3. Mettez `NEXT_PUBLIC_APP_URL` à l'URL de production.
4. Mettez à jour les URLs de redirection (Supabase, OAuth) et les webhooks
   (Stripe, PayPal, crypto) avec l'URL de production.
5. Déployez — `vercel.json` configure le build Next.js.

## Architecture du projet

```
src/
  app/
    api/
      audit/                  # analyse d'une réponse IA
      checkout/{stripe,paypal,crypto}/
      webhooks/{stripe,paypal,crypto}/
    auth/callback/            # échange du code OAuth / magic link
    audit/ result/[id]/ dashboard/ pricing/ login/ account/ success/ cancel/
  components/                 # Header, Footer, AuditForm, ScoreGauge, …
  hooks/                      # useUser
  lib/
    supabase/                 # clients navigateur / serveur / middleware
    openai.ts tavily.ts       # IA & recherche
    stripe.ts paypal.ts crypto-pay.ts credits.ts
    env.ts pricing.ts validation.ts i18n.ts utils.ts
  locales/                    # fr.json, en.json, es.json
  types/
supabase/schema.sql           # tables + RLS + trigger
```

## Sécurité

- Aucune clé secrète n'est committée : tout passe par les variables
  d'environnement.
- **RLS** activé sur toutes les tables ; un utilisateur n'accède qu'à ses
  propres données.
- Les écritures de crédits/paiements passent par la **service role key**
  côté serveur uniquement (webhooks), avec idempotence sur les paiements.

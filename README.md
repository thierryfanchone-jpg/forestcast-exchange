# ORION ACADEMY

**Apprends. Entraîne-toi. Progresse.**

Plateforme de formation pratique avec coach IA pour développer ses compétences en communication, prise de parole, entretien d'embauche, pitch et leadership.

---

## Stack technique

| Technologie | Usage |
|---|---|
| Next.js 15 (App Router) | Framework frontend |
| TypeScript | Typage statique |
| Tailwind CSS | Styles et design system |
| Supabase | Auth + base de données PostgreSQL |
| Stripe | Paiements et abonnements |
| Claude API / OpenAI | Coach IA intelligent |
| Vercel | Déploiement |

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/thierryfanchone-jpg/forestcast-exchange.git
cd forestcast-exchange
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Remplis `.env.local` avec tes clés :

```env
# Supabase — https://app.supabase.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe — https://dashboard.stripe.com
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_EXPERT=price_...
STRIPE_PRICE_MONTHLY=price_...

# Coach IA — Anthropic (prioritaire) ou OpenAI (fallback)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Dans l'éditeur SQL de Supabase, exécute le fichier `supabase/schema.sql`
3. Active l'authentification Google dans Auth > Providers

### 4. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Structure du projet

```
src/
├── app/
│   ├── page.tsx                     # Page d'accueil (Hero, Modules, Coach IA, Tarifs, FAQ)
│   ├── formations/                  # Catalogue des formations
│   │   └── [slug]/page.tsx          # Page détail formation
│   ├── tarifs/page.tsx              # Page tarifs
│   ├── connexion/page.tsx           # Connexion (email + Google)
│   ├── inscription/page.tsx         # Inscription
│   ├── dashboard/                   # Espace membre (protégé)
│   │   ├── layout.tsx               # Layout dashboard avec sidebar
│   │   ├── page.tsx                 # Tableau de bord (scores, stats, badges)
│   │   ├── formations/page.tsx      # Mes formations + progression
│   │   │   └── [slug]/page.tsx      # Lecteur de cours avec leçons
│   │   ├── coach/page.tsx           # Coach IA chat (6 scénarios)
│   │   ├── simulation/page.tsx      # Simulation orale + analyse 7 critères
│   │   ├── certification/page.tsx   # Certifications Bronze/Argent/Or
│   │   └── passeport/page.tsx       # Passeport de compétences + badges
│   ├── api/
│   │   ├── create-checkout-session/ # POST — Stripe checkout
│   │   ├── stripe-webhook/          # POST — Webhooks Stripe
│   │   ├── ai-coach/                # POST — Coach IA (Claude/OpenAI)
│   │   └── generate-certificate/    # GET  — Certificat HTML/PDF
│   ├── mentions-legales/page.tsx
│   ├── cgv/page.tsx
│   ├── cgu/page.tsx
│   ├── confidentialite/page.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # Navigation responsive avec scroll-detection
│   │   ├── Footer.tsx               # Footer avec liens et réseaux sociaux
│   │   └── DashboardSidebar.tsx     # Sidebar dashboard (desktop + mobile)
│   ├── home/
│   │   └── FAQSection.tsx           # Accordion FAQ client component
│   └── ui/
│       ├── Button.tsx               # Bouton réutilisable (primary/secondary/outline)
│       ├── Badge.tsx                # Badge coloré (gold/blue/green/purple)
│       ├── Progress.tsx             # Barre de progression animée
│       └── ScoreRing.tsx            # Anneau SVG score circulaire
├── lib/
│   ├── supabase.ts                  # Client Supabase (navigateur)
│   ├── supabase-server.ts           # Client Supabase (serveur)
│   ├── stripe.ts                    # Client Stripe + IDs produits
│   ├── utils.ts                     # cn(), formatPrice(), formatDate()...
│   └── demo-data.ts                 # Données de démo (cours, offres, témoignages)
├── types/
│   └── index.ts                     # Tous les types TypeScript
└── middleware.ts                    # Garde routes /dashboard → /connexion
```

---

## Modules de formation

| Module | Catégorie | Niveau | Prix |
|---|---|---|---|
| **Orion Speak** | Prise de parole | Débutant | 79€ |
| **Orion Job** | Entretien d'embauche | Intermédiaire | 79€ |
| **Orion Pitch** | Pitch commercial | Intermédiaire | 79€ |
| **Orion Leader** | Leadership | Avancé | 99€ |
| **Orion Sales** | Vente & négociation | Avancé | 99€ |

---

## Offres tarifaires

| Offre | Prix | Contenu |
|---|---|---|
| Gratuit | 0€ | 3 simulations + 1 mini module |
| Starter | 29€ | 1 module + 10 simulations + certificat |
| Pro ⭐ | 79€ | 3 modules + 50 simulations + badges |
| Expert | 199€ | Tous modules + IA illimité + certification complète |
| Abonnement | 14,90€/mois | Nouveaux exercices + coach continu + défis |

---

## Certifications

| Niveau | Score |
|---|---|
| 🥉 Bronze | 60 – 74% |
| 🥈 Argent | 75 – 89% |
| 🥇 Or | 90 – 100% |

Chaque certificat : Nom · Score · Date · QR code vérifiable · Signature ORION ACADEMY

---

## Coach IA — Scénarios disponibles

- 💼 Entretien d'embauche
- 🙋 Présentation de soi
- 🚀 Pitch commercial
- 📊 Réunion professionnelle
- 🎯 Gestion du trac
- 🎤 Prise de parole publique

Le coach analyse : Score /10 · Points forts · Points faibles · Correction · Exercice suivant

---

## Déploiement sur Vercel

```bash
npm run build          # Vérification locale
vercel --prod          # Déploiement
```

Configure les variables d'environnement dans le dashboard Vercel.

### Stripe Webhook en local

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

---

## Commandes utiles

```bash
npm run dev           # Développement local
npm run build         # Build production
npm run typecheck     # Vérification TypeScript
npm run lint          # ESLint
```

---

## Roadmap

- [ ] Supabase Auth complète (email + Google OAuth)
- [ ] Vidéos de cours (Mux ou Cloudinary)
- [ ] Génération PDF certificats (@react-pdf/renderer)
- [ ] Emails transactionnels (Resend)
- [ ] Dashboard admin
- [ ] PWA / Application mobile

---

*ORION ACADEMY © 2025 — Tous droits réservés*

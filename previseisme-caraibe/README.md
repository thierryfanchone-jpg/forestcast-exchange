# PréviSéisme Caraïbe

Plateforme professionnelle de surveillance et de prévision de l'activité sismique dans l'arc des
Caraïbes — carte interactive en temps réel, recherche multicritère, historique, tableaux de bord
Famille / Entreprise / Collectivité, et API publique.

> Statut : socle applicatif complet (frontend + backend) fonctionnant en local avec des données de
> démonstration réalistes, et connecteurs prêts à recevoir les flux temps réel USGS, EMSC, IPGP et
> FDSN. Voir [`docs/previsisme-caraibe/`](../docs/previsisme-caraibe) à la racine du dépôt pour
> l'architecture cible complète (V2/V3, PostGIS, TimescaleDB, Kubernetes, IA, etc.).

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Tests, lint & build](#tests-lint--build)
- [Docker](#docker)
- [Internationalisation](#internationalisation)
- [Connecteurs de flux sismiques](#connecteurs-de-flux-sismiques)
- [Guides](#guides)

## Fonctionnalités

- Page d'accueil premium avec activité sismique en direct, présentation des modes d'usage
  (Famille / Entreprise / Collectivité) et statistiques clés.
- Carte mondiale et carte des Caraïbes interactives (MapLibre GL), avec légende par magnitude,
  filtres de période et fiches d'événements.
- Recherche avancée par pays, ville et magnitude.
- Historique sismique avec statistiques et graphiques (par année, pays, magnitude).
- Tableau de bord utilisateur (alertes actives, sites surveillés, état des sources, activité
  hebdomadaire).
- Authentification (connexion / inscription / profil) — bascule automatiquement sur Supabase si
  configuré, sinon fonctionne en mode démonstration local.
- Centre de notifications, page Entreprises, page Collectivités, portail API développeurs, page
  Contact, page À propos, Centre d'aide et FAQ.
- Mode sombre / clair / système.
- Interface en français par défaut, prête pour l'anglais et l'espagnol (next-intl).
- Backend FastAPI avec connecteurs USGS / EMSC / IPGP / FDSN et repli automatique sur des données
  de démonstration réalistes lorsque les flux externes sont indisponibles.

## Stack technique

**Frontend**
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix + CVA) ·
Framer Motion · MapLibre GL · TanStack React Query · next-intl · next-themes · Supabase JS ·
React Hook Form + Zod · Recharts · Vitest.

**Backend**
FastAPI · Pydantic v2 · httpx · Uvicorn · pytest · ruff.

**Infrastructure**
Docker & Docker Compose · PostgreSQL/PostGIS · Redis.

## Structure du projet

```
previseisme-caraibe/
├── frontend/               # Application Next.js 15
│   ├── src/app/[locale]/   # Pages (routing internationalisé fr/en/es)
│   ├── src/components/     # Composants réutilisables (ui/, layout/, home/, map/, ...)
│   ├── src/lib/            # Types, données de démonstration, client API, utils
│   ├── src/i18n/           # Configuration next-intl
│   └── messages/           # Dictionnaires de traduction (fr.json, en.json, es.json)
├── backend/                 # API FastAPI
│   ├── app/routers/         # Endpoints (events, sources, auth, felt-reports, health)
│   ├── app/connectors/      # Connecteurs USGS, EMSC, IPGP, FDSN + données de démonstration
│   ├── app/services/        # Agrégation multi-sources, dé-duplication
│   └── tests/                # Suite de tests pytest
└── docker-compose.yml        # Frontend + backend + PostgreSQL/PostGIS + Redis
```

## Démarrage rapide

### Prérequis

- Node.js 20+
- Python 3.11+
- (Optionnel) Docker & Docker Compose pour l'exécution conteneurisée

### 1. Frontend

```bash
cd previseisme-caraibe/frontend
cp .env.example .env.local
npm install
npm run dev
```

L'application est disponible sur **http://localhost:3000**.

### 2. Backend (optionnel — le frontend fonctionne avec des données de démonstration sans backend)

```bash
cd previseisme-caraibe/backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

L'API est disponible sur **http://localhost:8000** (documentation interactive sur `/docs`).

Pour connecter le frontend au backend local, renseignez dans `frontend/.env.local` :

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
```

## Variables d'environnement

Voir [`.env.example`](./.env.example) à la racine (vue d'ensemble), ainsi que
[`frontend/.env.example`](./frontend/.env.example) et [`backend/.env.example`](./backend/.env.example)
pour le détail par service.

| Variable | Service | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | frontend | URL de base de l'API backend |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | frontend | Optionnel — active l'authentification Supabase réelle |
| `DATABASE_URL` | backend | Connexion PostgreSQL/PostGIS |
| `REDIS_URL` | backend | Connexion Redis (cache / pub-sub temps réel) |
| `JWT_SECRET`, `JWT_ALGORITHM`, `JWT_EXPIRES_MINUTES` | backend | Authentification API |
| `USGS_BASE_URL`, `EMSC_BASE_URL`, `IPGP_BASE_URL`, `FDSN_BASE_URL` | backend | Points d'accès des flux sismiques |

## Scripts disponibles

**Frontend** (`previseisme-caraibe/frontend`)

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarre le build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run format` / `format:check` | Prettier |
| `npm run test` | Tests unitaires (Vitest) |

**Backend** (`previseisme-caraibe/backend`)

| Commande | Description |
| --- | --- |
| `uvicorn app.main:app --reload` | Serveur de développement |
| `pytest` | Suite de tests |
| `ruff check app tests` | Lint |

## Tests, lint & build

```bash
# Frontend
cd previseisme-caraibe/frontend
npm run lint && npm run typecheck && npm run test && npm run build

# Backend
cd previseisme-caraibe/backend
source .venv/bin/activate
ruff check app tests && pytest
```

## Docker

Un `docker-compose.yml` à la racine du projet démarre l'ensemble de la stack (frontend, backend,
PostgreSQL/PostGIS, Redis) :

```bash
cd previseisme-caraibe
docker compose up --build
```

- Frontend : http://localhost:3000
- Backend : http://localhost:8000/docs
- PostgreSQL : localhost:5432
- Redis : localhost:6379

## Internationalisation

Le routing est internationalisé via `next-intl` (`fr` par défaut, `en` et `es` disponibles), avec
un sélecteur de langue dans la barre de navigation. Les dictionnaires se trouvent dans
`frontend/messages/`. Pour ajouter une langue : dupliquer `fr.json`, traduire les clés, puis
l'ajouter à `frontend/src/i18n/routing.ts`.

## Connecteurs de flux sismiques

Le backend expose une interface commune (`app/connectors/base.py`) implémentée pour :

- **USGS** — FDSNWS Event (format GeoJSON)
- **EMSC** — Seismic Portal FDSNWS Event (format JSON)
- **IPGP** — FDSNWS Event, réseau Antilles (format texte)
- **FDSN** — nœud générique du réseau international (référence IRIS, format texte)

L'agrégateur (`app/services/aggregator.py`) interroge les quatre sources en parallèle, dé-duplique
les événements proches (temps, position, magnitude) et **retombe automatiquement sur un jeu de
données de démonstration réaliste** si aucune source externe n'est joignable — l'API et
l'application restent donc toujours fonctionnelles, y compris hors-ligne ou avant la mise en place
définitive de la persistance (PostgreSQL/PostGIS/TimescaleDB, voir `docs/previsisme-caraibe/`).

## Guides

- [Guide d'installation détaillé](./INSTALL.md)
- [Guide de déploiement](./DEPLOYMENT.md)
- [Architecture cible complète](../docs/previsisme-caraibe/README.md)

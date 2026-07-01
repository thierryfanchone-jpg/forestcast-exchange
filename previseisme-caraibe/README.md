# PréviSéisme Caraïbe

Plateforme professionnelle d'information sismique pour les Caraïbes — carte mondiale et régionale,
alertes, historique, mode Entreprise/Collectivité, API publique. Les données proviennent
exclusivement de sources scientifiques officielles (USGS, EMSC, IPGP/OVSM, standard FDSN) : **cette
application n'invente jamais de donnée sismique**.

> Ce projet est un livrable fonctionnel de démarrage (V1), pensé pour évoluer selon la feuille de
> route décrite dans [`docs/previsisme-caraibe/`](../docs/previsisme-caraibe/README.md) (architecture
> complète, modèle de données, plan projet, trajectoire vers l'alerte précoce).

## Stack technique

| Couche | Technologies |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, composants shadcn/ui, Framer Motion, MapLibre GL (`react-map-gl`), TanStack Query, Recharts |
| Backend | FastAPI (Python 3.12), Pydantic v2, httpx, SQLAlchemy (async) |
| Données | PostgreSQL + PostGIS, Redis |
| Auth | Supabase (optionnel) — mode démonstration intégré si non configuré |
| Infra | Docker, Docker Compose |
| Qualité | ESLint, Prettier, TypeScript strict, Vitest (frontend) · Ruff, Pytest (backend) |

## Structure du projet

```
previseisme-caraibe/
├── frontend/          # Application Next.js (Android/iOS via wrapper web, Web natif)
├── backend/           # API FastAPI + connecteurs USGS/EMSC/IPGP/FDSN
├── docker-compose.yml # Orchestration frontend + backend + PostgreSQL/PostGIS + Redis
├── .env.example
├── INSTALLATION.md
└── DEPLOYMENT.md
```

## Démarrage rapide (sans Docker)

```bash
# 1. Backend
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000

# 2. Frontend (dans un autre terminal)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Le site est disponible sur **http://localhost:3000**, l'API sur **http://localhost:8000** (documentation
interactive sur `/docs`).

Sans configuration supplémentaire, le frontend fonctionne en **mode démonstration** : données
sismiques réalistes d'exemple, authentification simulée localement. Voir [INSTALLATION.md](INSTALLATION.md)
pour connecter un vrai backend, une base Supabase, ou une clé de style de carte.

## Démarrage rapide (avec Docker Compose)

```bash
docker compose up --build
```

Démarre PostgreSQL/PostGIS, Redis, le backend FastAPI et le frontend Next.js. Voir
[DEPLOYMENT.md](DEPLOYMENT.md) pour le déploiement en production.

## Scripts disponibles

### Frontend (`frontend/`)

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Démarre le build de production |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run format` / `npm run format:check` | Prettier |
| `npm run typecheck` | Vérification TypeScript |
| `npm run test` | Tests unitaires (Vitest) |

### Backend (`backend/`)

| Commande | Effet |
|---|---|
| `uvicorn app.main:app --reload` | Serveur de développement |
| `pytest` | Tests unitaires |
| `ruff check .` | Lint |

## Principe fondateur : aucune donnée inventée

Chaque événement affiché cite ses sources (`contributing_sources`) et son indice de confiance. Quand
aucune source réelle n'est accessible (pas de connexion réseau sortante, IPGP non encore partenaire),
l'application bascule explicitement sur des données de démonstration **clairement signalées comme
telles** (bannière visible), plutôt que d'afficher un état vide ou une donnée fabriquée sans le dire.

## Connecteurs de sources sismiques

| Source | Statut dans ce projet | Détails |
|---|---|---|
| **USGS** | Implémenté (FDSN GeoJSON feed) | `backend/app/connectors/usgs.py` |
| **EMSC** | Implémenté (FDSN REST, fallback du flux WebSocket temps réel) | `backend/app/connectors/emsc.py` |
| **IPGP / OVSM** | Point d'extension prêt, en attente de partenariat formel | `backend/app/connectors/ipgp.py` |
| **FDSN générique** | Connecteur réutilisable pour tout observatoire national | `backend/app/connectors/fdsn_generic.py` |

Voir [`docs/previsisme-caraibe/03-integration-sources-sismiques.md`](../docs/previsisme-caraibe/03-integration-sources-sismiques.md)
pour l'architecture complète d'intégration et d'extensibilité multi-pays.

## Documentation complémentaire

- [INSTALLATION.md](INSTALLATION.md) — guide d'installation détaillé
- [DEPLOYMENT.md](DEPLOYMENT.md) — guide de déploiement (Docker, cloud)
- [`docs/previsisme-caraibe/`](../docs/previsisme-caraibe/README.md) — architecture complète, schéma de
  base de données, diagrammes UML, spécifications API, plan projet

## Avertissement

PréviSéisme Caraïbe est une plateforme d'**information** sismique. Ce n'est pas, à ce stade, un
système d'alerte précoce (EEW) certifié, et elle ne se substitue jamais aux autorités de sécurité
civile compétentes. Voir [`docs/previsisme-caraibe/11-trajectoire-alerte-precoce.md`](../docs/previsisme-caraibe/11-trajectoire-alerte-precoce.md).

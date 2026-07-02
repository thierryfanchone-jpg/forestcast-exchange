# Guide de déploiement — PréviSéisme Caraïbe

## 1. Vue d'ensemble

Le projet est composé de deux services indépendants, déployables séparément :

- `frontend/` — application Next.js 15 (peut être déployée sur Vercel, un serveur Node, ou en
  conteneur Docker via sortie `standalone`).
- `backend/` — API FastAPI (déployable en conteneur Docker sur tout orchestrateur : Kubernetes,
  ECS, Cloud Run, OVHcloud Managed Kubernetes, etc. — voir l'architecture cible dans
  `docs/previsisme-caraibe/02-architecture-systeme.md`).

## 2. Déploiement du frontend

### Option A — Vercel (recommandé pour un déploiement rapide)

1. Importez le dépôt dans Vercel en pointant le **Root Directory** sur `previseisme-caraibe/frontend`.
2. Renseignez les variables d'environnement (`NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) dans les paramètres du projet Vercel.
3. Build command : `npm run build` — Output : automatique (Next.js détecté nativement).

### Option B — Conteneur Docker

```bash
cd previseisme-caraibe/frontend
docker build -t previseisme-caraibe-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.previseisme-caraibe.org/v1 \
  previseisme-caraibe-frontend
```

Le `Dockerfile` utilise la sortie `standalone` de Next.js pour une image de production minimale.

## 3. Déploiement du backend

### Conteneur Docker

```bash
cd previseisme-caraibe/backend
docker build -t previseisme-caraibe-backend .
docker run -p 8000:8000 \
  -e DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/db \
  -e REDIS_URL=redis://host:6379/0 \
  -e CORS_ORIGINS='["https://previseisme-caraibe.org"]' \
  -e JWT_SECRET=<secret-fort> \
  previseisme-caraibe-backend
```

Le conteneur expose un `HEALTHCHECK` sur `/health`, utilisable par tout orchestrateur pour les
sondes de disponibilité (liveness/readiness).

### Recommandations production

- Placez le backend derrière une passerelle API (Kong / Traefik) pour la limitation de débit et
  l'authentification centralisée (voir doc d'architecture).
- Provisionnez PostgreSQL avec l'extension **PostGIS** (et **TimescaleDB** pour les séries
  temporelles de capteurs en V3).
- Configurez `JWT_SECRET` avec une valeur forte générée aléatoirement (jamais la valeur par défaut).
- Restreignez `CORS_ORIGINS` au(x) domaine(s) réel(s) du frontend.

## 4. Déploiement combiné avec Docker Compose

Pour un environnement de démonstration ou de pré-production simple :

```bash
cd previseisme-caraibe
docker compose -f docker-compose.yml up -d --build
```

Pour la production, il est recommandé de :

- Externaliser PostgreSQL et Redis vers des services managés,
- Ajouter un reverse proxy TLS (Traefik, Caddy, ou un load balancer cloud) devant `frontend` et
  `backend`,
- Mettre en place CI/CD (GitHub Actions) pour builder et pousser les images vers un registre, puis
  déployer automatiquement (voir `docs/previsisme-caraibe/10-plan-projet.md`).

## 5. Variables d'environnement en production

Ne jamais committer de secrets réels. Utilisez le gestionnaire de secrets de votre plateforme
(Vercel Environment Variables, Kubernetes Secrets, AWS Secrets Manager, etc.) et référez-vous à
[`./.env.example`](./.env.example) pour la liste complète des variables attendues.

## 6. Bascule des connecteurs sismiques vers la production

Les URLs des connecteurs (`USGS_BASE_URL`, `EMSC_BASE_URL`, `IPGP_BASE_URL`, `FDSN_BASE_URL`)
pointent par défaut vers les services publics réels. Aucune clé d'API n'est requise pour ces
sources publiques ; en cas d'indisponibilité temporaire, l'API continue de répondre grâce au repli
automatique sur les données de démonstration (voir `backend/app/services/aggregator.py`).

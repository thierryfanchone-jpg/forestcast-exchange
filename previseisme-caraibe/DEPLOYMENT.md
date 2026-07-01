# Guide de déploiement

## Option A — Docker Compose (VM unique / petit déploiement)

```bash
docker compose -f docker-compose.yml up -d --build
```

Adapté à une démonstration ou un déploiement à faible échelle. Pour la production, séparez les
services sur des ressources managées (voir Option B) et ne stockez jamais de secrets dans le dépôt.

## Option B — Déploiement cloud découplé (recommandé en production)

Conformément à l'architecture cible documentée dans
[`docs/previsisme-caraibe/02-architecture-systeme.md`](../docs/previsisme-caraibe/02-architecture-systeme.md) :

1. **Frontend (Next.js)** : déployer sur Vercel, ou en conteneur (`frontend/Dockerfile`) derrière un
   CDN, sur Kubernetes (OVHcloud Managed Kubernetes ou AWS EKS).
2. **Backend (FastAPI)** : conteneur (`backend/Dockerfile`) sur Kubernetes ou un service de
   conteneurs managé (AWS ECS/Fargate, OVHcloud Managed Kubernetes).
3. **Base de données** : PostgreSQL managé avec extension PostGIS (AWS RDS, OVHcloud Managed
   Database) — ne pas utiliser le conteneur `postgres` du `docker-compose.yml` en production.
4. **Cache/Files** : Redis managé (AWS ElastiCache, OVHcloud Managed Redis).
5. **Authentification** : projet Supabase dédié par environnement (staging/production), avec
   politiques RLS configurées.

### Variables d'environnement en production

| Variable | Frontend/Backend | Remarque |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Frontend | URL publique HTTPS du backend |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Frontend | Projet Supabase de production |
| `NEXT_PUBLIC_MAP_STYLE_URL` | Frontend | Style de carte avec clé API valide (MapTiler/Mapbox) |
| `CORS_ORIGINS` | Backend | Domaines autorisés uniquement (pas de wildcard) |
| `DATABASE_URL` | Backend | Connexion chiffrée (TLS) vers PostgreSQL managé |
| `USE_DEMO_DATA_FALLBACK` | Backend | `false` recommandé en production une fois les connecteurs validés en continu |

**Ne jamais commiter de fichier `.env` réel.** Utilisez un gestionnaire de secrets (AWS Secrets
Manager, OVH KMS, ou les variables d'environnement chiffrées de la plateforme d'hébergement).

## Build et vérifications avant déploiement

```bash
# Frontend
cd frontend
npm ci
npm run lint
npm run typecheck
npm run test
npm run build

# Backend
cd backend
pip install -r requirements-dev.txt
ruff check .
pytest
```

## CI/CD (recommandation)

Pipeline minimal (GitHub Actions ou équivalent) :

1. `lint` + `typecheck` + `test` (frontend et backend, en parallèle)
2. `build` (image Docker frontend et backend)
3. Scan de sécurité des images (Trivy) et des dépendances (npm audit / pip-audit)
4. Déploiement automatique sur environnement de staging après succès sur `main`
5. Déploiement en production après validation manuelle

Voir [`docs/previsisme-caraibe/09-securite-fiabilite.md`](../docs/previsisme-caraibe/09-securite-fiabilite.md)
pour les exigences complètes de sécurité, haute disponibilité et sauvegarde attendues en production.

## Rollback

- Frontend : redéploiement de l'artefact/image précédent (déploiements immuables).
- Backend : redéploiement de l'image Docker précédente ; les migrations de base de données doivent
  être rétro-compatibles au moins une version en arrière.
- Base de données : restauration depuis sauvegarde continue (WAL) — voir doc 09 §9.5.

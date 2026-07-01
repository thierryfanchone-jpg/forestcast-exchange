# Guide d'installation

## Prérequis

- Node.js ≥ 20
- Python ≥ 3.11 (3.12 recommandé)
- Docker et Docker Compose (optionnel, pour l'installation « tout-en-un »)

## 1. Cloner et se placer dans le projet

```bash
cd previseisme-caraibe
```

## 2. Installation du backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows : .venv\Scripts\activate
pip install -r requirements-dev.txt
cp .env.example .env
```

Variables importantes dans `backend/.env` :

- `USE_DEMO_DATA_FALLBACK=true` — garde le mode démonstration actif si les sources externes
  (USGS/EMSC) sont injoignables (pare-feu, réseau restreint). Mettre à `false` en production une fois
  la connectivité sortante validée.
- `IPGP_BASE_URL` — à renseigner uniquement après formalisation d'un partenariat avec l'IPGP/OVSM
  (voir `docs/previsisme-caraibe/11-trajectoire-alerte-precoce.md`).
- `DATABASE_URL` / `REDIS_URL` — à ajuster si vous n'utilisez pas les valeurs par défaut de
  `docker-compose.yml`.

Lancer le serveur :

```bash
uvicorn app.main:app --reload --port 8000
```

Vérifier : http://localhost:8000/docs (documentation interactive Swagger).

## 3. Installation du frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Le site est disponible sur **http://localhost:3000**.

Variables importantes dans `frontend/.env.local` :

- `NEXT_PUBLIC_API_URL` — laisser vide pour rester en mode démonstration (aucun backend requis) ou
  pointer vers `http://localhost:8000` pour utiliser l'API réelle.
- `NEXT_PUBLIC_MAP_STYLE_URL` — style de carte MapLibre. Le style par défaut (`demotiles`) est
  gratuit mais limité ; pour la production, utilisez une clé MapTiler/Mapbox/Stadia Maps.
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — laissez vide pour une authentification
  simulée localement (aucune donnée envoyée à un tiers), ou renseignez un projet Supabase réel pour
  une authentification persistante.

## 4. Installation « tout-en-un » avec Docker Compose

```bash
docker compose up --build
```

Démarre PostgreSQL/PostGIS, Redis, le backend (port 8000) et le frontend (port 3000).

## 5. Vérifications

```bash
# Backend
cd backend && source .venv/bin/activate
pytest
ruff check .

# Frontend
cd frontend
npm run typecheck
npm run lint
npm run build
npm run test
```

## Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| La carte n'affiche aucun fond de carte | `NEXT_PUBLIC_MAP_STYLE_URL` injoignable (réseau restreint) | Utiliser un style MapTiler/Mapbox avec clé API, ou un style auto-hébergé |
| Les événements affichés sont toujours les mêmes exemples | Mode démonstration actif (normal sans backend connecté) | Configurer `NEXT_PUBLIC_API_URL` vers un backend actif et accessible |
| Le backend ne récupère aucune donnée USGS/EMSC réelle | Pare-feu sortant bloquant les domaines externes | Vérifier la connectivité sortante ; le fallback démo reste actif automatiquement |
| Erreur de connexion PostgreSQL | Service `postgres` non démarré ou `DATABASE_URL` incorrect | Vérifier `docker compose ps` ou lancer PostgreSQL localement |

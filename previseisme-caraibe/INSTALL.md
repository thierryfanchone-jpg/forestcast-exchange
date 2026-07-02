# Guide d'installation — PréviSéisme Caraïbe

Ce guide détaille l'installation complète du projet en local, avec ou sans Docker.

## 1. Prérequis

| Outil | Version recommandée |
| --- | --- |
| Node.js | 20.x |
| npm | 10.x |
| Python | 3.11+ |
| Docker & Docker Compose | dernière version stable (optionnel) |

## 2. Récupérer le projet

Le projet vit dans le sous-dossier `previseisme-caraibe/` du dépôt.

```bash
cd previseisme-caraibe
```

## 3. Installation sans Docker (développement quotidien)

### 3.1 Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Ouvrez http://localhost:3000. L'application fonctionne immédiatement avec des données de
démonstration réalistes, sans configuration supplémentaire.

### 3.2 Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows : .venv\Scripts\activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Ouvrez http://localhost:8000/docs pour la documentation interactive (Swagger UI).

### 3.3 Connecter le frontend au backend

Dans `frontend/.env.local` :

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
```

Redémarrez `npm run dev`. Si le backend est indisponible, le frontend continue de fonctionner
grâce à ses données de démonstration intégrées (voir `frontend/src/lib/api/client.ts`).

## 4. Installation avec Docker Compose (stack complète)

```bash
cd previseisme-caraibe
cp .env.example .env   # optionnel, valeurs par défaut fonctionnelles
docker compose up --build
```

Services démarrés :

- `frontend` — http://localhost:3000
- `backend` — http://localhost:8000
- `postgres` (PostGIS) — localhost:5432
- `redis` — localhost:6379

Arrêt :

```bash
docker compose down
```

Arrêt avec suppression des volumes (réinitialise la base de données) :

```bash
docker compose down -v
```

## 5. Authentification

Par défaut, aucune instance Supabase n'est configurée : l'application utilise un fournisseur
d'authentification de démonstration qui stocke la session dans le `localStorage` du navigateur.
Trois comptes de démonstration sont disponibles (voir
`frontend/src/lib/demo-data/users.ts`), par exemple :

```
email: camille@example.com
mot de passe: demo1234
```

Pour activer une authentification Supabase réelle, renseignez dans `frontend/.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=https://<votre-projet>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<votre-clé-anon>
```

## 6. Vérification de l'installation

```bash
# Frontend
cd frontend && npm run lint && npm run typecheck && npm run test && npm run build

# Backend
cd backend && source .venv/bin/activate && ruff check app tests && pytest
```

Si toutes ces commandes se terminent sans erreur, l'installation est correcte.

## 7. Problèmes fréquents

- **Port 3000/8000 déjà utilisé** : changez le port avec `npm run dev -- -p 3001` (frontend) ou
  `uvicorn app.main:app --reload --port 8001` (backend).
- **Erreur MapLibre / carte vide** : la carte nécessite un accès réseau sortant pour charger les
  tuiles vectorielles ; vérifiez votre connectivité ou votre pare-feu.
- **`npm install` échoue sur les paquets natifs** : assurez-vous d'utiliser Node.js 20+.

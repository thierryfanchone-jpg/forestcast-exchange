# 02 — Architecture système

## 2.1 Vue C4 — Niveau 1 : Contexte

```mermaid
C4Context
title PréviSéisme Caraïbe — Contexte système

Person(public, "Utilisateur Famille", "Grand public, alertes proches de chez soi")
Person(entreprise, "Utilisateur Entreprise", "Gestion de sites, seuils d'alerte")
Person(collectivite, "Utilisateur Collectivité", "Sécurité civile locale, communication de crise")
Person(admin, "Administrateur plateforme", "Supervision, qualité des données")

System(pvs, "PréviSéisme Caraïbe", "Plateforme d'information et d'alerte sismique")

System_Ext(usgs, "USGS", "FDSN / GeoJSON Feed")
System_Ext(emsc, "EMSC", "Flux temps réel (WebSocket/REST)")
System_Ext(ipgp, "IPGP / OVSM", "Observatoire volcanologique et sismologique de Martinique")
System_Ext(fdsn, "Réseaux FDSN nationaux", "Standard mondial, extensible par pays")
System_Ext(push, "APNs / FCM", "Notifications push")
System_Ext(auth, "Fournisseur d'identité", "OAuth2 / OIDC")

Rel(public, pvs, "Consulte carte, reçoit alertes")
Rel(entreprise, pvs, "Gère sites, exporte rapports")
Rel(collectivite, pvs, "Pilote tableau de bord de crise")
Rel(admin, pvs, "Supervise qualité des flux")

Rel(pvs, usgs, "Ingestion GeoJSON/FDSN", "HTTPS/REST")
Rel(pvs, emsc, "Ingestion temps réel", "HTTPS/WebSocket")
Rel(pvs, ipgp, "Ingestion régionale Caraïbes", "HTTPS/REST")
Rel(pvs, fdsn, "Ingestion extensible multi-pays", "FDSN-WS")
Rel(pvs, push, "Envoi de notifications", "HTTPS")
Rel(pvs, auth, "Authentification", "OAuth2/OIDC")
```

**Principe clé** : la plateforme n'est jamais elle-même une "source" de données sismiques officielles — elle est un agrégateur, un moteur de fusion/qualité, et un canal de diffusion.

## 2.2 Vue C4 — Niveau 2 : Conteneurs

```mermaid
C4Container
title PréviSéisme Caraïbe — Conteneurs

Person(user, "Utilisateurs", "Famille / Entreprise / Collectivité")

Container(mobile, "App Mobile", "Flutter (Android/iOS)", "Carte, alertes, mode hors ligne")
Container(web, "App Web", "Flutter Web / Next.js SSR pour SEO public", "Carte, tableaux de bord")
Container(bff, "API Gateway / BFF", "FastAPI + Kong/Traefik", "Auth, rate limiting, agrégation")
Container(api, "API Core", "FastAPI (Python 3.12, async)", "REST + GraphQL, logique métier")
Container(ws, "Service temps réel", "FastAPI + WebSocket / Redis Pub/Sub", "Diffusion instantanée des événements")
Container(ingest, "Service d'ingestion", "Python, Celery/Arq workers", "Collecte, normalise, fusionne les flux sismiques")
Container(fusion, "Moteur de fusion & confiance", "Python, règles + ML léger", "Dédoublonnage multi-agences, score de confiance")
Container(ai, "Service IA", "Python, orchestrateur LLM + RAG", "Explication, résumé, Q&A, rapports")
Container(notif, "Service de notification", "Python, FCM/APNs SDK", "Push ciblé par zone/règle")
ContainerDb(pg, "PostgreSQL + PostGIS", "RDS/OVH Managed DB", "Données métier, géospatiales")
ContainerDb(redis, "Redis", "Cache + Pub/Sub + files", "Cache carte, sessions, jobs")
ContainerDb(ts, "TimescaleDB (extension PG)", "Séries temporelles", "Historique métriques, latences, capteurs V3")
Container(objstore, "Stockage objet", "S3 / OVH Object Storage", "Exports PDF/Excel, rapports IA, logs archivés")

Rel(user, mobile, "Utilise")
Rel(user, web, "Utilise")
Rel(mobile, bff, "HTTPS/REST, GraphQL, WSS", "TLS 1.3")
Rel(web, bff, "HTTPS/REST, GraphQL, WSS", "TLS 1.3")
Rel(bff, api, "gRPC/HTTP interne")
Rel(bff, ws, "Upgrade WebSocket")
Rel(api, pg, "SQL/PostGIS")
Rel(api, redis, "Cache")
Rel(ingest, pg, "Écrit événements normalisés")
Rel(ingest, fusion, "Envoie événements bruts")
Rel(fusion, pg, "Écrit événements fusionnés + confiance")
Rel(fusion, redis, "Publie sur canal Pub/Sub")
Rel(ws, redis, "S'abonne au canal Pub/Sub")
Rel(ws, mobile, "Push temps réel WSS")
Rel(notif, redis, "Consomme file de notifications")
Rel(ai, pg, "Lecture données sismiques (RAG grounding)")
Rel(api, objstore, "Génère exports")
```

## 2.3 Vue C4 — Niveau 3 : Composants du Service d'ingestion (exemple)

```mermaid
flowchart TB
    subgraph Ingestion["Service d'ingestion (V1)"]
        SCHED[Scheduler / Cron\nApscheduler ou Celery Beat]
        POLL_USGS[Connecteur USGS\nGeoJSON polling 15-60s]
        POLL_EMSC[Connecteur EMSC\nWebSocket temps réel + fallback REST]
        POLL_IPGP[Connecteur IPGP/OVSM\nREST / flux régional]
        POLL_FDSN[Connecteur FDSN générique\nFDSN-WS event]
        NORM[Normalisateur\nMapping vers modèle canonique]
        VALID[Validateur\nSchéma, plage de valeurs, géométrie]
        QUEUE[File d'événements bruts\nRedis Stream / Kafka]
    end
    SCHED --> POLL_USGS
    SCHED --> POLL_EMSC
    SCHED --> POLL_IPGP
    SCHED --> POLL_FDSN
    POLL_USGS --> NORM
    POLL_EMSC --> NORM
    POLL_IPGP --> NORM
    POLL_FDSN --> NORM
    NORM --> VALID
    VALID --> QUEUE
    QUEUE --> FUSION[Moteur de fusion & confiance]
```

## 2.4 Stack technique recommandée

| Couche | Technologie | Justification |
|---|---|---|
| Mobile/Web client | **Flutter 3.x** (Dart) | Un seul code pour Android/iOS/Web, performances natives, riche écosystème carte (`flutter_map`, `mapbox_gl`) |
| Rendu carte | MapLibre GL / Mapbox GL, tuiles vectorielles | Perf sur mobile, 3D en V3 (tilt, extrusion) |
| API Gateway | **Kong** ou **Traefik** | Rate limiting, auth centralisée, observabilité |
| Backend applicatif | **FastAPI** (Python 3.12, ASGI, Pydantic v2) | Async natif, perf proche de Node, typage fort, OpenAPI auto-généré |
| Workers asynchrones | **Celery** ou **Arq** + Redis | Ingestion planifiée, notifications, exports |
| Base de données | **PostgreSQL 16 + PostGIS 3.4** | Requêtes géospatiales (rayon, polygones de zones), standard éprouvé |
| Séries temporelles | **TimescaleDB** (extension PG) | Historique métriques capteurs, latences (V3) |
| Cache / Pub-Sub / files | **Redis 7** (Cluster) | Cache carte, diffusion temps réel, files de jobs |
| Temps réel | **WebSocket** (FastAPI + `redis pub/sub` ou NATS) | Latence faible pour la diffusion d'alertes |
| API publique | **REST** (OpenAPI 3.1) + **GraphQL** (Strawberry/Ariadne) | REST pour intégrations simples, GraphQL pour tableaux de bord riches |
| Authentification | **OAuth2 / OIDC** (Keycloak auto-hébergé ou AWS Cognito) + **JWT** courte durée + refresh tokens rotatifs | Standard, SSO entreprise possible |
| Conteneurisation | **Docker** + **Kubernetes** (EKS ou OVHcloud Managed Kubernetes) | Scalabilité, résilience multi-zone |
| IaC | **Terraform** + **Helm** | Reproductibilité, revue de code sur l'infra |
| CI/CD | **GitHub Actions** (build, tests, scan sécurité, déploiement progressif) | Intégré au dépôt, gratuit pour projets, écosystème riche |
| Observabilité | **Prometheus + Grafana**, **Loki** (logs), **OpenTelemetry** (traces) | Standard CNCF, corrélation métriques/logs/traces |
| IA | Orchestrateur RAG (LangChain/LlamaIndex ou custom léger) + API Claude (Anthropic) | Grounding strict sur données internes, pas de génération libre de faits sismiques |
| Cloud | **AWS** (option 1, écosystème mature, présence Caraïbes via `sa-east-1`/`us-east-1`) ou **OVHcloud** (option 2, souveraineté européenne/française, coût maîtrisé, pertinent pour DOM français) | Voir §2.6 arbitrage |

## 2.5 Vue déploiement (Kubernetes)

```mermaid
flowchart TB
    subgraph Internet
        USER[Utilisateurs Mobile/Web]
    end
    subgraph EDGE["Edge / CDN"]
        CDN[CloudFront ou OVH CDN\nAssets statiques, tuiles carte]
        WAF[WAF + DDoS protection]
    end
    subgraph K8S["Cluster Kubernetes (multi-AZ)"]
        subgraph NS_INGRESS["Namespace: ingress"]
            ING[Ingress Controller\nNGINX/Traefik + cert-manager TLS]
        end
        subgraph NS_APP["Namespace: app"]
            GW[API Gateway pods]
            API[API Core pods x N HPA]
            WS[WebSocket pods x N HPA]
            AI[Service IA pods]
            NOTIF[Notification pods]
        end
        subgraph NS_WORKERS["Namespace: workers"]
            ING_W[Ingestion workers x N]
            FUSION_W[Fusion workers]
        end
        subgraph NS_DATA["Namespace: data (ou managé hors cluster)"]
            PGPRIMARY[(PostgreSQL Primary)]
            PGREPLICA[(PostgreSQL Réplicas de lecture)]
            REDISC[(Redis Cluster)]
        end
    end
    subgraph EXT["Sources externes"]
        USGS_EXT[USGS]
        EMSC_EXT[EMSC]
        IPGP_EXT[IPGP/OVSM]
    end
    USER --> CDN --> WAF --> ING
    ING --> GW --> API
    ING --> WS
    API --> PGPRIMARY
    API --> PGREPLICA
    API --> REDISC
    WS --> REDISC
    ING_W --> USGS_EXT
    ING_W --> EMSC_EXT
    ING_W --> IPGP_EXT
    ING_W --> FUSION_W --> PGPRIMARY
    FUSION_W --> REDISC
    PGPRIMARY -. réplication .-> PGREPLICA
```

- **Multi-AZ obligatoire** : minimum 3 zones de disponibilité pour le cluster K8s et la base de données (réplication synchrone/quorum).
- **Multi-région en V2+** : réplication asynchrone vers une région secondaire (bascule PRA, voir doc 09).
- **Autoscaling horizontal (HPA)** sur les pods API/WebSocket selon CPU + nombre de connexions WebSocket actives.
- **Pods d'ingestion** isolés dans un namespace dédié avec quotas réseau (limite les risques de dépassement de quota API auprès des sources externes).

## 2.6 Arbitrage Cloud : AWS vs OVHcloud

| Critère | AWS | OVHcloud |
|---|---|---|
| Maturité services managés (K8s, RDS, SQS) | Très élevée | Bonne, en progression |
| Présence géographique proche Caraïbes | `us-east-1` (Virginie), latence correcte | Pas de région Caraïbes propre, mais bonne latence Europe/DOM via réseau France |
| Coût à l'échelle | Plus élevé, granularité fine | Généralement 30-40% moins cher à ressources égales |
| Souveraineté des données (utilisateurs DOM français) | Clauses contractuelles, mais droit US (Cloud Act) | Hébergement européen/français, argument fort pour collectivités et administrations |
| Écosystème IA managé | Bedrock, large choix de modèles | Plus limité, mais compatible avec API externes (Anthropic, etc.) |

**Recommandation** : démarrer sur **OVHcloud** pour les charges V1 (coût maîtrisé, argument souveraineté fort auprès des collectivités françaises des Caraïbes — Martinique, Guadeloupe), avec architecture **cloud-agnostique** (Kubernetes + Terraform + S3-compatible) permettant une bascule ou une répartition multi-cloud en V2/V3 si la couverture Haïti/République dominicaine/Porto Rico nécessite une latence optimisée via AWS `us-east-1`.

## 2.7 Principes d'architecture transverses

- **API-first** : toute fonctionnalité front consomme la même API publique documentée (dogfooding).
- **Idempotence** : chaque événement sismique ingéré porte un identifiant canonique stable (voir doc 04) pour permettre des ré-ingestions sans duplication.
- **Dégradation gracieuse** : si le service IA ou une source externe tombe, le cœur (carte + alertes officielles déjà fusionnées) continue de fonctionner.
- **Observabilité par défaut** : chaque requête porte un `trace_id` propagé de l'ingestion à la notification, pour mesurer la latence de bout en bout (donnée affichée à l'utilisateur, voir doc 07).

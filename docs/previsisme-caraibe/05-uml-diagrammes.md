# 05 — Diagrammes UML

## 5.1 Diagramme de classes — Domaine métier (cœur V1/V2)

```mermaid
classDiagram
    class SeismicEvent {
        +UUID id
        +float canonicalMagnitude
        +string magnitudeType
        +GeoPoint location
        +float depthKm
        +datetime eventTimeUtc
        +float confidenceScore
        +ConfidenceLabel confidenceLabel
        +bool tsunamiFlag
        +getEstimatedFeltZones() GeoPolygon[]
    }
    class EventSourceLink {
        +UUID sourceId
        +float matchScore
        +bool isPrimarySource
    }
    class Source {
        +string code
        +string connectorType
        +int priority
        +string[] regionScope
        +checkHealth() ConnectorHealth
    }
    class FusionEngine {
        +fuse(RawEvent[]) SeismicEvent
        +computeConfidence(SeismicEvent) float
        +detectDuplicate(RawEvent, SeismicEvent[]) SeismicEvent
    }
    class Organization {
        +string name
        +OrgType orgType
        +string countryIso3
    }
    class UserAccount {
        +string email
        +string locale
        +GeoPoint homeLocation
    }
    class RoleAssignment {
        +Role role
    }
    class Site {
        +string name
        +GeoPoint location
        +string buildingType
    }
    class SiteAlertRule {
        +float minMagnitude
        +float maxDistanceKm
        +ConfidenceLabel minConfidence
        +evaluate(SeismicEvent) bool
    }
    class Alert {
        +Severity severity
        +datetime generatedAt
        +string messageFr
    }
    class NotificationDelivery {
        +Channel channel
        +datetime sentAt
        +datetime deliveredAt
        +int latencyMs
    }
    class FeltReport {
        +GeoPoint reportedLocation
        +int intensityPerceived
    }
    class AIEventSummary {
        +string summaryText
        +UUID[] groundingSourceIds
        +bool humanReviewed
    }

    SeismicEvent "1" --> "0..*" EventSourceLink
    EventSourceLink --> "1" Source
    FusionEngine ..> SeismicEvent : produit
    Organization "1" --> "0..*" Site
    Organization "1" --> "0..*" UserAccount
    UserAccount "1" --> "0..*" RoleAssignment
    Site "1" --> "0..*" SiteAlertRule
    SiteAlertRule "1" --> "0..*" Alert
    SeismicEvent "1" --> "0..*" Alert
    Alert "1" --> "0..*" NotificationDelivery
    UserAccount "1" --> "0..*" NotificationDelivery
    SeismicEvent "1" --> "0..*" FeltReport
    SeismicEvent "1" --> "0..*" AIEventSummary
```

## 5.2 Diagramme de séquence — Ingestion → Fusion → Alerte → Notification (chemin critique de latence)

```mermaid
sequenceDiagram
    autonumber
    participant SRC as Source (USGS/EMSC/IPGP)
    participant CONN as Connecteur
    participant Q as File Redis Stream
    participant FUSION as Moteur de fusion
    participant DB as PostgreSQL
    participant PUBSUB as Redis Pub/Sub
    participant RULES as Évaluateur de règles d'alerte
    participant NOTIF as Service de notification
    participant PUSH as FCM/APNs
    participant APP as App mobile utilisateur

    SRC->>CONN: Publication d'un nouvel événement
    CONN->>Q: CanonicalEvent normalisé
    Note over CONN,Q: t0 = source_detection_time_utc
    Q->>FUSION: Consume
    FUSION->>DB: Recherche doublons (fenêtre spatio-temporelle)
    FUSION->>FUSION: Calcul indice de confiance
    FUSION->>DB: Upsert SeismicEvent + EventSourceLink
    FUSION->>PUBSUB: Publish (event.created | event.updated)
    Note over FUSION,PUBSUB: t1 = published_at_utc — latence pipeline = t1-t0 (objectif < 5s p95)
    PUBSUB->>RULES: Notify
    RULES->>DB: Charge SiteAlertRule pertinentes (bbox, magnitude, confiance)
    RULES->>NOTIF: Génère Alert + liste des destinataires
    NOTIF->>PUSH: Envoi batch (par lot de zone géographique)
    PUSH->>APP: Notification push
    APP->>NOTIF: Accusé de réception (si mode Collectivité)
    Note over PUSH,APP: t2 = delivered_at — latence totale = t2-t0 (objectif < 15s p95 hors EEW V3)
```

## 5.3 Diagramme de séquence — Signalement citoyen « J'ai ressenti ce séisme »

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant APP as App mobile/web
    participant API as API Core
    participant DB as PostgreSQL
    participant MATCH as Service de rattachement

    U->>APP: Ouvre "J'ai ressenti ce séisme"
    APP->>APP: Récupère position (consentement explicite)
    U->>APP: Sélectionne intensité perçue (échelle simplifiée)
    APP->>API: POST /felt-reports
    API->>DB: Insert FeltReport (seismic_event_id = null)
    API->>MATCH: Tente rattachement automatique
    MATCH->>DB: Recherche SeismicEvent proche (< 2h, < 300km)
    alt Correspondance trouvée
        MATCH->>DB: Update FeltReport.seismic_event_id
        MATCH->>DB: Increment SeismicEvent.felt_report_count
    else Aucune correspondance
        MATCH->>DB: Reste non rattaché (visible en modération)
    end
    API-->>APP: Confirmation
```

## 5.4 Diagramme d'état — Cycle de vie d'un événement sismique

```mermaid
stateDiagram-v2
    [*] --> Detecte: Première source publie l'événement
    Detecte --> EnCoursDeFusion: Fenêtre de corrélation ouverte (ex. 90s)
    EnCoursDeFusion --> Publie: Confiance calculée, seuil de publication atteint
    EnCoursDeFusion --> RejeteBruit: Score de confiance trop faible / incohérence
    Publie --> MisAJour: Révision par une source (magnitude affinée)
    MisAJour --> Publie
    Publie --> ConfirmeMultiSource: 2+ sources indépendantes convergentes
    ConfirmeMultiSource --> Archive: Fin de fenêtre d'actualité (ex. 30 jours)
    Publie --> Archive
    RejeteBruit --> [*]
    Archive --> [*]
```

## 5.5 Diagramme d'état — Statut d'une notification

```mermaid
stateDiagram-v2
    [*] --> EnAttente: Alert générée
    EnAttente --> Envoyee: Transmission à FCM/APNs
    Envoyee --> Livree: Accusé de livraison plateforme push
    Envoyee --> Echouee: Timeout / token invalide
    Livree --> Accusee: Utilisateur ouvre / confirme (mode Collectivité)
    Echouee --> EnAttente: Nouvelle tentative (retry avec backoff, max 3)
    Echouee --> AbandonneeDefinitivement: Échecs répétés
```

## 5.6 Diagramme de composants — Modules Flutter (client)

```mermaid
flowchart LR
    subgraph FlutterApp["Application Flutter (Android/iOS/Web)"]
        MAP[Module Carte\nMapLibre/Mapbox]
        FEED[Module Fil d'actualité sismique]
        FILTERS[Module Filtres\nmagnitude/distance/profondeur]
        SEARCH[Module Recherche\npays/ville]
        ALERTS[Module Alertes & Notifications]
        OFFLINE[Module Cache hors-ligne\nsqlite/drift]
        SAFETY[Module Consignes de sécurité]
        FELT[Module "J'ai ressenti"]
        STATS[Module Statistiques]
        AI_CHAT[Module Assistant IA]
        DASH_ENT[Module Tableau de bord Entreprise]
        DASH_COL[Module Tableau de bord Collectivité]
        AUTH[Module Authentification OAuth2/JWT]
        I18N[Module i18n FR/EN/ES]
    end
    API[(API Gateway)]
    MAP --> API
    FEED --> API
    ALERTS --> API
    SEARCH --> API
    FELT --> API
    AI_CHAT --> API
    DASH_ENT --> API
    DASH_COL --> API
    AUTH --> API
    OFFLINE -. sync .-> API
```

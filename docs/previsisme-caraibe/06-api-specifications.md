# 06 — Spécifications API

## 6.1 Principes généraux

- **API-first**, documentée en **OpenAPI 3.1** (REST) et **SDL** (GraphQL), publiée sur un portail développeur (V2 — API publique).
- **Authentification** : OAuth2 (Authorization Code + PKCE pour mobile/web, Client Credentials pour intégrations serveur-à-serveur), jetons **JWT** (durée de vie access token 15 min, refresh token rotatif 30 jours, révocation possible).
- **Autorisation** : RBAC (rôles `owner`, `admin`, `operator`, `viewer`) + scopes OAuth2 (`events:read`, `sites:write`, `exports:generate`, `admin:manage_users`...).
- **Transport** : TLS 1.3 obligatoire partout, HSTS, certificats via cert-manager/Let's Encrypt ou ACM.
- **Rate limiting** : par clé API / utilisateur, quotas différenciés par plan (free/entreprise/collectivité), en-têtes `X-RateLimit-*`.
- **Versionnement** : préfixe `/v1/`, dépréciation avec fenêtre de transition de 12 mois minimum et en-tête `Deprecation`.
- **Format d'erreur uniforme** (RFC 9457 Problem Details) :

```json
{
  "type": "https://previsisme-caraibe.example/errors/rate-limit-exceeded",
  "title": "Quota d'API dépassé",
  "status": 429,
  "detail": "Limite de 1000 requêtes/heure atteinte pour cette clé API.",
  "retry_after_seconds": 120
}
```

## 6.2 API REST — extraits OpenAPI

```yaml
openapi: 3.1.0
info:
  title: PréviSéisme Caraïbe — API Publique
  version: "1.0"
  description: >
    Toutes les données renvoyées proviennent de sources scientifiques officielles
    (USGS, EMSC, IPGP/OVSM, réseaux FDSN). Chaque objet expose sa provenance et
    son indice de confiance.
servers:
  - url: https://api.previsisme-caraibe.example/v1
security:
  - oauth2: [events:read]

paths:
  /events:
    get:
      summary: Liste des événements sismiques filtrés
      parameters:
        - name: bbox
          in: query
          schema: { type: string, example: "-90,8,-58,28" }
        - name: min_magnitude
          in: query
          schema: { type: number, format: float }
        - name: max_depth_km
          in: query
          schema: { type: number, format: float }
        - name: country
          in: query
          schema: { type: string, description: "Code ISO 3166-1 alpha-3" }
        - name: city
          in: query
          schema: { type: string }
        - name: since
          in: query
          schema: { type: string, format: date-time }
        - name: min_confidence
          in: query
          schema: { type: string, enum: [faible, moyen, eleve, confirme_multi_source] }
      responses:
        "200":
          description: Liste paginée d'événements
          content:
            application/json:
              schema: { $ref: "#/components/schemas/EventPage" }

  /events/{eventId}:
    get:
      summary: Détail d'un événement, incluant provenance et sources contributrices
      parameters:
        - name: eventId
          in: path
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          content:
            application/json:
              schema: { $ref: "#/components/schemas/EventDetail" }

  /events/{eventId}/ai-summary:
    get:
      summary: Résumé explicatif généré par l'IA, avec sources utilisées (grounding)
      parameters:
        - name: eventId
          in: path
          required: true
          schema: { type: string, format: uuid }
        - name: locale
          in: query
          schema: { type: string, enum: [fr, en, es], default: fr }
      responses:
        "200":
          content:
            application/json:
              schema: { $ref: "#/components/schemas/AISummary" }

  /felt-reports:
    post:
      summary: Soumettre un signalement "J'ai ressenti ce séisme"
      requestBody:
        content:
          application/json:
            schema: { $ref: "#/components/schemas/FeltReportInput" }
      responses:
        "201": { description: "Signalement enregistré" }

  /sites:
    get:
      summary: Liste des sites/bâtiments surveillés (mode Entreprise/Collectivité)
      security: [{ oauth2: [sites:read] }]
      responses:
        "200":
          content:
            application/json:
              schema: { $ref: "#/components/schemas/SiteList" }
    post:
      summary: Créer un site surveillé
      security: [{ oauth2: [sites:write] }]

  /sites/{siteId}/alert-rules:
    post:
      summary: Configurer une règle d'alerte pour un site
      security: [{ oauth2: [sites:write] }]

  /exports/pdf:
    post:
      summary: Générer un export PDF (historique des alertes, rapport de site)
      security: [{ oauth2: [exports:generate] }]
      responses:
        "202": { description: "Génération asynchrone démarrée, voir /exports/{id}/status" }

  /exports/excel:
    post:
      summary: Générer un export Excel
      security: [{ oauth2: [exports:generate] }]

  /sources/health:
    get:
      summary: État de santé des sources sismiques intégrées (transparence)
      responses:
        "200":
          content:
            application/json:
              schema: { $ref: "#/components/schemas/SourceHealthList" }

components:
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.previsisme-caraibe.example/oauth2/authorize
          tokenUrl: https://auth.previsisme-caraibe.example/oauth2/token
          scopes:
            events:read: Lecture des événements sismiques
            sites:read: Lecture des sites surveillés
            sites:write: Gestion des sites et règles d'alerte
            exports:generate: Génération d'exports PDF/Excel
            admin:manage_users: Gestion des utilisateurs et rôles

  schemas:
    EventDetail:
      type: object
      properties:
        id: { type: string, format: uuid }
        magnitude: { type: number }
        magnitude_type: { type: string }
        depth_km: { type: number }
        location: { type: object, properties: { lat: {type: number}, lon: {type: number} } }
        place_description: { type: string }
        event_time_utc: { type: string, format: date-time }
        first_detected_at_utc: { type: string, format: date-time }
        published_at_utc: { type: string, format: date-time }
        confidence_score: { type: number }
        confidence_label: { type: string }
        contributing_sources:
          type: array
          items:
            type: object
            properties:
              source_code: { type: string }
              external_id: { type: string }
              is_primary_source: { type: boolean }
        tsunami_flag: { type: boolean }
        felt_report_count: { type: integer }
```

## 6.3 API GraphQL — SDL (pour tableaux de bord riches Entreprise/Collectivité)

```graphql
scalar DateTime
scalar Geography

type SeismicEvent {
  id: ID!
  magnitude: Float!
  magnitudeType: String
  location: Geography!
  depthKm: Float
  placeDescription: String
  eventTimeUtc: DateTime!
  firstDetectedAtUtc: DateTime!
  publishedAtUtc: DateTime
  confidenceScore: Float!
  confidenceLabel: ConfidenceLabel!
  contributingSources: [EventSourceLink!]!
  feltReports: [FeltReport!]!
  aiSummary(locale: Locale = FR): AISummary
  tsunamiFlag: Boolean!
}

enum ConfidenceLabel { FAIBLE MOYEN ELEVE CONFIRME_MULTI_SOURCE }
enum Locale { FR EN ES }

type EventSourceLink {
  sourceCode: String!
  externalId: String!
  isPrimarySource: Boolean!
  matchScore: Float
}

type AISummary {
  summaryText: String!
  modelIdentifier: String!
  groundingSourceIds: [ID!]!
  humanReviewed: Boolean!
  generatedAt: DateTime!
}

type Site {
  id: ID!
  name: String!
  location: Geography!
  buildingType: String
  alertRules: [SiteAlertRule!]!
  alerts(since: DateTime): [Alert!]!
}

type SiteAlertRule {
  id: ID!
  minMagnitude: Float!
  maxDistanceKm: Float!
  minConfidenceLabel: ConfidenceLabel!
  notifyChannels: [String!]!
  isActive: Boolean!
}

type Alert {
  id: ID!
  seismicEvent: SeismicEvent!
  severity: String!
  generatedAt: DateTime!
  deliveries: [NotificationDelivery!]!
}

type NotificationDelivery {
  id: ID!
  channel: String!
  sentAt: DateTime
  deliveredAt: DateTime
  acknowledgedAt: DateTime
  latencyMs: Int
  status: String!
}

type Query {
  events(bbox: [Float!], minMagnitude: Float, country: String, city: String, since: DateTime): [SeismicEvent!]!
  event(id: ID!): SeismicEvent
  sites(organizationId: ID!): [Site!]!
  sourceHealth: [SourceHealth!]!
}

type SourceHealth {
  sourceCode: String!
  status: String!
  lastEventReceivedAt: DateTime
  latencyMs: Int
}

type Mutation {
  createSite(input: CreateSiteInput!): Site!
  createAlertRule(siteId: ID!, input: AlertRuleInput!): SiteAlertRule!
  acknowledgeAlert(deliveryId: ID!): NotificationDelivery!
}

type Subscription {
  newEventInRegion(bbox: [Float!]!): SeismicEvent!
  alertForSite(siteId: ID!): Alert!
}

input CreateSiteInput {
  organizationId: ID!
  name: String!
  latitude: Float!
  longitude: Float!
  buildingType: String
}

input AlertRuleInput {
  minMagnitude: Float!
  maxDistanceKm: Float!
  minConfidenceLabel: ConfidenceLabel!
  notifyChannels: [String!]!
}
```

## 6.4 Canal temps réel — WebSocket

**Endpoint** : `wss://realtime.previsisme-caraibe.example/v1/stream?bbox=-90,8,-58,28&token=<JWT>`

Événements poussés (format enveloppe commune) :

```json
{
  "event_type": "event.created",
  "emitted_at": "2026-07-01T14:32:05.412Z",
  "payload": { "...": "SeismicEvent (voir schéma EventDetail)" }
}
```

Types d'événements : `event.created`, `event.updated`, `alert.generated`, `source.health_changed`.

**Résilience client** : reconnexion automatique avec backoff exponentiel + rattrapage via `GET /events?since=<last_seen>` pour garantir l'absence de perte d'alerte pendant une coupure réseau (particulièrement important en zone cyclonique où le réseau peut être instable).

## 6.5 Sécurité API (résumé, détails doc 09)

- Validation stricte des schémas d'entrée (Pydantic), rejet explicite (400) plutôt que correction silencieuse.
- Idempotency-Key sur les endpoints d'écriture sensibles (`POST /sites`, `POST /exports/*`).
- Journalisation de chaque appel avec `trace_id`, `user_id`, `scope utilisé` (voir doc 09 §9.2 journalisation).
- CORS strict par domaine autorisé pour le client Web.

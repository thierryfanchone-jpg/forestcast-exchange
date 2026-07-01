# PréviSéisme Caraïbe — Dossier d'architecture

> Plateforme professionnelle d'information et, à terme, d'alerte précoce sismique pour les territoires des Caraïbes.

Ce dossier documente la conception complète du projet **PréviSéisme Caraïbe** : architecture technique, modèle de données, API, UX, plan projet, budget, risques et trajectoire d'évolution vers un système d'alerte précoce (Earthquake Early Warning — EEW) certifié.

**Important — positionnement du projet.** Ce dossier conçoit une **plateforme d'information sismique en temps quasi réel**, agrégeant des données provenant exclusivement d'organismes scientifiques officiels (USGS, EMSC, IPGP/OVSM, réseaux FDSN). Ce n'est **pas**, en V1/V2, un système d'alerte précoce au sens sismologique strict (détection des ondes P avant l'arrivée des ondes S destructrices) : cette capacité, prévue en V3, nécessite une instrumentation dédiée (capteurs propres ou accès privilégié à des réseaux de capteurs), une validation scientifique et un partenariat institutionnel avec les autorités de sécurité civile. Le dossier trace explicitement cette trajectoire sans jamais présenter la V1/V2 comme une alerte précoce certifiée.

## Structure du dossier

| # | Document | Contenu |
|---|----------|---------|
| 01 | [Vision et périmètre](01-vision-et-perimetre.md) | Principes fondateurs, non-objectifs, périmètre V1/V2/V3, disclaimers |
| 02 | [Architecture système](02-architecture-systeme.md) | Diagrammes C4 (contexte, conteneurs, composants), stack technique, déploiement |
| 03 | [Intégration des sources sismiques](03-integration-sources-sismiques.md) | USGS FDSN/GeoJSON, EMSC, IPGP/OVSM, standard FDSN, pipeline d'ingestion, extensibilité |
| 04 | [Modèle de données et schéma BDD](04-modele-donnees-et-schema-bdd.md) | Schéma PostgreSQL/PostGIS, DDL, diagramme entité-association |
| 05 | [Diagrammes UML](05-uml-diagrammes.md) | Diagrammes de classes, de séquence, d'états |
| 06 | [Spécifications API](06-api-specifications.md) | API REST, GraphQL, WebSocket, authentification OAuth2/JWT |
| 07 | [UX, écrans et maquettes](07-ux-ecrans-maquettes.md) | Inventaire des écrans, wireframes, parcours utilisateurs, modes famille/entreprise/collectivité |
| 08 | [Intelligence artificielle](08-intelligence-artificielle.md) | Fusion multi-agences, détection de doublons, indice de confiance, assistant conversationnel, garde-fous anti-hallucination |
| 09 | [Sécurité, fiabilité, exploitation](09-securite-fiabilite.md) | Cybersécurité, haute disponibilité, tests de charge, sauvegarde, PRA/PCA |
| 10 | [Plan projet](10-plan-projet.md) | Sprints, roadmap V1→V3, budget estimatif, calendrier, risques techniques et réglementaires |
| 11 | [Trajectoire vers l'alerte précoce](11-trajectoire-alerte-precoce.md) | Conditions scientifiques/institutionnelles, partenariats, certification, cadre légal |

## Comment lire ce dossier

- Les diagrammes sont écrits en **Mermaid** (rendu natif sur GitHub).
- Le schéma de base de données est fourni en **DDL PostgreSQL/PostGIS exécutable**.
- Les spécifications API sont fournies en **OpenAPI (extraits)** et **schéma GraphQL SDL**.
- Ce dossier est un **livrable de conception** (architecture, spécifications, planification). Il ne contient pas encore de code applicatif — le repo actuel héberge un projet e-commerce sans rapport (« Les Ateliers de la Forme ») ; PréviSéisme Caraïbe est documenté ici comme projet séparé, prêt à être scaffoldé dans son propre dépôt.

## Principe non négociable

> **L'application n'invente jamais de données.** Toute magnitude, localisation, profondeur ou heure affichée provient d'une source scientifique officielle citée (USGS, EMSC, IPGP/OVSM, ou tout observatoire national FDSN ajouté ultérieurement). En cas d'indisponibilité d'une source, l'absence de donnée est affichée explicitement — jamais une estimation interne présentée comme une mesure officielle.

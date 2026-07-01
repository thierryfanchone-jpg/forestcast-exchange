# 09 — Sécurité, fiabilité et exploitation

## 9.1 Cybersécurité

### 9.1.1 Modèle de menace (résumé)

| Actif | Menace | Impact | Mitigation |
|---|---|---|---|
| Pipeline d'ingestion | Injection de fausses données sismiques (source compromise/usurpée) | Panique publique, fausse alerte | Vérification TLS + signature des sources connues, contrôle de plausibilité (plage de valeurs), corrélation multi-source avant diffusion large |
| API publique | Abus/DDoS, credential stuffing | Indisponibilité, prise de contrôle de comptes | Rate limiting, WAF, MFA obligatoire pour rôles admin/opérateur, détection d'anomalies de connexion |
| Canal de notification push | Usurpation d'alerte (faux push) | Panique, perte de confiance | Signature des payloads, certificats FCM/APNs dédiés, jamais de contenu libre non validé par le pipeline |
| Base de données | Exfiltration de données utilisateurs (localisation domicile) | Atteinte vie privée | Chiffrement au repos, colonnes sensibles chiffrées applicativement, accès BDD restreint par IAM |
| Compte administrateur | Prise de contrôle (phishing) | Modification malveillante des règles d'alerte | MFA, moindre privilège, alerte sur changement de rôle sensible (audit_log) |

### 9.1.2 Mesures transverses

- **Chiffrement** : TLS 1.3 en transit partout ; chiffrement au repos (AES-256) pour la base de données et le stockage objet ; gestion des clés via KMS (AWS KMS ou OVH KMS).
- **Authentification** : OAuth2/OIDC, JWT signés (RS256), rotation des clés de signature, MFA obligatoire pour les rôles `admin`/`owner`.
- **Principe du moindre privilège** : RBAC strict, séparation des environnements (dev/staging/prod), secrets gérés via Vault/AWS Secrets Manager — jamais en clair dans le code ou les variables d'environnement versionnées.
- **Sécurisation de la chaîne CI/CD** : scan de dépendances (Dependabot/Snyk), SAST (Semgrep/CodeQL), scan d'images Docker (Trivy), signature des images (cosign), déploiement avec approbation manuelle en production.
- **Conformité** : RGPD (base légale, minimisation, droit à l'effacement, DPO désigné), analyse d'impact (AIPD) sur la géolocalisation, hébergement des données de citoyens français de préférence en UE (argument en faveur d'OVHcloud, doc 02 §2.6).
- **Tests de sécurité réguliers** : pentest annuel par prestataire externe, programme de divulgation responsable (bug bounty ou canal de signalement sécurité publié).
- **Revue de code obligatoire** avec analyse de sécurité pour tout composant touchant à l'authentification, aux notifications ou au pipeline d'ingestion.

## 9.2 Journalisation

- **Logs structurés (JSON)** avec `trace_id` propagé de bout en bout (ingestion → fusion → alerte → notification), agrégés via **OpenTelemetry** vers **Loki/Elastic**.
- **Journal d'audit métier** (`audit_log`, doc 04) distinct des logs techniques : actions sensibles (changement de rôle, export, modification de règle d'alerte), conservé 3 ans minimum (traçabilité réglementaire).
- **Aucune donnée personnelle en clair dans les logs techniques** (masquage des emails, coordonnées précises tronquées dans les logs de debug).

## 9.3 Haute disponibilité

- **Objectifs de service** : disponibilité cible **99.9%** en V1 (≈ 8h45 d'indisponibilité tolérée/an), **99.95%** visé en V2/V3 pour les fonctions d'alerte.
- **Multi-AZ** obligatoire dès V1 (cluster K8s et base de données répartis sur ≥3 zones).
- **Multi-région** en V2 : réplication asynchrone vers une région secondaire, bascule pilotée (RTO cible < 30 min, RPO cible < 5 min).
- **Autoscaling** horizontal sur les services API/WebSocket/notification, basé sur charge CPU et nombre de connexions actives.
- **Chemin critique isolé** : le pipeline ingestion → fusion → notification est déployé sur des ressources dédiées, non partagées avec les fonctionnalités secondaires (statistiques, exports), pour garantir que la charge sur les rapports n'affecte jamais la latence d'alerte.
- **Circuit breakers** sur chaque connecteur source externe (si une source répond lentement, ne pas bloquer les autres).

## 9.4 Tests de charge

| Scénario | Objectif | Outil |
|---|---|---|
| Pic de connexions WebSocket lors d'un séisme majeur régional (ex. M7+) | 500k connexions simultanées, latence de diffusion p95 < 5s | k6, Locust |
| Rafale de notifications push | 1M de notifications envoyées en < 2 min | Tests dédiés FCM/APNs sandbox |
| Ingestion en rafale multi-sources (essaim sismique) | 100 événements/minute sans dégradation de la latence de fusion | Rejeu de données historiques (replay USGS feed d'un épisode réel, ex. séisme d'Haïti 2010 ou séquence Martinique) |
| API publique sous charge | 10k req/s en lecture, dégradation contrôlée (rate limiting) sans panne | k6 |
| Bascule PRA | Basculer région primaire → secondaire sans perte de données critiques | Exercice trimestriel planifié (game day) |

## 9.5 Stratégies de sauvegarde

- **Base de données** : sauvegarde continue (WAL archiving) + snapshot complet quotidien, rétention 35 jours, test de restauration mensuel automatisé (une sauvegarde jamais testée n'est pas une sauvegarde).
- **Stockage objet** (exports, rapports IA, payloads bruts archivés) : versionning activé, réplication cross-région.
- **Configuration d'infrastructure** : entièrement versionnée (Terraform/Helm) — aucune configuration manuelle non reproductible ("infrastructure comme documentation vivante").
- **Secrets** : sauvegarde chiffrée séparée du reste de l'infrastructure, procédure de rotation documentée.

## 9.6 Plan de reprise après incident (PRA/PCA)

| Type d'incident | Procédure | RTO cible |
|---|---|---|
| Panne d'une zone de disponibilité | Bascule automatique K8s vers zones saines | < 5 min (transparent) |
| Panne région complète | Bascule manuelle pilotée vers région secondaire (réplication asynchrone) | < 30 min |
| Corruption de données applicatives | Restauration point-in-time depuis WAL | < 2h |
| Compromission de sécurité (ex. fuite de clé) | Procédure de révocation immédiate (rotation clés/JWT), communication utilisateurs si données personnelles concernées (obligation RGPD 72h) | Révocation < 1h, notification CNIL/autorité < 72h |
| Panne simultanée de toutes les sources externes (USGS+EMSC+IPGP down) | Mode dégradé explicite affiché à l'utilisateur, aucune donnée fabriquée en substitution | Immédiat (affichage), résolution dépend des sources tierces |
| Cyclone/catastrophe régionale affectant l'infrastructure locale | Architecture cloud hors zone à risque physique (pas de datacenter unique dans la zone cyclonique), CDN pour continuité de service en lecture | Continuité maintenue par design |

- **Exercices réguliers** ("game days") testant chaque scénario ci-dessus au moins une fois par an, avec rapport post-mortem versionné.
- **Astreinte 24/7** dès que la plateforme sert des cas d'usage Collectivité (mode sécurité civile) — engagement de service (SLA) formalisé avec chaque collectivité partenaire.

# 01 — Vision et périmètre

## 1.1 Vision

**PréviSéisme Caraïbe** devient la référence régionale d'information sismique pour les Caraïbes : une plateforme multi-plateforme (Android, iOS, Web), multilingue, capable de servir aussi bien le grand public (mode Famille) que les entreprises (mode Entreprise) et les collectivités (mode Collectivité), en s'appuyant exclusivement sur des données provenant d'organismes scientifiques officiels.

À terme (V3+), et **uniquement** en partenariat avec les observatoires et les autorités de sécurité civile compétentes, la plateforme vise à intégrer des capacités d'alerte précoce sismique (EEW) conformes aux standards internationaux.

## 1.2 Principes fondateurs

1. **Aucune donnée inventée.** Chaque événement affiché est traçable à une source officielle (agence + identifiant d'événement + horodatage de la source). Aucune magnitude, localisation ou profondeur n'est calculée ou extrapolée par l'application sans être clairement identifiée comme une estimation interne, distincte de la donnée officielle.
2. **Traçabilité totale.** Chaque donnée porte : l'agence source, l'heure de détection par la source, l'heure de réception par notre pipeline, l'heure de diffusion à l'utilisateur, et le niveau de confiance calculé.
3. **Dégradation explicite, jamais silencieuse.** Si une source est indisponible, l'interface l'indique (« EMSC indisponible depuis 14:32 ») plutôt que de masquer le problème.
4. **Neutralité scientifique.** L'application ne prédit pas de séismes futurs (la prédiction sismique déterministe n'est pas scientifiquement possible à ce jour). Elle informe sur les événements survenus et, en V3, sur la propagation en cours d'un événement déjà déclenché.
5. **Non-substitution aux autorités.** Les consignes de sécurité et les alertes officielles renvoient toujours vers les autorités compétentes (préfecture, sécurité civile, IPGP/OVSM) ; l'application ne se substitue jamais à une alerte officielle émise par l'État.
6. **Conformité et vie privée par conception.** RGPD (utilisateurs UE/territoires français), CCPA le cas échéant, minimisation des données, consentement explicite pour la géolocalisation.

## 1.3 Non-objectifs explicites (pour éviter toute ambiguïté)

- La V1 et la V2 **ne constituent pas** un système d'alerte précoce sismique au sens sismologique (pas de détection d'ondes P, pas de délai d'anticipation avant les ondes S).
- L'application ne fournit **aucune prédiction** de date, lieu ou magnitude d'un séisme futur.
- L'IA intégrée **n'invente pas** de faits scientifiques : elle synthétise, compare et explique des données déjà publiées par les agences sources (voir doc 08).
- Aucune fonctionnalité n'est présentée comme « certifiée alerte précoce » sans validation scientifique et institutionnelle documentée (voir doc 11).

## 1.4 Périmètre par version

### Version 1 — Plateforme d'information sismique fiable

Objectif : agréger et diffuser en temps quasi réel les données de séismes issues des sources officielles, avec une expérience utilisateur soignée sur Android/iOS/Web.

- Carte mondiale des séismes (temps réel, historique)
- Carte spécifique Caraïbes (zoom, filtrage régional)
- Notifications push instantanées (par zone, par magnitude)
- Historique complet et consultable
- Filtres : magnitude, distance, profondeur
- Recherche par pays / par ville
- Modes d'usage : Famille, Entreprise, Collectivité (vues adaptées, pas encore de back-office complet — voir V2)
- Consignes de sécurité officielles (contenus IPGP/OVSM, sécurité civile, USGS "Earthquake Safety")
- Signalement citoyen « J'ai ressenti ce séisme » (type USGS "Did You Feel It?")
- Statistiques (fréquence, répartition géographique, magnitude moyenne par zone)
- Mode hors connexion (cache local du dernier état connu)
- FR / EN / ES

### Version 2 — Plateforme professionnelle multi-organisations

Objectif : transformer la plateforme d'information en outil professionnel pour les entreprises et collectivités, avec fusion intelligente des données.

- Fusion multi-agences avec détection de doublons et indice de confiance (doc 08)
- Tableaux de bord Collectivité et Entreprise
- Gestion multi-utilisateurs et gestion des rôles (RBAC)
- Gestion des bâtiments/sites surveillés (géolocalisés, seuils d'alerte par site)
- Historique des alertes envoyées, accusés de réception
- Exports PDF / Excel
- API publique (REST + GraphQL, quotas, clés API)

### Version 3 — Vers l'alerte précoce

Objectif : poser les fondations techniques d'un système d'alerte précoce, en partenariat avec des réseaux de capteurs et des institutions scientifiques.

- Ingestion de flux de capteurs sismiques (réseaux partenaires, protocole SeedLink/miniSEED ou API partenaire)
- Traitement des ondes P (détection, filtrage), calcul du délai estimé d'arrivée des ondes S
- Simulation d'impact et propagation des ondes sur carte 3D
- IA d'analyse : estimation de zones à risque, estimation de dommages potentiels (présentée comme **estimation probabiliste**, jamais comme mesure certaine)
- **Condition bloquante** : cette version n'est activée en production que dans le cadre d'un partenariat formel avec un observatoire national et/ou une autorité de sécurité civile (voir doc 11), avec validation scientifique indépendante des algorithmes de détection.

## 1.5 Territoires cibles (extensibilité pays)

Conçu dès la V1 pour être multi-pays : la couche de configuration régionale (doc 03 §3.5) permet d'ajouter un pays sans modification du cœur applicatif — uniquement l'ajout d'une configuration (zone géographique, langue, source(s) nationale(s), contacts d'autorités).

Territoires prioritaires V1 : Martinique, Guadeloupe, Haïti, République dominicaine, Porto Rico, îles Vierges, Trinité-et-Tobago, Petites Antilles (arc volcanique).

# 11 — Trajectoire vers un véritable système d'alerte précoce (EEW)

## 11.1 Ce qui distingue une plateforme d'information d'un système EEW certifié

Un système d'**alerte précoce sismique (Earthquake Early Warning)** au sens des standards internationaux (ex. ShakeAlert aux États-Unis, SASMEX au Mexique, systèmes JMA au Japon) repose sur :

1. Un réseau dense de capteurs sismiques **à faible latence propre** (pas dépendant de bulletins déjà publiés par des tiers).
2. Des algorithmes de détection de l'onde P validés scientifiquement, capables d'estimer la magnitude et la localisation en quelques secondes.
3. Une chaîne de diffusion certifiée, avec des engagements de disponibilité et de latence de bout en bout.
4. Un cadre légal et institutionnel clair définissant qui a l'autorité d'émettre une alerte publique.
5. Une validation scientifique indépendante et continue (taux de fausses alertes, taux de détection manquée) publiée.

**PréviSéisme Caraïbe V1/V2 ne remplit aucune de ces conditions** — c'est une plateforme d'agrégation et de diffusion de données déjà publiées par des tiers, avec une latence de plusieurs dizaines de secondes à quelques minutes (temps de traitement + temps de publication des sources elles-mêmes). C'est une limite **structurelle et honnête**, pas un défaut d'implémentation.

## 11.2 Conditions pour évoluer vers une V3 EEW crédible

| Condition | Statut à date | Action requise |
|---|---|---|
| Accès à un réseau de capteurs à faible latence dans les Caraïbes | Non acquis | Négocier un partenariat avec un réseau existant (IPGP/OVSM-OVSG, USGS/Caribbean network, UWI Seismic Research Centre, Puerto Rico Seismic Network) plutôt que déployer un réseau propre à court terme |
| Validation scientifique des algorithmes de détection P/estimation de magnitude | Non initiée | Collaboration avec un laboratoire de sismologie (IPGP, UWI, USGS) pour valider les algorithmes sur données historiques régionales avant tout déploiement |
| Cadre légal d'émission d'alerte publique | Variable par territoire (à clarifier) | Étude juridique par pays/territoire (autorité de sécurité civile compétente : préfecture pour les DOM français, FEMA/NWS pour zones US, autorités nationales pour Haïti/Rép. dominicaine/CARICOM) |
| Mandat ou reconnaissance institutionnelle | Non acquis | Convention avec au moins une autorité de sécurité civile pilote avant ouverture grand public de la fonctionnalité EEW |
| Mesure continue de performance (taux de fausse alerte / détection manquée) publiée | Non applicable | Mettre en place dès les premiers essais pilotes, avec publication transparente des résultats |

## 11.3 Stratégie de partenariat recommandée

1. **Court terme (V1)** : engager un dialogue formel avec l'**IPGP** (source scientifique prioritaire pour les Antilles françaises) pour un accès données pérenne et une collaboration de principe sur la feuille de route V3.
2. **Moyen terme (V2)** : élargir aux observatoires nationaux non-français (UWI Seismic Research Centre pour les Petites Antilles anglophones, réseaux de Porto Rico et République dominicaine, Bureau des Mines et de l'Énergie en Haïti) — chaque nouvel observatoire s'intègre via un connecteur FDSN dédié (doc 03 §3.5) sans changement d'architecture.
3. **Long terme (V3)** : structurer un consortium régional Caraïbes (à l'image de coopérations existantes en gestion des risques dans la région, ex. cadres CDEMA — Caribbean Disaster Emergency Management Agency) pour porter collectivement la brique EEW, mutualiser le coût des capteurs et obtenir la légitimité institutionnelle nécessaire à l'émission d'alertes publiques.

## 11.4 Gouvernance produit pendant la transition

- Toute fonctionnalité V3 liée à l'estimation de risque/dommage ou au délai d'onde S est déployée derrière un **feature flag organisationnel**, activable uniquement pour les partenaires ayant signé une convention de test encadrée (pas d'activation "par défaut" en production grand public).
- Un **comité consultatif scientifique** (sismologues partenaires, représentant sécurité civile) revoit chaque nouvelle capacité avant activation, avec droit de veto documenté.
- Communication publique **toujours datée et honnête sur le niveau de maturité** de chaque fonctionnalité (ex. bandeau "Fonctionnalité expérimentale, non certifiée alerte précoce" tant que les conditions du §11.2 ne sont pas remplies).

## 11.5 Message clé pour les parties prenantes

> PréviSéisme Caraïbe est conçu, dès son architecture, pour pouvoir devenir un système d'alerte précoce régional — mais cette capacité n'est **activée en conditions réelles qu'après validation scientifique indépendante et reconnaissance institutionnelle explicite**, jamais par simple mise à jour logicielle. Cette discipline protège à la fois les utilisateurs (pas de fausse assurance de sécurité) et la crédibilité à long terme du projet auprès des observatoires partenaires et des autorités publiques.

import { Guide, Category } from "@/types";

export const GUIDES: Guide[] = [
  {
    id: "1",
    slug: "disjoncteur-saute",
    title: "Que faire si le disjoncteur saute ?",
    category: "electricite",
    readingTime: 3,
    content: {
      intro:
        "Le disjoncteur est un dispositif de protection qui coupe le courant en cas de surcharge ou de court-circuit. Quand il saute, c'est souvent le signe d'un problème à ne pas ignorer.",
      symptoms: [
        "Le courant est coupé dans une ou plusieurs pièces",
        "Le disjoncteur est en position basse ou intermédiaire",
        "Il revient en position basse dès qu'on le remet",
        "Odeur de brûlé ou de plastique fondu",
      ],
      probableCauses: [
        "Trop d'appareils branchés en même temps (surcharge)",
        "Court-circuit dans un appareil électrique",
        "Humidité infiltrée dans une prise ou le tableau",
        "Disjoncteur vieillissant ou défectueux",
      ],
      simpleChecks: [
        "Identifier quel disjoncteur a sauté dans le tableau électrique",
        "Débrancher tous les appareils de la pièce concernée",
        "Remettre le disjoncteur en position haute",
        "Rebrancher les appareils un par un pour identifier le fautif",
      ],
      dangers: [
        "Ne jamais toucher les fils électriques sans avoir coupé l'alimentation générale",
        "En cas d'odeur de brûlé, ne pas remettre le courant et appeler un électricien",
        "Si le disjoncteur saute immédiatement après remise en marche, c'est un court-circuit — danger",
        "L'eau et l'électricité ne font jamais bon ménage — prudence en cas d'humidité",
      ],
      whenToCallPro: [
        "Le disjoncteur saute à répétition même sans surcharge apparente",
        "Présence d'une odeur de brûlé ou de traces noircies",
        "Étincelles visibles dans les prises ou le tableau",
        "Le problème survient par temps de pluie (infiltration d'eau)",
        "Vous ne savez pas identifier la cause",
      ],
    },
  },
  {
    id: "2",
    slug: "fuite-eau",
    title: "Que faire en cas de fuite d'eau ?",
    category: "plomberie",
    readingTime: 3,
    content: {
      intro:
        "Une fuite d'eau peut causer des dommages importants rapidement. La priorité est de couper l'eau puis d'identifier l'origine de la fuite avant d'appeler un plombier.",
      symptoms: [
        "Flaque d'eau ou tache humide visible",
        "Son d'eau qui coule sans robinet ouvert",
        "Compteur d'eau qui tourne à vide",
        "Taches de moisissures sur les murs ou plafond",
        "Facture d'eau anormalement élevée",
      ],
      probableCauses: [
        "Joint de robinet ou de siphon usé",
        "Tuyau fissuré à cause du gel ou du vieillissement",
        "Raccord desserré sous l'évier ou derrière un appareil",
        "Pression d'eau trop élevée qui fatigue les canalisations",
      ],
      simpleChecks: [
        "Couper l'arrivée d'eau (robinet d'arrêt sous l'évier ou vanne générale)",
        "Vérifier les joints de robinets et siphons visibles",
        "Inspecter les raccords sous l'évier et derrière la machine à laver",
        "Vérifier si le compteur tourne en fermant tous les robinets",
      ],
      dangers: [
        "Une fuite non traitée peut causer des dégâts des eaux importants",
        "L'humidité favorise les moisissures dangereuses pour la santé",
        "Une fuite électrique combinée à de l'eau peut être mortelle",
        "Ne jamais manipuler l'électricité si une fuite est proche des prises",
      ],
      whenToCallPro: [
        "Vous ne pouvez pas localiser l'origine de la fuite",
        "La fuite vient d'une canalisation encastrée",
        "Le dégât des eaux touche un plafond ou les murs (fuite voisin)",
        "La fuite est importante et vous ne pouvez pas la stopper",
        "Il y a de l'électricité à proximité de la fuite",
      ],
    },
  },
  {
    id: "3",
    slug: "chauffe-eau-ne-chauffe-plus",
    title: "Pourquoi mon chauffe-eau ne chauffe plus ?",
    category: "plomberie",
    readingTime: 4,
    content: {
      intro:
        "Un chauffe-eau en panne prive d'eau chaude. Avant d'appeler un plombier, quelques vérifications simples peuvent identifier le problème.",
      symptoms: [
        "L'eau reste froide même après attente",
        "L'eau est tiède mais pas chaude",
        "L'eau chauffe puis redevient froide rapidement",
        "Voyant ou affichage d'erreur sur l'appareil",
        "Bruit inhabituel lors du chauffage",
      ],
      probableCauses: [
        "Résistance électrique grillée (chauffe-eau électrique)",
        "Thermostat défectueux mal réglé",
        "Brûleur ou vanne gaz défaillante (chauffe-eau gaz)",
        "Accumulation de calcaire réduisant l'efficacité",
        "Anode protectrice épuisée",
      ],
      simpleChecks: [
        "Vérifier que le disjoncteur du chauffe-eau n'a pas sauté",
        "Contrôler la pression d'eau arrivant au chauffe-eau",
        "Vérifier le thermostat (réglage recommandé : 55-60°C)",
        "Consulter le voyant ou l'affichage d'erreur de l'appareil",
        "Pour un cumulus : vérifier l'âge (plus de 10 ans = probable remplacement)",
      ],
      dangers: [
        "Un chauffe-eau réglé trop haut (>70°C) peut causer des brûlures graves",
        "Ne jamais ouvrir le corps du chauffe-eau électrique sous tension",
        "Pour un chauffe-eau gaz, ne jamais manipuler les raccords gaz soi-même",
        "Un chauffe-eau qui fuit peut provoquer un dégât des eaux",
      ],
      whenToCallPro: [
        "La résistance électrique est grillée (nécessite démontage et remplacement)",
        "Problème sur un chauffe-eau gaz (obligatoire : technicien agréé)",
        "Fuite visible sur le corps du chauffe-eau",
        "L'appareil a plus de 10-15 ans (envisager remplacement)",
        "Présence de gaz ou d'odeur suspecte",
      ],
    },
  },
  {
    id: "4",
    slug: "clim-ne-refroidit-plus",
    title: "Pourquoi ma clim ne refroidit plus ?",
    category: "climatisation",
    readingTime: 3,
    content: {
      intro:
        "Une climatisation qui ne refroidit plus peut avoir plusieurs causes. Certaines vérifications sont accessibles sans technicien.",
      symptoms: [
        "L'air soufflé n'est plus froid (ou à peine frais)",
        "La clim tourne mais l'ambiance ne baisse pas",
        "Code d'erreur affiché sur la télécommande ou l'unité",
        "Bruit anormal ou vibrations inhabituelles",
        "Givre visible sur l'unité intérieure",
      ],
      probableCauses: [
        "Filtres encrassés bloquant la circulation d'air",
        "Manque de gaz frigorigène (fuite dans le circuit)",
        "Unité extérieure obstruée (feuilles, poussière)",
        "Température extérieure trop basse pour certains modes",
        "Compresseur défaillant",
      ],
      simpleChecks: [
        "Nettoyer les filtres de l'unité intérieure (tous les 2 mois)",
        "Vérifier que l'unité extérieure n'est pas obstruée",
        "Contrôler le mode sélectionné (froid/chaud)",
        "Réinitialiser l'appareil en coupant le courant 5 minutes",
        "Vérifier que toutes les fenêtres et portes sont fermées",
      ],
      dangers: [
        "Ne jamais démonter l'unité vous-même — risque de court-circuit",
        "Le gaz frigorigène est une substance réglementée — manipulations interdites",
        "Un compresseur surchauffé peut provoquer un incendie",
        "Ne pas utiliser l'appareil s'il émet une odeur chimique suspecte",
      ],
      whenToCallPro: [
        "Les filtres propres mais la clim ne refroidit toujours pas",
        "Manque de gaz (givre sur les tuyaux, perte d'efficacité progressive)",
        "Code erreur persistant après réinitialisation",
        "Entretien annuel conseillé — obligatoire tous les 2 ans réglementairement",
        "Bruit ou vibrations anormales de l'unité extérieure",
      ],
    },
  },
  {
    id: "5",
    slug: "machine-laver-n-essore-plus",
    title: "Pourquoi ma machine à laver n'essore plus ?",
    category: "electromenager",
    readingTime: 3,
    content: {
      intro:
        "Quand la machine à laver ne passe plus en essorage, le linge ressort trempé. Plusieurs causes simples peuvent expliquer ce problème.",
      symptoms: [
        "Le linge sort mouillé après le cycle complet",
        "L'essorage s'arrête avant la fin du cycle",
        "La machine vibre ou fait un bruit fort pendant l'essorage",
        "Affichage d'un code erreur lié au vidage",
        "L'eau ne se vide pas complètement",
      ],
      probableCauses: [
        "Filtre de vidange bouché par des corps étrangers",
        "Tuyau d'évacuation plié ou obstrué",
        "Linge mal réparti créant un déséquilibre",
        "Pompe de vidange défectueuse",
        "Module électronique en panne",
      ],
      simpleChecks: [
        "Nettoyer le filtre de vidange (trappe en bas de la machine)",
        "Vérifier que le tuyau d'évacuation n'est pas plié ou écrasé",
        "Répartir uniformément le linge dans le tambour",
        "Ne pas surcharger la machine au-delà de sa capacité",
        "Lancer un programme essorage seul pour tester",
      ],
      dangers: [
        "Débrancher toujours la machine avant de nettoyer le filtre",
        "Attention à l'eau chaude qui peut s'écouler lors du nettoyage du filtre",
        "Ne pas démonter les composants électroniques sans compétences",
        "Un déséquilibre important peut endommager le tambour et la structure",
      ],
      whenToCallPro: [
        "Après nettoyage du filtre, le problème persiste",
        "Code erreur E21, E18 ou similaire (pompe en panne)",
        "Bruit de grattage fort indiquant un problème mécanique",
        "L'appareil a plus de 8-10 ans — évaluer coût réparation vs remplacement",
        "La machine ne fait plus du tout de cycle complet",
      ],
    },
  },
  {
    id: "6",
    slug: "prise-electrique-gresille",
    title: "Ma prise électrique grésille ou crépite",
    category: "electricite",
    readingTime: 2,
    content: {
      intro:
        "Une prise électrique qui grésille ou crépite est un signe de danger sérieux. Ne pas ignorer ce symptôme.",
      symptoms: [
        "Bruit de crépitement ou de grésillements autour d'une prise",
        "Légères étincelles visibles lors du branchement",
        "Odeur de brûlé ou de plastique chaud",
        "Prise chaude au toucher",
        "Disjoncteur qui saute fréquemment",
      ],
      probableCauses: [
        "Contact électrique desserré à l'intérieur de la prise",
        "Prise surchargée ou vieillissante",
        "Humidité infiltrée dans la prise",
        "Court-circuit partiel dans l'installation",
      ],
      simpleChecks: [
        "Couper immédiatement le disjoncteur de la pièce",
        "Débrancher tous les appareils de cette prise",
        "Observer si le bruit ou l'odeur cesse après coupure",
        "Ne pas remettre sous tension avant intervention",
      ],
      dangers: [
        "Risque d'incendie électrique — agir immédiatement",
        "Ne jamais toucher une prise qui grésille",
        "Ne pas remettre le courant si l'odeur persiste",
        "Évacuer la pièce si les étincelles sont visibles ou si la fumée apparaît",
      ],
      whenToCallPro: [
        "Dès que vous entendez le premier crépitement — c'est urgent",
        "Toujours : une prise défectueuse doit être remplacée par un électricien",
        "En cas d'odeur de brûlé persistante même après coupure du courant",
        "Si le problème touche plusieurs prises",
      ],
    },
  },
  {
    id: "7",
    slug: "robinet-qui-goutte",
    title: "Mon robinet goutte en permanence",
    category: "plomberie",
    readingTime: 2,
    content: {
      intro:
        "Un robinet qui goutte peut représenter jusqu'à 4 000 litres d'eau gaspillés par an. La cause est souvent un joint usé, parfois remplaçable soi-même.",
      symptoms: [
        "Goutte d'eau permanente même robinet fermé",
        "Fuite au niveau du bec verseur",
        "Fuite au niveau du corps du robinet ou de la bague",
        "Calcaire visible autour du bec",
      ],
      probableCauses: [
        "Joint de siège ou ceramic usé",
        "Cartouche céramique défectueuse (mitigeurs modernes)",
        "Corps du robinet fissuré",
        "Calcaire empêchant la fermeture parfaite",
      ],
      simpleChecks: [
        "Couper l'eau au robinet d'arrêt sous l'évier",
        "Identifier le type de robinet (à joint ou mitigeur céramique)",
        "Remplacer le joint (tâche accessible avec tutoriel vidéo)",
        "Détartrer si le calcaire est visible",
      ],
      dangers: [
        "Couper l'eau avant toute intervention",
        "Ne pas forcer sur les raccords ou vis abîmés",
        "Attention aux robinets anciens : le corps peut être fragile",
      ],
      whenToCallPro: [
        "Robinet très ancien ou corps fissuré nécessitant remplacement",
        "Fuite au niveau des raccords dans la cloison",
        "Après remplacement du joint, si la fuite persiste",
        "Mitigeur thermostatic ou robinets spéciaux",
      ],
    },
  },
  {
    id: "8",
    slug: "wc-coule-permanence",
    title: "Mes WC coulent en permanence",
    category: "plomberie",
    readingTime: 3,
    content: {
      intro:
        "Des toilettes qui coulent en permanence consomment en moyenne 20 à 200 litres d'eau par heure. La cause la plus fréquente est un joint de clapet usé.",
      symptoms: [
        "Son d'eau coulant en permanence dans la cuvette",
        "Compteur d'eau qui tourne sans utilisation",
        "Facture d'eau anormalement élevée",
        "Filet d'eau visible coulant de la chasse",
      ],
      probableCauses: [
        "Clapet de chasse d'eau usé ou déformé",
        "Flotteur mal réglé ou défectueux",
        "Valve d'arrêt d'alimentation défectueuse",
        "Calcaire empêchant la fermeture du clapet",
      ],
      simpleChecks: [
        "Ouvrir le réservoir et observer le mécanisme",
        "Vérifier si le flotteur est réglé correctement (eau ne doit pas dépasser le trop-plein)",
        "Appuyer sur le clapet pour voir si la fuite s'arrête (joint usé à remplacer)",
        "Nettoyer le clapet si du calcaire est visible",
      ],
      dangers: [
        "Pas de danger direct, mais gaspillage important et risque de dégât des eaux",
        "Une fuite non traitée peut endommager les joints et aggraver le problème",
      ],
      whenToCallPro: [
        "Après remplacement du clapet, si la fuite persiste",
        "Mécanisme de chasse entièrement défaillant (remplacement complet)",
        "Fuite au niveau du raccord d'alimentation ou de la cuvette",
        "Ancienne chasse à tirette ou système peu standard",
      ],
    },
  },
  {
    id: "9",
    slug: "odeur-brule-tableau-electrique",
    title: "Odeur de brûlé dans le tableau électrique",
    category: "electricite",
    readingTime: 2,
    content: {
      intro:
        "Une odeur de brûlé dans le tableau électrique est une urgence. Il s'agit d'un risque d'incendie potentiel qui nécessite une intervention rapide.",
      symptoms: [
        "Odeur de plastique brûlé ou de caoutchouc",
        "Chaleur ou chaleur excessive autour du tableau",
        "Marques noircies ou traces de brûlures visibles",
        "Disjoncteur qui saute à répétition",
        "Bruit de grésillements dans le tableau",
      ],
      probableCauses: [
        "Connexion desserrée provoquant un arc électrique",
        "Surintensité répétée sur un circuit",
        "Disjoncteur défectueux surchauffant",
        "Câbles inadaptés pour la charge supportée",
      ],
      simpleChecks: [
        "Couper immédiatement le disjoncteur général",
        "Aérer la pièce",
        "Observer si la fumée ou l'odeur cesse",
        "Ne pas remettre le courant sans avoir appelé un électricien",
      ],
      dangers: [
        "DANGER ÉLEVÉ — risque d'incendie immédiat",
        "Ne jamais ouvrir le tableau électrique sans formation",
        "Évacuer le logement si de la fumée est visible",
        "Appeler le 18 (pompiers) si l'odeur de brûlé est forte ou si vous voyez des flammes",
      ],
      whenToCallPro: [
        "IMMÉDIATEMENT — ce problème ne peut pas attendre",
        "Un électricien certifié doit vérifier l'ensemble du tableau",
        "Mise aux normes peut être nécessaire si installation ancienne",
        "Ne jamais remettre le courant sans vérification professionnelle",
      ],
    },
  },
  {
    id: "10",
    slug: "serrure-bloquee",
    title: "Ma serrure est bloquée",
    category: "serrurerie",
    readingTime: 3,
    content: {
      intro:
        "Une serrure bloquée peut être source de stress, surtout si vous êtes enfermé(e) dehors. Voici les étapes à suivre avant d'appeler un serrurier.",
      symptoms: [
        "La clé n'entre pas dans la serrure",
        "La clé entre mais ne tourne pas",
        "Le pêne ne rentre pas dans la gâche",
        "La porte reste bloquée malgré la clé qui tourne",
        "Clé cassée dans la serrure",
      ],
      probableCauses: [
        "Serrure grippée par manque de lubrification",
        "Porte gonflée (humidité, chaleur) entraînant mauvais alignement",
        "Clé usée ou légèrement tordue",
        "Cylindre défaillant ou vandalisé",
        "Corps étranger dans le cylindre",
      ],
      simpleChecks: [
        "Appliquer un spray lubrifiant dans le cylindre (WD-40 ou similaire)",
        "Soulever légèrement la porte en tournant la clé (porte qui frotte)",
        "Essayer une clé de rechange",
        "Vérifier si la porte est bien dans son cadre (regarder les charnières)",
      ],
      dangers: [
        "Ne pas forcer la clé au risque de la casser dans la serrure",
        "Si vous êtes enfermé(e) à l'intérieur : appelez le 17 (police) ou les voisins",
        "Ne pas utiliser d'outils pouvant endommager irréversiblement la serrure",
      ],
      whenToCallPro: [
        "Clé cassée dans le cylindre",
        "Serrure vandalisée ou forcée (sécurité compromise)",
        "Porte ne fermant plus correctement malgré lubrification",
        "Remplacement ou blindage de la serrure recommandé",
        "En urgence si vous êtes bloqué(e) dehors",
      ],
    },
  },
  {
    id: "11",
    slug: "radiateur-ne-chauffe-plus",
    title: "Mon radiateur électrique ne chauffe plus",
    category: "electricite",
    readingTime: 3,
    content: {
      intro:
        "Un radiateur électrique qui ne chauffe plus peut avoir une cause simple à résoudre ou nécessiter une intervention. Voici comment identifier le problème.",
      symptoms: [
        "Le radiateur ne produit plus aucune chaleur",
        "Le voyant de fonctionnement est éteint",
        "Chaleur inégale ou partielle",
        "Odeur de brûlé lors de la chauffe",
        "Thermostat ne répondant plus",
      ],
      probableCauses: [
        "Disjoncteur dédié qui a sauté",
        "Thermostat mal réglé ou défectueux",
        "Résistance grillée",
        "Problème sur le thermostat programmable ou pilote",
        "Surtension ayant grillé le module électronique",
      ],
      simpleChecks: [
        "Vérifier le disjoncteur dédié au radiateur dans le tableau",
        "Contrôler le thermostat (réglé sur une température suffisante ?)",
        "Vérifier le fil pilote s'il existe (mode confort/éco/hors-gel)",
        "Tester sur une autre prise si c'est un radiateur soufflant portable",
      ],
      dangers: [
        "Ne jamais démonter un radiateur fixe sous tension",
        "Un radiateur qui dégage une odeur de brûlé = risque d'incendie",
        "Ne pas laisser des objets en contact avec un radiateur",
        "Ne pas court-circuiter le thermostat pour forcer le chauffage",
      ],
      whenToCallPro: [
        "La résistance est grillée (remplacement technique)",
        "Problème sur le câblage ou la prise dédiée",
        "Radiateur à inertie avec défaillance électronique",
        "Odeur de brûlé persistante",
      ],
    },
  },
  {
    id: "12",
    slug: "clim-fait-du-bruit",
    title: "Ma climatisation fait du bruit",
    category: "climatisation",
    readingTime: 3,
    content: {
      intro:
        "Une climatisation qui fait du bruit peut signaler un problème mécanique ou simplement un manque d'entretien. Le type de bruit est souvent révélateur.",
      symptoms: [
        "Cliquetis ou vibrations anormales",
        "Sifflement ou bruit de gaz",
        "Grincement ou bruit de frottement",
        "Bruit de crachotement ou de glou-glou",
        "Ronronnement plus fort qu'habituellement",
      ],
      probableCauses: [
        "Vis ou panneau du carter desserré (vibrations)",
        "Ventilateur encrassé ou obstrué",
        "Présence de givre sur l'évaporateur (crachotement)",
        "Compresseur vieillissant",
        "Corps étranger dans l'unité extérieure",
      ],
      simpleChecks: [
        "Vérifier que les panneaux de l'unité intérieure sont bien fixés",
        "Inspecter l'unité extérieure pour tout corps étranger visible",
        "Nettoyer les filtres de l'unité intérieure",
        "Vérifier qu'aucun objet ne touche l'unité extérieure",
      ],
      dangers: [
        "Ne pas introduire les mains dans l'unité extérieure en fonctionnement",
        "Un bruit de sifflement peut indiquer une fuite de gaz frigorigène",
        "Un bruit de choc peut indiquer une pièce mécanique en décomposition",
      ],
      whenToCallPro: [
        "Bruit de sifflement ou de gaz (possible fuite frigorigène)",
        "Vibrations importantes de l'unité extérieure (fixation, compresseur)",
        "Bruit persistant après nettoyage et vérification",
        "Entretien annuel recommandé pour prévenir ces problèmes",
      ],
    },
  },
  {
    id: "13",
    slug: "lave-vaisselle-fuit",
    title: "Mon lave-vaisselle fuit",
    category: "electromenager",
    readingTime: 3,
    content: {
      intro:
        "Une fuite de lave-vaisselle peut endommager le sol et les meubles. L'identification de l'origine permet d'agir rapidement.",
      symptoms: [
        "Eau sous le lave-vaisselle",
        "Taches d'humidité sur le sol ou les meubles proches",
        "Fuite visible lors du cycle de lavage",
        "Odeur de moisissure sous l'appareil",
      ],
      probableCauses: [
        "Joint de porte usé ou mal aligné",
        "Tuyau d'alimentation ou d'évacuation percé ou mal raccordé",
        "Bras de lavage fissuré projetant l'eau vers la porte",
        "Pompe de vidange défectueuse",
        "Trop de produit vaisselle créant une mousse excessive",
      ],
      simpleChecks: [
        "Vérifier le joint de porte (le remplacer si déchiré ou déformé)",
        "Contrôler les raccords du tuyau d'alimentation et d'évacuation",
        "Vérifier qu'il n'y a pas trop de mousse lors du cycle",
        "Inspecter les bras de lavage pour fissures éventuelles",
      ],
      dangers: [
        "Couper l'eau et l'électricité avant toute inspection",
        "L'eau sous l'appareil peut causer un risque électrique",
        "Ne pas utiliser l'appareil si la fuite est importante",
      ],
      whenToCallPro: [
        "Joint de porte inaccessible ou nécessitant démontage spécifique",
        "Fuite interne non identifiable",
        "Pompe ou cuve défectueuse",
        "Fuite sur le raccord mural difficile d'accès",
      ],
    },
  },
  {
    id: "14",
    slug: "seche-linge-seche-plus",
    title: "Mon sèche-linge ne sèche plus",
    category: "electromenager",
    readingTime: 3,
    content: {
      intro:
        "Un sèche-linge peu efficace consomme plus d'énergie et abîme le linge. La cause principale est souvent une obstruction des filtres ou du conduit.",
      symptoms: [
        "Le linge ressort encore humide après un cycle complet",
        "Le cycle dure plus longtemps qu'habituellement",
        "L'appareil s'arrête en cours de cycle",
        "La chaleur produite semble insuffisante",
        "Condensat excessif (condenseur à condensation)",
      ],
      probableCauses: [
        "Filtre à peluches saturé réduisant le flux d'air",
        "Conduit d'évacuation bouché ou coudé (sèche-linge évacuation)",
        "Résistance de chauffage défectueuse",
        "Thermostat de sécurité déclenché",
        "Pompe à chaleur en panne (sèche-linge à pompe à chaleur)",
      ],
      simpleChecks: [
        "Nettoyer le filtre à peluches après chaque utilisation",
        "Vérifier et nettoyer le conduit d'évacuation (sèche-linge évacuation)",
        "Vider le bac à eau (sèche-linge condenseur)",
        "Nettoyer le condenseur s'il est accessible",
        "Ne pas surcharger la machine",
      ],
      dangers: [
        "Un conduit obstrué peut causer un incendie par surchauffe",
        "Ne jamais utiliser sans filtre même pour un seul cycle",
        "Débrancher l'appareil avant toute inspection interne",
      ],
      whenToCallPro: [
        "Résistance grillée (l'appareil tourne mais ne chauffe pas du tout)",
        "Thermostat de sécurité déclenché à répétition",
        "Problème sur la pompe à chaleur",
        "Conduit d'évacuation encastré difficile à nettoyer",
      ],
    },
  },
  {
    id: "15",
    slug: "siphon-bouche",
    title: "Mon siphon est bouché",
    category: "plomberie",
    readingTime: 2,
    content: {
      intro:
        "Un siphon bouché provoque un lavabo ou une douche qui se vide lentement ou plus du tout. C'est souvent une intervention que vous pouvez faire vous-même.",
      symptoms: [
        "Eau qui stagne dans le lavabo ou la douche",
        "Mauvaise odeur venant du siphon",
        "Bruit de succion lors de l'écoulement",
        "Reflux d'eau dans un autre point d'eau",
      ],
      probableCauses: [
        "Accumulation de cheveux, savon et calcaire dans la bonde",
        "Dépôts graisseux dans le siphon sous l'évier (cuisine)",
        "Corps étranger tombé dans le siphon",
        "Tartre formant un bouchon",
      ],
      simpleChecks: [
        "Retirer la grille de bonde et nettoyer les cheveux accumulés",
        "Dévisser le siphon sous l'évier pour le nettoyer (mettre un seau sous)",
        "Utiliser un déboucheur ventouse",
        "Verser du bicarbonate + vinaigre blanc puis rincer à l'eau chaude",
      ],
      dangers: [
        "Éviter les produits déboucheurs chimiques agressifs qui abîment les canalisations",
        "Couper l'eau avant de démonter le siphon",
        "Attention à l'eau résiduelle en dévissant le siphon",
      ],
      whenToCallPro: [
        "Bouchon situé plus loin dans la canalisation principale",
        "Problème récurrent indiquant une canalisation dégradée",
        "Reflux d'eaux usées dans plusieurs points (bouchon collectif)",
        "Siphon fissuré nécessitant remplacement",
      ],
    },
  },
  {
    id: "16",
    slug: "chaudiere-panne",
    title: "Ma chaudière est en panne",
    category: "general",
    readingTime: 4,
    content: {
      intro:
        "Une chaudière en panne prive de chauffage et d'eau chaude. Certaines vérifications simples peuvent identifier la cause, mais l'intervention sur les systèmes gaz est réglementée.",
      symptoms: [
        "Plus de chauffage ni d'eau chaude",
        "Voyant d'erreur allumé sur la chaudière",
        "La chaudière s'allume puis s'éteint rapidement",
        "Bruit anormal lors du démarrage",
        "Fuite visible sous la chaudière",
      ],
      probableCauses: [
        "Pression d'eau trop basse dans le circuit de chauffage",
        "Code d'erreur signalant un défaut électronique ou de combustion",
        "Vase d'expansion défaillant",
        "Sonde ou thermostat défectueux",
        "Problème d'alimentation gaz",
      ],
      simpleChecks: [
        "Vérifier la pression du circuit sur le manomètre (doit être entre 1 et 1,5 bar à froid)",
        "Regonfler si nécessaire via le robinet de remplissage",
        "Lire le code d'erreur sur l'afficheur et consulter la notice",
        "Vérifier que la vanne gaz est bien ouverte",
        "Réinitialiser la chaudière selon les instructions du fabricant",
      ],
      dangers: [
        "ATTENTION : toute intervention sur les composants gaz est réservée aux professionnels",
        "En cas d'odeur de gaz : couper le gaz, ouvrir les fenêtres, appeler le 0800 47 33 33 (urgence gaz) et quitter le logement",
        "Ne jamais démonter le corps de chauffe vous-même",
        "L'entretien annuel par un professionnel est obligatoire pour les chaudières gaz",
      ],
      whenToCallPro: [
        "Toujours : pour toute intervention sur les brûleurs, échangeurs ou circuits gaz",
        "Pression qui chute régulièrement (fuite dans le circuit)",
        "Code d'erreur non résolu par réinitialisation",
        "Entretien annuel obligatoire (contrat d'entretien recommandé)",
        "Chaudière de plus de 15 ans : envisager remplacement",
      ],
    },
  },
  {
    id: "17",
    slug: "panne-courant-piece",
    title: "Panne de courant dans une pièce",
    category: "electricite",
    readingTime: 2,
    content: {
      intro:
        "Une panne de courant limitée à une pièce vient généralement d'un disjoncteur sauté ou d'un fusible grillé. Facile à identifier et souvent à résoudre.",
      symptoms: [
        "Plus de lumière ni de prises dans une pièce",
        "Les autres pièces ont du courant",
        "Un appareil spécifique provoque la coupure",
        "Disjoncteur en position basse dans le tableau",
      ],
      probableCauses: [
        "Surcharge du circuit (trop d'appareils branchés)",
        "Court-circuit dans un appareil défectueux",
        "Disjoncteur différentiel déclenché suite à une fuite de courant",
        "Fusible grillé (installations anciennes)",
      ],
      simpleChecks: [
        "Aller au tableau électrique et identifier le disjoncteur en position basse",
        "Débrancher tous les appareils de la pièce",
        "Remettre le disjoncteur en position haute",
        "Rebrancher les appareils un par un pour identifier le fautif",
      ],
      dangers: [
        "Si le disjoncteur saute immédiatement = court-circuit dangereux, ne pas insister",
        "Ne jamais court-circuiter un disjoncteur ou remplacer par un fusible de mauvais calibre",
        "En cas d'odeur de brûlé : appeler un électricien avant de remettre le courant",
      ],
      whenToCallPro: [
        "Disjoncteur qui saute à répétition sans raison apparente",
        "Après identification du fautif, si celui-ci est un circuit et non un appareil",
        "Installation électrique ancienne avec fusibles à cartouches",
        "Mise aux normes ou renforcement du tableau nécessaire",
      ],
    },
  },
  {
    id: "18",
    slug: "volet-roulant-bloque",
    title: "Mon volet roulant est bloqué",
    category: "general",
    readingTime: 3,
    content: {
      intro:
        "Un volet roulant bloqué peut l'être en position ouverte ou fermée. La cause est souvent mécanique et parfois réparable sans professionnel.",
      symptoms: [
        "Le volet ne monte plus ou ne descend plus",
        "La sangle ou la manivelle ne répond plus",
        "Bruit de craquement lors de la manœuvre",
        "Volet bloqué à mi-course",
        "Commande électrique sans effet",
      ],
      probableCauses: [
        "Lame décrochée ou sortie de ses rails",
        "Sangle cassée ou coincée",
        "Moteur électrique défaillant (volet motorisé)",
        "Tablier coincé dans la coulisse",
        "Ressort de tension cassé",
      ],
      simpleChecks: [
        "Vérifier si une lame est sortie de son rail et la replacer",
        "Contrôler l'état de la sangle (cassée, coincée ?)",
        "Pour un volet électrique : vérifier l'alimentation et la télécommande",
        "Réinitialiser le moteur selon les instructions (volet motorisé)",
        "Lubrifier les coulisses avec un spray silicone",
      ],
      dangers: [
        "Ne pas forcer si le tablier est bloqué — risque d'aggraver la casse",
        "Pour les volets hauts, ne pas monter sur une échelle sans sécurité",
        "Ne pas démonter le coffre sans avoir sécurisé le tablier",
      ],
      whenToCallPro: [
        "Moteur électrique défaillant nécessitant remplacement",
        "Ressort cassé dans le coffre (risque de blessure à la manipulation)",
        "Tablier endommagé nécessitant remplacement partiel ou total",
        "Volet haut en facade non accessible sans équipement professionnel",
      ],
    },
  },
  {
    id: "19",
    slug: "four-ne-chauffe-plus",
    title: "Mon four ne chauffe plus",
    category: "electromenager",
    readingTime: 3,
    content: {
      intro:
        "Un four qui ne chauffe plus peut être dû à une résistance grillée ou à un problème de thermostat. Certaines vérifications sont possibles avant l'appel d'un technicien.",
      symptoms: [
        "La cuisson est inexistante ou très faible",
        "Le four s'allume mais ne monte pas en température",
        "Seulement le grill ou seulement la résistance fonctionne",
        "Affichage d'un code erreur",
        "Odeur de brûlé sans cuisson",
      ],
      probableCauses: [
        "Résistance de sole ou de voûte grillée",
        "Thermostat défectueux ne maintenant pas la température",
        "Problème électronique sur la carte de commande",
        "Four gaz : problème d'allumage piezo ou de vanne gaz",
        "Disjoncteur dédié ayant sauté",
      ],
      simpleChecks: [
        "Vérifier le disjoncteur du four dans le tableau électrique",
        "Tester le four en mode grill uniquement (isole la panne)",
        "Observer si les deux résistances rougissent lors du préchauffage",
        "Consulter le code erreur dans la notice de l'appareil",
      ],
      dangers: [
        "Ne jamais démonter un four sous tension",
        "Pour un four gaz, ne pas manipuler les injecteurs ou les vannes",
        "Odeur de gaz persistante : couper le gaz et appeler les secours",
        "Ne pas utiliser le four si une résistance est visible brisée",
      ],
      whenToCallPro: [
        "Résistance grillée à remplacer (démontage intérieur requis)",
        "Thermostat défectueux à recalibrer ou remplacer",
        "Four gaz présentant un problème d'allumage ou de débit",
        "Coût de réparation dépassant 50% du prix d'un neuf = envisager remplacement",
      ],
    },
  },
  {
    id: "20",
    slug: "frigo-ne-refroidit-plus",
    title: "Mon frigo ne refroidit plus",
    category: "electromenager",
    readingTime: 3,
    content: {
      intro:
        "Un réfrigérateur qui ne refroidit plus est une urgence alimentaire. Voici comment identifier la cause rapidement.",
      symptoms: [
        "Température dans le frigo supérieure à 8°C",
        "Le congélateur fonctionne mais pas le frigo",
        "Condensation excessive à l'intérieur",
        "Givre excessif dans le congélateur",
        "Bruit de compresseur inhabituel ou absent",
      ],
      probableCauses: [
        "Thermostat réglé trop haut accidentellement",
        "Ventilateur interne bloqué par du givre",
        "Compresseur défaillant",
        "Fuite de gaz frigorigène",
        "Joint de porte usé laissant entrer de l'air chaud",
      ],
      simpleChecks: [
        "Vérifier le réglage du thermostat (position médiane recommandée)",
        "Vérifier que la ventilation autour du frigo est suffisante (5 cm minimum)",
        "Nettoyer les condenseurs (grille arrière ou dessous) si accessibles",
        "Vérifier l'état des joints de porte (ils doivent retenir une feuille de papier)",
        "Faire un dégivrage manuel complet si givre excessif",
      ],
      dangers: [
        "Ne pas consommer d'aliments ayant subi une montée en température prolongée (>4°C plus de 2h)",
        "Ne pas brancher un multi-prise surchargé",
        "Ne pas insérer d'objets métalliques dans le compartiment congélateur givré",
      ],
      whenToCallPro: [
        "Compresseur en panne (bruit de démarrage mais arrêt immédiat)",
        "Fuite de gaz frigorigène (nécessite technicien habilité)",
        "Carte électronique défaillante",
        "Frigo de plus de 12-15 ans : évaluer coût réparation vs remplacement",
      ],
    },
  },
  {
    id: "21",
    slug: "interrupteur-gresille",
    title: "Mon interrupteur grésille ou chauffe",
    category: "electricite",
    readingTime: 2,
    content: {
      intro:
        "Un interrupteur qui grésille ou chauffe est un signe d'arc électrique interne. C'est un risque d'incendie à ne pas négliger.",
      symptoms: [
        "Bruit de crépitement lors de l'utilisation",
        "Interrupteur chaud au toucher",
        "Légère odeur de brûlé",
        "Lumière qui scintille",
        "Traces noircies sur l'interrupteur",
      ],
      probableCauses: [
        "Contact électrique desserré ou oxydé",
        "Interrupteur surchargé (puissance trop élevée)",
        "Humidité infiltrée dans le boîtier",
        "Interrupteur de mauvaise qualité ou vieillissant",
      ],
      simpleChecks: [
        "Couper le disjoncteur de la pièce immédiatement",
        "Observer si l'odeur cesse après coupure",
        "Ne pas utiliser cet interrupteur avant intervention",
      ],
      dangers: [
        "Risque réel d'incendie — ne pas ignorer",
        "Ne jamais démonter un interrupteur sous tension",
        "Un arc électrique peut enflammer l'isolant des câbles",
      ],
      whenToCallPro: [
        "Dès maintenant — un interrupteur qui grésille doit être remplacé par un électricien",
        "Vérification de l'installation si plusieurs interrupteurs présentent ce problème",
      ],
    },
  },
  {
    id: "22",
    slug: "pression-eau-faible",
    title: "Pression d'eau faible dans le logement",
    category: "plomberie",
    readingTime: 3,
    content: {
      intro:
        "Une pression d'eau insuffisante nuit au confort quotidien. L'origine peut être générale (réseau) ou spécifique à votre installation.",
      symptoms: [
        "Débit d'eau très faible aux robinets",
        "Douche avec peu de pression",
        "Certains robinets sont affectés, d'autres non",
        "Problème récent et soudain",
        "Problème persistant depuis le début",
      ],
      probableCauses: [
        "Robinet d'arrêt general partiellement fermé",
        "Réducteur de pression défaillant ou mal réglé",
        "Calcaire obstruant les économiseurs de robinets",
        "Canalisation partiellement bouchée",
        "Problème sur le réseau collectif (travaux, fuite)",
      ],
      simpleChecks: [
        "Vérifier que le robinet d'arrêt général est complètement ouvert",
        "Nettoyer les aérateurs et économiseurs des robinets affectés",
        "Tester si le problème concerne tous les robinets ou un seul circuit",
        "Contacter le voisinage pour savoir si le problème est collectif",
      ],
      dangers: [
        "Une pression trop haute est aussi problématique — ne pas retirer le réducteur sans avis",
        "Ne pas toucher aux canalisations encastrées sans expertise",
      ],
      whenToCallPro: [
        "Réducteur de pression défaillant à remplacer",
        "Canalisation partiellement obstruée par du calcaire",
        "Problème persistant après vérification des causes simples",
        "Installation d'un surpresseur si la pression du réseau est insuffisante",
      ],
    },
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Category): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}

export function getAllCategories(): Category[] {
  return [...new Set(GUIDES.map((g) => g.category))] as Category[];
}

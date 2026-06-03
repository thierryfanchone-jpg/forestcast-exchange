import type {
  Course,
  PricingPlan,
  Testimonial,
  FAQ,
  DashboardStats,
  Badge,
  Skill,
  AISimulation,
} from "@/types";

export const DEMO_COURSES: Course[] = [
  {
    id: "course-1",
    slug: "orion-speak",
    title: "Orion Speak",
    subtitle: "Maîtrise la prise de parole",
    description:
      "Développe ta confiance et ton impact à l'oral. Apprends à structurer tes discours, gérer le stress et captiver ton audience.",
    category: "parole",
    level: "débutant",
    duration_hours: 8,
    lesson_count: 24,
    price: 79,
    stripe_price_id: "price_orion_speak",
    thumbnail: "/thumbnails/speak.jpg",
    color: "from-blue-600 to-blue-800",
    icon: "Mic",
    modules: [],
    tags: ["Communication", "Confiance", "Expression"],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "course-2",
    slug: "orion-job",
    title: "Orion Job",
    subtitle: "Réussis tes entretiens d'embauche",
    description:
      "Prépare-toi à décrocher le poste de tes rêves. Des techniques éprouvées pour convaincre les recruteurs et négocier ton salaire.",
    category: "entretien",
    level: "intermédiaire",
    duration_hours: 10,
    lesson_count: 30,
    price: 79,
    stripe_price_id: "price_orion_job",
    thumbnail: "/thumbnails/job.jpg",
    color: "from-emerald-600 to-emerald-800",
    icon: "Briefcase",
    modules: [],
    tags: ["Recrutement", "CV", "Négociation"],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "course-3",
    slug: "orion-pitch",
    title: "Orion Pitch",
    subtitle: "Crée des pitchs inoubliables",
    description:
      "Maîtrise l'art du pitch commercial. Structure ton message, capte l'attention et convaincs investisseurs et clients.",
    category: "pitch",
    level: "intermédiaire",
    duration_hours: 6,
    lesson_count: 18,
    price: 79,
    stripe_price_id: "price_orion_pitch",
    thumbnail: "/thumbnails/pitch.jpg",
    color: "from-purple-600 to-purple-800",
    icon: "TrendingUp",
    modules: [],
    tags: ["Startup", "Investisseurs", "Persuasion"],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "course-4",
    slug: "orion-leader",
    title: "Orion Leader",
    subtitle: "Développe ton leadership",
    description:
      "Deviens le leader que les autres choisissent de suivre. Communication impactante, gestion d'équipe et présence charismatique.",
    category: "leadership",
    level: "avancé",
    duration_hours: 12,
    lesson_count: 36,
    price: 99,
    stripe_price_id: "price_orion_leader",
    thumbnail: "/thumbnails/leader.jpg",
    color: "from-amber-600 to-orange-700",
    icon: "Crown",
    modules: [],
    tags: ["Management", "Charisme", "Influence"],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "course-5",
    slug: "orion-sales",
    title: "Orion Sales",
    subtitle: "Vente et négociation",
    description:
      "Maîtrise les techniques de vente consultative et de négociation avancée. Transforme chaque conversation en opportunité.",
    category: "vente",
    level: "avancé",
    duration_hours: 9,
    lesson_count: 27,
    price: 99,
    stripe_price_id: "price_orion_sales",
    thumbnail: "/thumbnails/sales.jpg",
    color: "from-rose-600 to-rose-800",
    icon: "Handshake",
    modules: [],
    tags: ["Vente", "Négociation", "Closing"],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "gratuit",
    name: "Gratuit",
    price: 0,
    description: "Pour découvrir la plateforme",
    features: [
      "3 simulations IA",
      "1 test de niveau",
      "1 mini module d'introduction",
      "Accès à la communauté",
    ],
    cta: "Commencer gratuitement",
  },
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Pour démarrer ta progression",
    features: [
      "1 module débutant au choix",
      "Exercices guidés",
      "10 simulations IA",
      "Certificat de réussite",
      "Support par email",
    ],
    stripe_price_id: "price_starter_29",
    cta: "Choisir Starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    description: "Pour une progression accélérée",
    features: [
      "Accès à 3 modules",
      "50 simulations IA",
      "Rapport de progression détaillé",
      "Badges de compétences",
      "Support prioritaire",
    ],
    is_popular: true,
    stripe_price_id: "price_pro_79",
    cta: "Choisir Pro",
  },
  {
    id: "expert",
    name: "Expert",
    price: 199,
    description: "Pour l'excellence totale",
    features: [
      "Tous les modules inclus",
      "Simulations IA illimitées",
      "Certification pratique officielle",
      "Passeport de compétences",
      "Accès à vie",
    ],
    stripe_price_id: "price_expert_199",
    cta: "Devenir Expert",
  },
  {
    id: "mensuel",
    name: "Abonnement",
    price: 14.9,
    period: "mois",
    description: "Accès continu et exercices frais",
    features: [
      "Nouveaux exercices chaque semaine",
      "Coach IA continu",
      "Suivi de progression",
      "Défis hebdomadaires",
      "Annulable à tout moment",
    ],
    stripe_price_id: "price_monthly_1490",
    cta: "S'abonner",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Amandine Petit",
    role: "Chargée de projet – Paris",
    content:
      "Grâce à Orion Job, j'ai décroché un CDI dans une startup en moins de 3 semaines. Les simulations IA sont bluffantes de réalisme.",
    score: 5,
  },
  {
    id: "t2",
    name: "Karim Diallo",
    role: "Entrepreneur – Lyon",
    content:
      "Orion Pitch a transformé ma façon de présenter mon projet. Mon taux de conversion en levée de fonds a doublé après la formation.",
    score: 5,
  },
  {
    id: "t3",
    name: "Sophie Mercier",
    role: "Manager – Bordeaux",
    content:
      "La section Orion Leader m'a donné des outils concrets que j'utilise en réunion tous les jours. Mon équipe me suit maintenant naturellement.",
    score: 5,
  },
  {
    id: "t4",
    name: "Théo Rousseau",
    role: "Commercial Senior – Nantes",
    content:
      "Le coach IA simule des objections que je n'aurais jamais imaginé me poser. Mon chiffre de ventes a augmenté de 40% en 2 mois.",
    score: 5,
  },
  {
    id: "t5",
    name: "Léa Martin",
    role: "Étudiante M2 – Toulouse",
    content:
      "J'avais un blocage total en prise de parole. Après Orion Speak, j'ai présenté mon mémoire devant 200 personnes. Sans paniquer.",
    score: 5,
  },
];

export const FAQ_ITEMS: FAQ[] = [
  {
    question: "Comment fonctionne le coach IA ?",
    answer:
      "Tu choisis un scénario (entretien, pitch, réunion...), tu entres ta réponse ou discours, et l'IA te donne un score, tes points forts, tes points à améliorer et un nouvel exercice adapté à ton niveau.",
  },
  {
    question: "Combien de temps ai-je accès aux formations ?",
    answer:
      "Les achats à la carte (Starter, Pro, Expert) donnent un accès à vie. L'abonnement mensuel est actif tant qu'il est en cours.",
  },
  {
    question: "Les certificats sont-ils reconnus ?",
    answer:
      "Les certifications ORION ACADEMY attestent de tes compétences pratiques et sont reconnues par nos partenaires employeurs. Elles sont vérifiables via QR code.",
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer:
      "Oui, tu peux annuler à tout moment depuis ton espace membre. Tu conserves l'accès jusqu'à la fin de la période payée.",
  },
  {
    question: "Y a-t-il des vidéos dans les formations ?",
    answer:
      "Oui, chaque leçon contient une vidéo de 5 à 15 minutes, un résumé texte, un exercice pratique et la possibilité de s'entraîner avec l'IA.",
  },
  {
    question: "Combien de temps faut-il pour finir une formation ?",
    answer:
      "Cela dépend du module : entre 6h et 12h de contenu. Avec 30 minutes par jour, tu peux finir une formation en 2 à 3 semaines.",
  },
];

export const DEMO_STATS: DashboardStats = {
  global_score: 78,
  courses_started: 2,
  courses_completed: 1,
  badges_earned: 4,
  simulations_done: 12,
  last_simulation_score: 82,
  progress_percent: 65,
};

export const DEMO_BADGES: Badge[] = [
  {
    id: "b1",
    name: "Premier Pas",
    description: "A complété sa première leçon",
    icon: "⭐",
    color: "gold",
    earned_at: new Date().toISOString(),
    is_earned: true,
  },
  {
    id: "b2",
    name: "Communicant",
    description: "A réussi Orion Speak avec 75%+",
    icon: "🎙️",
    color: "blue",
    earned_at: new Date().toISOString(),
    is_earned: true,
  },
  {
    id: "b3",
    name: "Candidat Pro",
    description: "A passé 5 simulations entretien",
    icon: "💼",
    color: "green",
    earned_at: new Date().toISOString(),
    is_earned: true,
  },
  {
    id: "b4",
    name: "Pitcheur",
    description: "A créé un pitch avec score 80%+",
    icon: "🚀",
    color: "purple",
    earned_at: new Date().toISOString(),
    is_earned: true,
  },
  {
    id: "b5",
    name: "Leader Émergent",
    description: "A commencé Orion Leader",
    icon: "👑",
    color: "amber",
    is_earned: false,
  },
  {
    id: "b6",
    name: "Maître des Ventes",
    description: "A finalisé Orion Sales",
    icon: "🏆",
    color: "rose",
    is_earned: false,
  },
];

export const DEMO_SKILLS: Skill[] = [
  {
    id: "s1",
    name: "Présentation personnelle",
    description: "Savoir se présenter avec impact en 2 minutes",
    score: 85,
    validated_at: new Date().toISOString(),
    is_validated: true,
  },
  {
    id: "s2",
    name: "Entretien d'embauche",
    description: "Répondre avec confiance aux questions de recruteurs",
    score: 78,
    validated_at: new Date().toISOString(),
    is_validated: true,
  },
  {
    id: "s3",
    name: "Pitch commercial",
    description: "Présenter un projet en moins de 3 minutes",
    score: 72,
    validated_at: new Date().toISOString(),
    is_validated: true,
  },
  {
    id: "s4",
    name: "Réunion professionnelle",
    description: "Participer et animer une réunion",
    score: 68,
    is_validated: false,
  },
  {
    id: "s5",
    name: "Leadership",
    description: "Inspirer et mobiliser une équipe",
    score: 45,
    is_validated: false,
  },
  {
    id: "s6",
    name: "Gestion du trac",
    description: "Gérer le stress avant et pendant une prise de parole",
    score: 90,
    validated_at: new Date().toISOString(),
    is_validated: true,
  },
  {
    id: "s7",
    name: "Négociation",
    description: "Négocier des conditions favorables",
    score: 35,
    is_validated: false,
  },
];

export const DEMO_SIMULATION: AISimulation = {
  id: "sim-1",
  user_id: "demo",
  scenario: "entretien",
  user_input: "Je suis quelqu'un de très motivé et je travaille dur...",
  score: 72,
  strengths: ["Bonne énergie", "Message clair", "Vocabulaire adapté"],
  weaknesses: ["Manque de précision", "Trop de généralités", "Pas d'exemple concret"],
  correction:
    "Ancre ton discours dans des exemples précis. Au lieu de 'je travaille dur', dis 'j'ai livré ce projet en 3 semaines en gérant 4 personnes'.",
  next_exercise:
    "Présente-toi en 90 secondes en citant 2 réalisations concrètes avec chiffres à l'appui.",
  analysis: {
    clarte: 75,
    structure: 65,
    conviction: 70,
    gestion_temps: 80,
    mots_parasites: 60,
    impact: 68,
    confiance: 72,
  },
  created_at: new Date().toISOString(),
};

export type ProductCategory =
  | "menus"
  | "salades"
  | "biscuits"
  | "gateaux"
  | "specialites"
  | "boissons"
  | "condiments"
  | "epicerie"
  | "traiteur";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null;
  image: string;
  glutenFree: boolean;
  lactoseFree: boolean;
  featured?: boolean;
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  menus: "Menus",
  salades: "Salades",
  biscuits: "Biscuits",
  gateaux: "Gâteaux",
  specialites: "Spécialités Maison",
  boissons: "Boissons Healthy",
  condiments: "Condiments",
  epicerie: "Épicerie Fine",
  traiteur: "Traiteur",
};

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  menus: "Des menus complets, équilibrés et savoureux",
  salades: "Fraîcheur et générosité dans chaque assiette",
  biscuits: "Biscuits artisanaux, gourmands et légers",
  gateaux: "Gâteaux d'exception, sans compromis sur le goût",
  specialites: "Nos créations maison inspirées des Caraïbes",
  boissons: "Boissons naturelles, détox et énergisantes",
  condiments: "Sauces et condiments faits maison",
  epicerie: "Une sélection fine de produits d'exception",
  traiteur: "Nous créons l'événement pour vous",
};

export const CATEGORY_IMAGES: Record<ProductCategory, string> = {
  menus: "/images/menus/menu-1.jpg",
  salades: "/images/salades/salade-1.jpg",
  biscuits: "/images/biscuits/biscuit-1.jpg",
  gateaux: "/images/gateaux/gateau-2.jpg",
  specialites: "/images/specialites/specialite-1.jpg",
  boissons: "/images/boissons/boisson-1.jpg",
  condiments: "/images/condiments/condiment-1.jpg",
  epicerie: "/images/epicerie-fine/epicerie-1.jpg",
  traiteur: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80&auto=format&fit=crop",
};

export const PRODUCTS: Product[] = [
  // ── Menus ──────────────────────────────────────────────────────────────────
  {
    id: "menu-creole-signature",
    name: "Menu Créole Signature",
    category: "menus",
    description:
      "Notre menu emblématique : entrée fraîche, plat créole maison et dessert artisanal. Une expérience culinaire caribéenne complète.",
    price: 18.5,
    image: "/images/menus/menu-1.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "menu-bien-etre",
    name: "Menu Bien-Être",
    category: "menus",
    description:
      "Salade tropicale, plat équilibré aux légumes du soleil et boisson détox gingembre. Conçu pour nourrir et revitaliser.",
    price: 16.5,
    image: "/images/menus/menu-2.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "menu-festif-caribeen",
    name: "Menu Festif Caribéen",
    category: "menus",
    description:
      "Festif et généreux : assortiment de spécialités antillaises, gâteau artisanal et punch coco vanille.",
    price: 22.0,
    image: "/images/menus/menu-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Salades ───────────────────────────────────────────────────────────────
  {
    id: "salade-tropicale-gourmande",
    name: "Salade Tropicale Gourmande",
    category: "salades",
    description:
      "Mangue fraîche, avocat, crevettes dorées, coriandre et vinaigrette au fruit de la passion. Une explosion de saveurs.",
    price: 9.5,
    image: "/images/salades/salade-1.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "salade-avocat-crevettes",
    name: "Salade Avocat Crevettes",
    category: "salades",
    description:
      "Crevettes marinées aux épices créoles, avocat crémeux, tomates cerises et herbes fraîches du jardin.",
    price: 11.0,
    image: "/images/salades/salade-2.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "salade-arc-en-ciel",
    name: "Salade Arc-en-Ciel",
    category: "salades",
    description:
      "Un arc de légumes colorés, graines de sésame, noix de cajou et sauce tahini au citron vert.",
    price: 8.5,
    image: "/images/salades/salade-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Biscuits ──────────────────────────────────────────────────────────────
  {
    id: "biscuits-coco-vanille",
    name: "Biscuits Coco Vanille",
    category: "biscuits",
    description:
      "Tendres biscuits à la farine de noix de coco et vanille bourbon de Madagascar. Croquants dehors, fondants dedans.",
    price: 6.5,
    image: "/images/biscuits/biscuit-1.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "biscuits-chocolat-amandes",
    name: "Biscuits Chocolat Amandes",
    category: "biscuits",
    description:
      "Riches en chocolat noir 70 % et éclats d'amandes torréfiées. Un péché mignon sain et généreux.",
    price: 7.0,
    image: "/images/biscuits/biscuit-2.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "biscuits-gingembre",
    name: "Biscuits Gingembre",
    category: "biscuits",
    description:
      "Biscuits épicés au gingembre frais, cannelle et cardamome. Chaleureux, réconfortants et digestes.",
    price: 6.0,
    image: "/images/biscuits/biscuit-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Gâteaux ───────────────────────────────────────────────────────────────
  {
    id: "gateau-chocolat-intense",
    name: "Gâteau Chocolat Intense",
    category: "gateaux",
    description:
      "Fondant au chocolat noir 70 %, ganache veloutée et éclats de fèves de cacao. Une intensité maîtrisée.",
    price: 24.0,
    image: "/images/gateaux/gateau-1.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "gateau-patate-douce",
    name: "Gâteau Patate Douce",
    category: "gateaux",
    description:
      "Notre signature caribéenne : moelleux à la patate douce, épices douces et caramel à la noix de coco.",
    price: 22.0,
    image: "/images/gateaux/gateau-2.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "moelleux-coco-mangue",
    name: "Moelleux Coco Mangue",
    category: "gateaux",
    description:
      "Moelleux à la farine de coco, cœur coulant au coulis de mangue fraîche et zestes de citron vert.",
    price: 26.0,
    image: "/images/gateaux/gateau-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Spécialités Maison ────────────────────────────────────────────────────
  {
    id: "patate-douce-fondante",
    name: "Spécialité Maison Patate Douce",
    category: "specialites",
    description:
      "Patate douce rôtie, sauce créole épicée et herbes fraîches. Le comfort food caribéen dans toute sa splendeur.",
    price: 12.5,
    image: "/images/specialites/specialite-1.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "colombo-poulet-maison",
    name: "Colombo Poulet Maison",
    category: "specialites",
    description:
      "Colombo de poulet mijoté aux épices antillaises, servi avec riz basmati parfumé et chutneys maison.",
    price: 14.5,
    image: "/images/specialites/specialite-2.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "gratin-igname-creole",
    name: "Gratin Igname Créole",
    category: "specialites",
    description:
      "Igname cuisiné à la crème de coco, gratiné au four et parfumé aux herbes aromatiques des Antilles.",
    price: 13.0,
    image: "/images/specialites/specialite-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Boissons Healthy ──────────────────────────────────────────────────────
  {
    id: "boisson-gingembre-citron",
    name: "Boisson Healthy Gingembre Citron",
    category: "boissons",
    description:
      "Infusion de gingembre frais pressé, citron bio et miel de fleurs sauvages. Détox et revitalisante.",
    price: 4.5,
    image: "/images/boissons/boisson-1.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "bissap-premium",
    name: "Bissap Premium",
    category: "boissons",
    description:
      "Infusion de fleurs d'hibiscus biologiques avec menthe fraîche et sucre de canne artisanal.",
    price: 5.0,
    image: "/images/boissons/boisson-2.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "punch-coco-vanille",
    name: "Punch Coco Vanille",
    category: "boissons",
    description:
      "Lait de coco pressé, vanille de Madagascar, sirop d'agave et une touche de muscade. Douceur tropicale.",
    price: 5.5,
    image: "/images/boissons/boisson-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Condiments ────────────────────────────────────────────────────────────
  {
    id: "condiment-creole-doux",
    name: "Condiment Créole Doux",
    category: "condiments",
    description:
      "Mélange d'épices antillaises douces, oignons lentement confits et aromates séchés. Polyvalent et savoureux.",
    price: 5.5,
    image: "/images/condiments/condiment-1.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "sauce-chien-maison",
    name: "Sauce Chien Maison",
    category: "condiments",
    description:
      "Notre sauce chien antillaise revisitée : ciboulette, piment doux, citron frais et herbes du jardin.",
    price: 6.0,
    image: "/images/condiments/condiment-2.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "piment-confit",
    name: "Piment Confit",
    category: "condiments",
    description:
      "Piments doux et forts confits à l'huile de coco vierge, avec ail et thym. Intense et parfumé.",
    price: 7.5,
    image: "/images/condiments/condiment-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Épicerie Fine ─────────────────────────────────────────────────────────
  {
    id: "box-epicerie-decouverte",
    name: "Box Épicerie Fine Découverte",
    category: "epicerie",
    description:
      "Une sélection curatée de nos meilleurs produits : condiments, biscuits et spécialités. Le cadeau idéal.",
    price: 35.0,
    image: "/images/epicerie-fine/epicerie-1.jpg",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "huile-coco-vierge",
    name: "Huile de Coco Vierge",
    category: "epicerie",
    description:
      "Huile de coco extra-vierge première pression à froid, issue de l'agriculture biologique.",
    price: 12.0,
    image: "/images/epicerie-fine/epicerie-2.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "confiture-goyave",
    name: "Confiture de Goyave",
    category: "epicerie",
    description:
      "Confiture artisanale de goyave rose des Antilles, sucrée au sucre de canne complet non raffiné.",
    price: 8.5,
    image: "/images/epicerie-fine/epicerie-3.jpg",
    glutenFree: true,
    lactoseFree: true,
  },
  // ── Traiteur ──────────────────────────────────────────────────────────────
  {
    id: "formule-cocktail-dinatoire",
    name: "Formule Cocktail Dînatoire",
    category: "traiteur",
    description:
      "Assortiment de bouchées créoles, verrines exotiques et boissons premium. Idéal pour 20 à 100 personnes.",
    price: null,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop",
    glutenFree: true,
    lactoseFree: true,
  },
  {
    id: "buffet-creole-premium",
    name: "Buffet Créole Premium",
    category: "traiteur",
    description:
      "Buffet complet avec spécialités caribéennes, plats chauds et desserts maison. Pour vos grands événements.",
    price: null,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format&fit=crop",
    glutenFree: true,
    lactoseFree: true,
    featured: true,
  },
  {
    id: "menu-evenement-sur-mesure",
    name: "Menu Événement Sur Mesure",
    category: "traiteur",
    description:
      "Menu entièrement personnalisé pour vos mariages, anniversaires et événements professionnels.",
    price: null,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80&auto=format&fit=crop",
    glutenFree: true,
    lactoseFree: true,
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured === true);
}

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

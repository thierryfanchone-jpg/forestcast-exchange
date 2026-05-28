# Les Ateliers de la Forme

Site e-commerce premium pour **Les Ateliers de la Forme** — cuisine saine, gourmande et caribéenne, sans gluten et sans lactose.

Fondé par **Thierry Fanchone** en 2017.

---

## Stack technique

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS**
- **Framer Motion** — animations fluides
- **Lucide React** — icônes
- **TypeScript** strict

---

## Installation

```bash
git clone https://github.com/thierryfanchone-jpg/forestcast-exchange.git
cd forestcast-exchange
npm install
```

---

## Lancement local

```bash
npm run dev
```

Site disponible sur [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx              # Layout global (fonts, CartProvider)
│   ├── page.tsx                # Page d'accueil
│   ├── commander/page.tsx      # Catalogue filtrable par catégorie
│   ├── menus/page.tsx
│   ├── salades/page.tsx
│   ├── biscuits/page.tsx
│   ├── gateaux/page.tsx
│   ├── specialites/page.tsx
│   ├── boissons/page.tsx
│   ├── condiments/page.tsx
│   ├── epicerie/page.tsx
│   ├── traiteur/page.tsx
│   ├── notre-histoire/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── Header.tsx              # Navigation fixe responsive
│   ├── Hero.tsx                # Héro animé pleine page
│   ├── AnimatedBanner.tsx      # Bandeau défilant en boucle
│   ├── CategoryGrid.tsx        # Grille des 9 catégories
│   ├── ProductCard.tsx         # Carte produit + panier
│   ├── ProductGrid.tsx         # Grille de ProductCards
│   ├── CategoryPageContent.tsx # Template pages catégorie
│   ├── Cart.tsx                # Drawer panier latéral
│   ├── CartItem.tsx            # Ligne article panier
│   ├── WhatsAppOrder.tsx       # Formulaire + envoi WhatsApp
│   ├── FounderSection.tsx      # Mot du fondateur
│   ├── DifferenceSection.tsx   # Nos 4 piliers différenciants
│   ├── TestimonialsSection.tsx # Avis clients
│   ├── TraiteurSection.tsx     # Section traiteur & événements
│   ├── ContactSection.tsx      # Coordonnées et contact
│   └── SiteFooter.tsx          # Pied de page
│
└── lib/
    ├── config.ts               # ⚙️  Numéro WhatsApp, email
    ├── products.ts             # Catalogue (27 produits, 9 catégories)
    ├── cart-store.tsx          # Context React + reducer panier
    └── whatsapp.ts             # Génération message WhatsApp
```

---

## Modifier le numéro WhatsApp

Ouvrez **`src/lib/config.ts`** :

```typescript
export const WHATSAPP_NUMBER = "+33600000000"; // ← votre numéro ici
```

Format attendu : `+[code pays][numéro]`, ex. `+33612345678`.

---

## Modifier les produits

Ouvrez **`src/lib/products.ts`** et éditez le tableau `PRODUCTS` :

```typescript
{
  id: "identifiant-unique",
  name: "Nom du produit",
  category: "salades",          // menus | salades | biscuits | gateaux |
                                 // specialites | boissons | condiments |
                                 // epicerie | traiteur
  description: "Description courte.",
  price: 9.50,                  // number | null  (null = "Sur devis")
  image: "https://images.unsplash.com/photo-...",
  glutenFree: true,
  lactoseFree: true,
  featured: true,               // optionnel — affiché en page d'accueil
}
```

---

## Remplacer les images

Les images sont des URLs Unsplash en placeholder.

Pour utiliser vos propres photos :
1. Placez vos fichiers dans `public/images/`
2. Remplacez les URLs dans `products.ts` : `/images/nom-fichier.jpg`

---

## Déploiement sur Vercel

**Via l'interface :**
1. Importez ce dépôt sur [vercel.com](https://vercel.com)
2. Framework preset : **Next.js** (auto-détecté)
3. Cliquez **Deploy**

**Via la CLI :**
```bash
npx vercel
```

---

## Commandes utiles

```bash
npm run dev          # Développement local
npm run build        # Build production
npm run typecheck    # Vérification TypeScript
npm run lint         # ESLint
npm run format       # Prettier
```

---

*Les Ateliers de la Forme — Cuisine caribéenne premium, sans gluten et sans lactose. Fondé en 2017 par Thierry Fanchone.*

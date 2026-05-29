"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Leaf, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { CATEGORY_LABELS } from "@/lib/products";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addToCart, openCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    openCart();
  };

  const devisURL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[\s+\-()]/g, "")}?text=${encodeURIComponent(
    `Bonjour, je suis intéressé par : ${product.name}. Pourriez-vous m'envoyer un devis ?`
  )}`;

  return (
    <motion.div
      className="card-dark group flex flex-col overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.glutenFree && (
            <span className="badge-gl">
              <Leaf size={9} />
              Sans gluten
            </span>
          )}
          {product.lactoseFree && (
            <span className="badge-gl">
              <Leaf size={9} />
              Sans lactose
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-gold/50">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mb-2 font-serif text-base leading-snug text-cream transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        <p className="mb-4 flex-1 text-xs leading-relaxed text-cream/45">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          {product.price !== null ? (
            <>
              <span className="font-serif text-xl text-gold">
                {product.price.toFixed(2)} €
              </span>
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 border border-gold/30 px-3 py-2 text-[11px] uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-deep"
              >
                <ShoppingCart size={11} />
                Ajouter
              </button>
            </>
          ) : (
            <>
              <span className="text-sm font-medium italic text-cream/40">
                Sur devis
              </span>
              <a
                href={devisURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 border border-[#25D366]/30 px-3 py-2 text-[11px] uppercase tracking-widest text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle size={11} />
                Devis
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

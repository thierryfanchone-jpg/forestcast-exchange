"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import type { CartItem as CartItemType } from "@/lib/cart-store";

type Props = {
  item: CartItemType;
};

export function CartItemRow({ item }: Props) {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 border-b border-cream/5 pb-4 last:border-0">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <p className="truncate text-sm font-medium text-cream">{product.name}</p>
        <p className="mt-0.5 text-xs text-gold">
          {product.price !== null
            ? `${(product.price * quantity).toFixed(2)} €`
            : "Sur devis"}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            aria-label="Diminuer la quantité"
            className="flex h-6 w-6 items-center justify-center border border-cream/15 text-cream/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Minus size={10} />
          </button>
          <span className="w-5 text-center text-sm tabular-nums text-cream">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            aria-label="Augmenter la quantité"
            className="flex h-6 w-6 items-center justify-center border border-cream/15 text-cream/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus size={10} />
          </button>

          <button
            onClick={() => removeFromCart(product.id)}
            aria-label="Retirer du panier"
            className="ml-auto text-cream/25 transition-colors hover:text-danger"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

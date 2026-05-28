"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { CartItemRow } from "./CartItem";
import { WhatsAppOrder } from "./WhatsAppOrder";

export function Cart() {
  const { state, closeCart, clearCart, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-deep/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-surface-1 shadow-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cream/8 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingCart size={17} className="text-gold" />
                <span className="font-serif text-lg text-cream">Mon Panier</span>
                {totalItems > 0 && (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-deep">
                    {totalItems}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {state.items.length > 0 && (
                  <button
                    onClick={clearCart}
                    title="Vider le panier"
                    className="flex h-8 w-8 items-center justify-center text-cream/25 transition-colors hover:text-danger"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
                <button
                  onClick={closeCart}
                  aria-label="Fermer le panier"
                  className="flex h-8 w-8 items-center justify-center text-cream/40 transition-colors hover:text-cream"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {state.items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingCart size={44} className="text-cream/15" />
                  <p className="text-sm text-cream/40">Votre panier est vide</p>
                  <p className="text-[11px] text-cream/25">
                    Ajoutez des produits pour passer commande
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 border border-gold/30 px-6 py-2.5 text-[11px] uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-deep"
                  >
                    Voir les produits
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <CartItemRow key={item.product.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-cream/8 px-6 py-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-cream/50">
                    Total estimé
                  </span>
                  <span className="font-serif text-2xl text-gold">
                    {totalPrice.toFixed(2)} €
                  </span>
                </div>
                <WhatsAppOrder />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

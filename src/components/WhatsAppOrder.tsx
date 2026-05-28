"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { buildOrderMessage, whatsappURL } from "@/lib/whatsapp";

type FormState = {
  customerName: string;
  phone: string;
  address: string;
  comment: string;
};

const EMPTY: FormState = {
  customerName: "",
  phone: "",
  address: "",
  comment: "",
};

export function WhatsAppOrder() {
  const { state, clearCart, closeCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  const set = (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = buildOrderMessage({ items: state.items, ...form });
    window.open(whatsappURL(message), "_blank", "noopener,noreferrer");
    clearCart();
    closeCart();
    setForm(EMPTY);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(true)} className="btn-whatsapp">
        <MessageCircle size={16} />
        Commander sur WhatsApp
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <p className="mb-1 text-[11px] uppercase tracking-widest text-cream/40">
        Vos informations
      </p>

      <input
        type="text"
        placeholder="Votre nom *"
        required
        value={form.customerName}
        onChange={set("customerName")}
        className="input-dark"
        autoComplete="name"
      />
      <input
        type="tel"
        placeholder="Téléphone *"
        required
        value={form.phone}
        onChange={set("phone")}
        className="input-dark"
        autoComplete="tel"
      />
      <input
        type="text"
        placeholder="Adresse ou lieu de retrait *"
        required
        value={form.address}
        onChange={set("address")}
        className="input-dark"
        autoComplete="street-address"
      />
      <textarea
        placeholder="Commentaire (optionnel)"
        value={form.comment}
        onChange={set("comment")}
        rows={2}
        className="input-dark resize-none"
      />

      <button type="submit" className="btn-whatsapp mt-1">
        <MessageCircle size={16} />
        Envoyer la commande
      </button>

      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="flex w-full items-center justify-center gap-1.5 py-1.5 text-[11px] text-cream/30 transition-colors hover:text-cream/60"
      >
        <ArrowLeft size={12} />
        Retour
      </button>
    </form>
  );
}

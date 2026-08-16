import { +596696082573 } from "./config";
import type { CartItem } from "./cart-store";

export type OrderData = {
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  comment: string;
};

export function buildOrderMessage(order: OrderData): string {
  const total = order.items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  );

  const lines = order.items
    .map((item) => {
      const lineTotal =
        item.product.price !== null
          ? `${(item.product.price * item.quantity).toFixed(2)} €`
          : "Sur devis";
      return `• ${item.product.name} x${item.quantity} — ${lineTotal}`;
    })
    .join("\n");

  const parts: string[] = [
    "🛒 *Commande — Les Ateliers de la Forme*",
    "",
    `👤 *Client :* ${order.customerName}`,
    `📞 *Téléphone :* ${order.phone}`,
    `📍 *Adresse / Retrait :* ${order.address}`,
    "",
    "📦 *Produits commandés :*",
    lines,
    "",
    `💰 *Total :* ${total.toFixed(2)} €`,
  ];

  if (order.comment.trim()) {
    parts.push("", `💬 *Commentaire :* ${order.comment.trim()}`);
  }

  parts.push("", "_Commande passée via lesateliersdelaforme.com_");

  return parts.join("\n");
}

export function whatsappURL(message: string): string {
  const number = WHATSAPP_NUMBER.replace(/[\s+\-()]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

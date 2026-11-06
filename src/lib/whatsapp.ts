import { companyContact } from "./site-content";

// Only public journey context is included. Visitor-entered form fields are never
// placed in this third-party URL, and opening it does not send a message.
export function getWhatsAppLink(journey?: "buyer" | "partner"): string {
  const message =
    journey === "buyer"
      ? "Hello Standards, I would like to discuss product sourcing."
      : journey === "partner"
        ? "Hello Standards, I would like to discuss a manufacturing or export partnership."
        : "Hello Standards, I would like to discuss a trade inquiry.";
  return `https://wa.me/${companyContact.whatsappNumber.slice(1)}?text=${encodeURIComponent(message)}`;
}

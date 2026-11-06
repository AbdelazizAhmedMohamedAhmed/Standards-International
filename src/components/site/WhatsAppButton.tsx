import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <aside aria-label="WhatsApp Business contact">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Standards on WhatsApp (opens in a new tab)"
        className="fixed z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#075e54] px-4 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#064d44] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          right: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <MessageCircle className="size-6" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}

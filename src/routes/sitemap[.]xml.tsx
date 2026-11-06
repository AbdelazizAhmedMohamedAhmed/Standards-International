import { createFileRoute } from "@tanstack/react-router";
import { services, SITE_URL } from "@/lib/site-content";

const PAGES = ["", "/about", "/services", "/industries", "/how-we-work", "/faq", "/contact", "/credits"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [...PAGES, ...services.map((s) => `/services/${s.id}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});

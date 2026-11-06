import { createFileRoute } from "@tanstack/react-router";
import { sitemapXml } from "@/lib/public-site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        return new Response(sitemapXml(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { termsOfUse } from "@/lib/legal-content";
import { SITE_URL } from "@/lib/site-content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Website Terms of Use — Standards" },
      { name: "description", content: termsOfUse.description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: () => <LegalPage document={termsOfUse} />,
});

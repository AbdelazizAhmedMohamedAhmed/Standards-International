import { createFileRoute } from "@tanstack/react-router";
import { mediaCredits, SITE_URL } from "@/lib/site-content";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Photo & Video Credits — STANDARDS for International Trade" },
      { name: "description", content: "Sources and licenses for the photographs and videos used on the STANDARDS website." },
      { property: "og:title", content: "Photo & Video Credits — STANDARDS" },
      { property: "og:description", content: "Sources and licenses for the site's photographs and videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: `${SITE_URL}/credits` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/credits` }],
  }),
  component: Credits,
});

function Credits() {
  return (
    <section className="container-x py-20">
      <p className="eyebrow">Credits</p>
      <h1 className="mt-4 text-4xl font-serif font-medium tracking-tight">Photo & video credits</h1>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {mediaCredits.map((c) => (
          <li key={c.item} className="grid gap-1 py-4 md:grid-cols-3">
            <span className="font-semibold">{c.item}</span>
            <span className="text-muted-foreground">{c.author} · {c.license}</span>
            <a href={c.url} target="_blank" rel="noreferrer" className="text-primary underline md:text-right">Source</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

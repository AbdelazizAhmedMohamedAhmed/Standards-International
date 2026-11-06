import { SITE_URL } from "@/lib/site-content";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import food from "@/assets/photo-food.jpg";
import building from "@/assets/building-reinforcement-steel.jpg.asset.json";
import packaging from "@/assets/photo-packaging.jpg";
import chemicals from "@/assets/photo-chemicals.jpg";
import furniture from "@/assets/photo-furniture.jpg";
import { industries, industryDescriptions, industryProducts } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

// Same order as `industries` in site-content.ts
const photos = [packaging, chemicals, building.url, food, furniture];

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — STANDARDS for International Trade" },
      { name: "description", content: "STANDARDS focuses on packaging materials, chemicals, building materials, food and beverages, and furniture for sourcing and international trade." },
      { property: "og:title", content: "Industries — STANDARDS" },
      { property: "og:description", content: "Packaging materials, chemicals, building materials, food and beverages, and furniture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/industries` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/industries` }],
  }),
  component: Industries,
});

function Industries() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x flex flex-col justify-between gap-4 py-8 md:flex-row md:items-end md:py-10">
          <div>
            <p className="eyebrow">STANDARDS / FOR INTERNATIONAL TRADE</p>
            <h1 className="mt-3 text-3xl font-serif font-medium tracking-tight leading-tight md:text-4xl">Industries</h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Five focused sectors. The same attention to specification, quality and commercial terms.</p>
        </div>
      </section>

      <div className="container-x divide-y divide-border">
        {industries.map((name, i) => (
          <section key={name} id={`sector-${i + 1}`} className="grid items-center gap-6 py-10 md:grid-cols-2 md:gap-10">
            <div className={`overflow-hidden bg-muted ${i % 2 ? "md:order-2" : ""}`}>
              <img src={photos[i]} alt={name === "Building Materials" ? "Close-up of ribbed steel reinforcement bars" : `${name}: ${industryDescriptions[i]}`} width={960} height={640} loading={i < 1 ? "eager" : "lazy"} className="aspect-[3/2] w-full object-cover" />
            </div>
            <div>
              <span className="font-display text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-1 text-2xl font-serif font-medium tracking-tight">{name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{industryDescriptions[i]}</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {industryProducts[i]?.map((p) => (
                  <li key={p.name} className="border-l-2 border-primary pl-3">
                    <h3 className="text-sm font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-navy text-navy-foreground">
        <div className="container-x flex flex-col justify-between gap-5 py-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-navy-foreground">Don't see your product?</h2>
            <p className="mt-2 text-sm text-navy-foreground/75">Tell us which products you're looking for.</p>
          </div>
          <Button asChild className="shrink-0"><Link to="/contact">Send a trade inquiry <ArrowRight /></Link></Button>
        </div>
      </section>
    </>
  );
}

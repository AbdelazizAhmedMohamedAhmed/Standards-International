import { SITE_URL } from "@/lib/site-content";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import supplyChainPoster from "@/assets/real-warehouse.jpg";
import { services } from "@/lib/site-content";
import { PageHero, CtaBand } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — STANDARDS for International Trade" },
      { name: "description", content: "Trading, sourcing, supplier discovery, matchmaking, procurement, export development and logistics coordination." },
      { property: "og:title", content: "Services — STANDARDS" },
      { property: "og:description", content: "Seven trade services from sourcing to logistics coordination." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Our services" title="From first inquiry to final delivery." intro="Seven connected services that help businesses trade internationally with confidence." />
      <img src={supplyChainPoster} alt="Warehouse and logistics operations" className="aspect-video w-full bg-navy object-contain" />
      <section className="container-x py-12">
        {services.map((s, i) => (
          <article key={s.id} id={s.id} className="grid gap-6 border-b border-border py-14 md:grid-cols-12">
            <span className="font-display text-5xl font-black text-primary md:col-span-2">0{i + 1}</span>
            <h2 className="text-2xl font-serif font-medium tracking-tight md:col-span-4 md:text-3xl">{s.title}</h2>
            <div className="md:col-span-6">
              <p className="font-semibold text-navy">{s.short}</p>
              <p className="mt-3 text-muted-foreground">{s.body}</p>
              <Link to="/services/$serviceId" params={{ serviceId: s.id }} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">
                Scope, deliverables & FAQ <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <CtaBand />
    </>
  );
}

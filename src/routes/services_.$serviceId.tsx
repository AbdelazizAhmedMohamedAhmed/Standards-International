import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services, serviceDetails, SITE_URL } from "@/lib/site-content";
import { PageHero, CtaBand } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/services_/$serviceId")({
  loader: ({ params }) => {
    const service = services.find((s) => s.id === params.serviceId);
    const detail = serviceDetails[params.serviceId];
    if (!service || !detail) throw notFound();
    return { service, detail };
  },
  head: ({ params, loaderData }) => {
    const url = `${SITE_URL}/services/${params.serviceId}`;
    if (!loaderData) return { meta: [{ title: "Service unavailable — STANDARDS" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.service.title} — STANDARDS for International Trade`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.service.short + " " + loaderData.detail.audience },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.service.short },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: loaderData.service.title, description: loaderData.service.body, provider: { "@type": "Organization", name: "STANDARDS for International Trade", url: SITE_URL } }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: loaderData.service.title, item: url },
        ] }) },
      ],
    };
  },
  component: ServicePage,
});

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t-2 border-navy pt-5">
      <h2 className="font-serif text-2xl font-medium tracking-tight">{title}</h2>
      <ul className="mt-4 space-y-2 text-muted-foreground">
        {items.map((i) => <li key={i} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-primary" />{i}</li>)}
      </ul>
    </div>
  );
}

function ServicePage() {
  const { service, detail } = Route.useLoaderData();
  const idx = services.findIndex((s) => s.id === service.id);
  return (
    <>
      <nav aria-label="Breadcrumb" className="container-x pt-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/services" className="hover:text-primary">Services</Link> / <span className="text-navy">{service.title}</span>
      </nav>
      <PageHero eyebrow={`Service 0${idx + 1} / 07`} title={service.title} intro={service.body} />
      <section className="container-x grid gap-12 py-16 md:grid-cols-2">
        <div className="border-t-2 border-primary pt-5 md:col-span-2">
          <p className="eyebrow">Who it's for</p>
          <p className="mt-3 max-w-3xl text-lg text-navy">{detail.audience}</p>
        </div>
        <List title="Problems we help solve" items={detail.problems} />
        <List title="Scope of service" items={detail.scope} />
        <List title="What you receive" items={detail.deliverables} />
        <div className="border-t-2 border-navy pt-5">
          <h2 className="font-serif text-2xl font-medium tracking-tight">How it works</h2>
          <p className="mt-4 text-muted-foreground">Every engagement follows our six-stage trade process, from first inquiry to follow-up.</p>
          <Link to="/how-we-work" className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">See the process <ArrowRight className="size-4" /></Link>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl font-medium tracking-tight">Questions</h2>
          <dl className="mt-4 divide-y divide-border border-y border-border">
            {detail.faq.map((f) => <div key={f.q} className="py-4"><dt className="font-semibold text-navy">{f.q}</dt><dd className="mt-1 text-muted-foreground">{f.a}</dd></div>)}
          </dl>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

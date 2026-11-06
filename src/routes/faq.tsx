import { faqs, SITE_URL } from "@/lib/site-content";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/SiteChrome";
import { FaqAnswers } from "@/components/site/FaqAnswers";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Standards" },
      {
        name: "description",
        content:
          "Answers about STANDARDS trade services, focus sectors, supplier sourcing, export opportunities and inquiry requirements.",
      },
      { property: "og:title", content: "Trade & Sourcing FAQ — STANDARDS" },
      {
        property: "og:description",
        content:
          "Common questions about products, sourcing, export and trade coordination at STANDARDS for International Trade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          url: `${SITE_URL}/faq`,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions."
        intro="Products, sourcing and international trade — the essentials, answered clearly."
      />
      <section className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <p className="eyebrow">Trade essentials</p>
          <h2 className="mt-4 font-serif text-2xl font-medium text-navy">
            From first inquiry to coordination.
          </h2>
          <Link
            to="/industries"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Explore our products <ArrowUpRight className="size-4" />
          </Link>
        </aside>
        <div className="min-w-0 lg:col-span-9">
          <FaqAnswers />
        </div>
      </section>
    </>
  );
}

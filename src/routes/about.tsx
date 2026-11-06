import { SITE_URL } from "@/lib/site-content";
import { createFileRoute } from "@tanstack/react-router";
import tradeImage from "@/assets/about-international-trade.jpg";
import { PageHero, CtaBand } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — STANDARDS for International Trade" },
      { name: "description", content: "Our mission, vision and values as an Egyptian international trading company." },
      { property: "og:title", content: "About STANDARDS" },
      { property: "og:description", content: "Mission, vision, values and approach of STANDARDS for International Trade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: About,
});

const values = [
  ["Integrity", "We say what we can deliver, and deliver what we say."],
  ["Precision", "Clear specifications and careful evaluation guide every decision."],
  ["Partnership", "We aim for long-term relationships, not single transactions."],
  ["Ambition", "We look beyond borders for the best opportunities for our partners."],
];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="An Egyptian trading house with international ambition." intro="We connect businesses with products, partners and markets across borders, guided by the standards in our name." />
      <section className="container-x grid gap-16 py-24 md:grid-cols-2">
        <div>
          <p className="eyebrow">Mission</p>
          <p className="mt-4 text-2xl font-display font-semibold text-navy">To make international trade clearer, safer and more rewarding for the businesses we serve.</p>
        </div>
        <div>
          <p className="eyebrow">Vision</p>
          <p className="mt-4 text-2xl font-display font-semibold text-navy">To become a trusted reference for international trading partnerships from Egypt.</p>
        </div>
      </section>
      <img src={tradeImage} alt="AI-created illustration of a modern trade office overlooking a container port" width={1536} height={768} loading="lazy" className="h-[280px] w-full object-cover md:h-[420px]" />
      <section className="container-x py-24">
        <p className="eyebrow">Values</p>
        <h2 className="mt-4 text-3xl font-serif font-medium tracking-tight md:text-5xl">What we stand for</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {values.map(([t, b]) => (
            <div key={t} className="border-t-2 border-primary pt-5">
              <h3 className="text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-card">
        <div className="container-x grid gap-12 py-24 md:grid-cols-2">
          <h2 className="text-3xl font-serif font-medium tracking-tight md:text-4xl">Our professional approach</h2>
          <p className="text-lg text-muted-foreground">Every engagement starts with listening. We define requirements together, evaluate options objectively and keep every party informed — from the first inquiry to the final delivery.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

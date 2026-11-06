import { SITE_URL } from "@/lib/site-content";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroPoster from "@/assets/video-port-day-poster.jpg";
import pPack from "@/assets/photo-packaging.jpg";
import pChem from "@/assets/photo-chemicals.jpg";
import pBuild from "@/assets/photo-building-materials.jpg";
import pFood from "@/assets/photo-food.jpg";
import pFurn from "@/assets/photo-furniture.jpg";
import meeting from "@/assets/real-meeting.jpg";
import ship from "@/assets/real-ship.jpg";
import factory from "@/assets/real-inspection.jpg";
import handshake from "@/assets/real-handshake.jpg";
import { services, steps, industries } from "@/lib/site-content";
import { CtaBand } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STANDARDS — Connecting Markets. Building Opportunities." },
      { name: "description", content: "International trading, global sourcing, and trusted commercial partnerships connecting businesses across borders." },
      { property: "og:title", content: "STANDARDS for International Trade" },
      { property: "og:description", content: "International trading, global sourcing, and trusted commercial partnerships." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

// Same order as `industries` in site-content.
const sectorPhotos = [pPack, pChem, pBuild, pFood, pFurn];

const reasons = [
  { t: "Clear standards", b: "Every inquiry is handled against defined requirements for quality, specification and terms." },
  { t: "Commercial integrity", b: "Transparent communication with buyers and suppliers at every step." },
  { t: "Focused matchmaking", b: "We connect parties based on real fit, not volume of introductions." },
  { t: "End-to-end coordination", b: "From first inquiry to delivery, one team keeps the process organised." },
];

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy">
        <img src={heroPoster} alt="" aria-hidden className="absolute inset-0 -z-10 size-full object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        <div className="container-x py-28 md:py-40">
          <p className="eyebrow fade-up !text-gold">International Trade · Egypt</p>
          <h1 className="fade-up mt-6 max-w-3xl text-5xl font-serif font-medium tracking-tight leading-[1.04] text-navy-foreground md:text-7xl">
            Connecting Markets. <span className="text-primary">Building</span> Opportunities.
          </h1>
          <p className="fade-up mt-8 max-w-xl text-lg text-navy-foreground/80">
            International trading, global sourcing, and trusted commercial partnerships — connecting businesses with opportunities across borders.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:bg-background hover:text-navy">
              Start a trade inquiry <ArrowRight className="size-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center border border-navy-foreground/40 px-7 py-4 font-semibold text-navy-foreground transition hover:border-navy-foreground">
              Our services
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-4 text-3xl font-serif font-medium tracking-tight md:text-5xl">A trading house built on standards.</h2>
        </div>
        <div className="space-y-5 text-lg text-muted-foreground md:col-span-6 md:col-start-7">
          <p>STANDARDS for International Trade is an Egyptian trading company working with manufacturers, importers, exporters and procurement teams.</p>
          <p>We help businesses source products, find dependable partners and move goods across borders, with clear processes and honest communication.</p>
          <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-primary">About us <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-x py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Core services</p>
              <h2 className="mt-4 text-3xl font-serif font-medium tracking-tight md:text-5xl">What we do</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-primary">All services <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-14 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <div key={s.id} className="group border-b border-border py-8 pr-8 md:border-r md:pl-8 md:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(2n+1)]:pl-8 lg:[&:nth-child(3n+1)]:pl-0">
                <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-16 py-24 md:grid-cols-2">
        <img src={meeting} alt="Taking notes during a business meeting" width={1280} height={1600} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        <div>
          <p className="eyebrow">Why STANDARDS</p>
          <h2 className="mt-4 text-3xl font-serif font-medium tracking-tight md:text-5xl">The name is our promise.</h2>
          <div className="mt-10 space-y-8">
            {reasons.map((r) => (
              <div key={r.t} className="border-l-2 border-primary pl-6">
                <h3 className="text-lg font-bold">{r.t}</h3>
                <p className="mt-1 text-muted-foreground">{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-navy-foreground">
        <div className="container-x py-24">
          <p className="eyebrow">Industries</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-serif font-medium tracking-tight text-navy-foreground md:text-5xl">Sectors we focus on</h2>
          <ul className="mt-12 grid gap-px bg-navy-foreground/10 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((name, i) => (
              <li key={name} className="bg-navy">
                <Link to="/industries" className="group block overflow-hidden">
                  <img src={sectorPhotos[i]} alt={name} loading="lazy" width={960} height={640} className="aspect-[3/2] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  <span className="block p-5 font-display font-semibold">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-24">
        <p className="eyebrow">Commercial process</p>
        <h2 className="mt-4 text-3xl font-serif font-medium tracking-tight md:text-5xl">How we work</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-navy pt-5 first:border-primary">
              <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x grid gap-4 pb-24 md:grid-cols-3">
        {[
          [ship, "Container ship at sea", "Moving goods across borders"],
          [factory, "Inspector checking a bottling line", "Checking quality at the source"],
          [handshake, "Business partners shaking hands over an agreement", "Building lasting partnerships"],
        ].map(([src, alt, cap]) => (
          <figure key={cap} className="group overflow-hidden">
            <img src={src} alt={alt} loading="lazy" width={1600} height={1008} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
            <figcaption className="mt-3 font-display text-sm font-semibold text-navy">{cap}</figcaption>
          </figure>
        ))}
      </section>

      <section className="border-t border-border bg-card">
        <div className="container-x py-24">
          <p className="eyebrow">Start here</p>
          <h2 className="mt-4 text-3xl font-serif font-medium tracking-tight md:text-5xl">Two ways to work with us</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { k: "buyer", who: "For buyers & importers", t: "Request product sourcing", b: "Share your product, specifications, quantity and destination. We identify suppliers and compare offers.", cta: "Request product sourcing" },
              { k: "partner", who: "For manufacturers & exporters", t: "Become a trade partner", b: "Tell us about your products, capabilities and target markets. We look for buyers that fit.", cta: "Become a trade partner" },
            ].map((p) => (
              <div key={p.k} className="flex flex-col border-t-2 border-primary bg-background p-8">
                <p className="eyebrow">{p.who}</p>
                <h3 className="mt-3 font-serif text-2xl font-medium">{p.t}</h3>
                <p className="mt-3 flex-1 text-muted-foreground">{p.b}</p>
                <Link to="/contact" search={{ type: p.k as "buyer" | "partner" }} className="mt-6 inline-flex items-center gap-2 self-start bg-navy px-6 py-3 font-semibold text-navy-foreground transition hover:bg-primary">
                  {p.cta} <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

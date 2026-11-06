import { SITE_URL } from "@/lib/site-content";
import { createFileRoute } from "@tanstack/react-router";
import factory from "@/assets/real-inspection.jpg";
import handshake from "@/assets/real-handshake.jpg";
import { steps, processDetails, tradePreparation } from "@/lib/site-content";
import { CtaBand } from "@/components/site/SiteChrome";
import { FaqAnswers } from "@/components/site/FaqAnswers";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How We Work — Standards for International Trade" },
      {
        name: "description",
        content:
          "Explore STANDARDS’ six-step trade process, what to prepare for sourcing, supplier evaluation and order coordination, plus common trade questions.",
      },
      { property: "og:title", content: "How We Work — STANDARDS" },
      {
        property: "og:description",
        content:
          "From your product brief to order coordination: six stages, practical preparation and trade FAQs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/how-we-work` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/how-we-work` }],
  }),
  component: HowWeWork,
});

function HowWeWork() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow">How we work</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight text-navy md:text-5xl">
            From product brief to trade coordination.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Six stages to clarify your requirements, compare opportunities and coordinate the
            details of a cross-border order.
          </p>
          <ol
            aria-label="Process overview"
            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 md:grid-cols-3 lg:grid-cols-6"
          >
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex items-center gap-3 text-sm font-semibold text-navy"
              >
                <span className="text-xs font-normal text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.title}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="hidden space-y-6 lg:block">
          <img
            src={factory}
            alt="Inspector checking a bottling line"
            width={1280}
            height={1600}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <img
            src={handshake}
            alt="Business partners shaking hands"
            width={1600}
            height={1008}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
        <ol className="relative self-start border-l-2 border-border">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-14 pl-10 last:pb-0">
              <span className="absolute -left-[9px] top-1 size-4 bg-primary" />
              <span className="font-display text-sm font-bold text-primary">Step 0{i + 1}</span>
              <h2 className="mt-1 text-3xl font-serif font-medium tracking-tight">{s.title}</h2>
              <p className="mt-2 text-base font-semibold text-navy">{processDetails[i]?.focus}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                {processDetails[i]?.detail}
              </p>
              <p className="mt-4 max-w-xl border-l-2 border-gold pl-4 text-sm leading-relaxed text-navy">
                <span className="font-semibold">Stage outcome: </span>
                {processDetails[i]?.outcome}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="border-t border-border bg-card">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow">Before we begin</p>
          <h2 className="mt-4 font-serif text-3xl font-medium text-navy md:text-4xl">
            What to prepare.
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {tradePreparation.map((item) => (
              <div key={item.title} className="border-t border-border pt-5">
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Exact requirements vary by product and destination. Certification, inspection, payment
            and delivery arrangements must be confirmed for each request.
          </p>
        </div>
      </section>
      <section className="border-t border-border">
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-navy">
              Frequently asked questions.
            </h2>
          </div>
          <div className="min-w-0 lg:col-span-9">
            <FaqAnswers />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

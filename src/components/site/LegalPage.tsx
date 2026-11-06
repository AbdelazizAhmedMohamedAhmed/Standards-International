import type { LegalDocument } from "@/lib/legal-content";
import { companyContact } from "@/lib/site-content";
import { PageHero } from "./SiteChrome";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHero eyebrow="Website information" title={document.title} intro={document.description} />
      <article className="container-x py-12 md:py-16">
        <div className="max-w-3xl space-y-10">
          <p className="text-sm text-muted-foreground">Last updated: {document.updated}</p>
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl font-medium">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <p>
            Questions:{" "}
            <a
              href={`mailto:${companyContact.generalEmail}`}
              className="text-primary underline underline-offset-4"
            >
              {companyContact.generalEmail}
            </a>
          </p>
        </div>
      </article>
    </>
  );
}

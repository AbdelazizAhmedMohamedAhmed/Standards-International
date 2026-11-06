import {
  companyContact,
  mediaCredits,
  faqs,
  industries,
  industryDescriptions,
  industryProducts,
  services,
  serviceDetails,
  processDetails,
  steps,
  tradePreparation,
  SITE_URL,
} from "./site-content";
import { privacyPolicy, termsOfUse, type LegalDocument } from "./legal-content";
import { getWhatsAppLink } from "./whatsapp";

// Add only verified business-owned profile URLs. A personal GitHub account is not
// evidence of an official business profile; an empty list is deliberately omitted.
export const verifiedOrganizationProfiles: string[] = [];

export type PublicPage = { path: string; title: string; description: string; body: string };
const bullets = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");
const contact = `General information: [${companyContact.generalEmail}](mailto:${companyContact.generalEmail}).\n\nSales and partnerships: [${companyContact.salesEmail}](mailto:${companyContact.salesEmail}).\n\nWhatsApp Business: [${companyContact.whatsappDisplay}](${getWhatsAppLink()}). Opening the chat does not send a message automatically.\n\nLocation: ${companyContact.location}.`;
const inquiryStatus =
  "Online inquiry sending is not enabled. The on-page checklist validates details locally; it does not send messages, upload files, or place orders. Contact sales by email or WhatsApp and attach relevant documents in your chosen application.";
const legalBody = (document: LegalDocument) =>
  `Last updated: ${document.updated}.\n\n${document.sections.map((section) => `## ${section.title}\n\n${section.paragraphs.join("\n\n")}`).join("\n\n")}\n\n${contact}`;

export const publicPages: PublicPage[] = [
  {
    path: "/",
    title: "Standards — Connecting Markets. Building Opportunities.",
    description:
      "Egyptian international trading, product sourcing and commercial partnerships for buyers and manufacturers.",
    body: `Standards for International Trade is an Egyptian trading company working with manufacturers, importers, exporters and procurement teams.\n\n## Services\n\n${services.map((service) => `- [${service.title}](${SITE_URL}/services/${service.id}): ${service.short}`).join("\n")}\n\n## Focus sectors\n\n${bullets(industries)}\n\n## Work with Standards\n\n- [Request product sourcing](${SITE_URL}/contact?type=buyer)\n- [Become a trade partner](${SITE_URL}/contact?type=partner)\n\n${inquiryStatus}\n\n## Contact\n\n${contact}`,
  },
  {
    path: "/about",
    title: "About Standards for International Trade",
    description:
      "An Egyptian trading house connecting businesses with products, partners and international markets.",
    body: `Standards is based in ${companyContact.location}. It helps businesses source products, identify trading partners and coordinate cross-border opportunities.\n\nMission: make international trade clearer, safer and more rewarding for the businesses it serves.\n\nValues: integrity, precision, partnership and ambition.\n\nServices are evaluated for each inquiry; no customer list, certification, registration number or track record is implied by this summary.\n\n${contact}`,
  },
  {
    path: "/services",
    title: "Trade services — Standards",
    description:
      "Seven services covering sourcing, supplier discovery, procurement, export development and logistics coordination.",
    body: `${services.map((service) => `## [${service.title}](${SITE_URL}/services/${service.id})\n\n${service.body}`).join("\n\n")}\n\n[Watch the supplied services overview video](${SITE_URL}/videos/standards-services-overview.mp4).\n\n${contact}`,
  },
  {
    path: "/industries",
    title: "Industries — Standards",
    description:
      "Packaging Materials, Chemicals, Building Materials, Food & Beverages, and Furniture.",
    body: industries
      .map(
        (industry, i) =>
          `## ${industry}\n\n${industryDescriptions[i]}\n\n${bullets((industryProducts[i] ?? []).map((product) => `${product.name}: ${product.body}`))}`,
      )
      .join("\n\n"),
  },
  {
    path: "/how-we-work",
    title: "How Standards works",
    description:
      "Six stages from product brief to trade coordination, with practical inquiry preparation.",
    body: `${steps.map((step, i) => `## ${i + 1}. ${step.title}\n\n${step.body}\n\n${processDetails[i]?.detail ?? ""}`).join("\n\n")}\n\n## What to prepare\n\n${bullets(tradePreparation.map((item) => `${item.title}: ${item.body}`))}`,
  },
  {
    path: "/faq",
    title: "Frequently asked questions — Standards",
    description:
      "Answers about trade services, sourcing, manufacturers, product sectors and inquiry requirements.",
    body: faqs.map((faq) => `## ${faq.question}\n\n${faq.answer}`).join("\n\n"),
  },
  {
    path: "/contact",
    title: "Contact and trade inquiries — Standards",
    description:
      "Contact Standards in Cairo for general information, product sourcing and manufacturer partnerships.",
    body: `${contact}\n\n## Buyer inquiries\n\nProvide your name, company, email, country, product category, specifications, quantity, destination and timeline.\n\n## Manufacturer and partner inquiries\n\nProvide your name, company, email, country, product categories, capabilities and target markets.\n\n${inquiryStatus}\n\n[Privacy Policy](${SITE_URL}/privacy) · [Website Terms](${SITE_URL}/terms)`,
  },
  {
    path: "/credits",
    title: "Photo and video credits — Standards",
    description: "Sources and attribution information for the media used on the Standards website.",
    body: `${mediaCredits.map((credit) => `## ${credit.item}\n\nAuthor: ${credit.author}.\n\nLicense: ${credit.license}.\n\n[Source](${credit.url.startsWith("/") ? `${SITE_URL}${credit.url}` : credit.url})`).join("\n\n")}\n\nThird-party media retain their respective rights and license conditions. Public agent access does not grant a blanket media license.`,
  },
  {
    path: "/terms",
    title: termsOfUse.title,
    description: termsOfUse.description,
    body: legalBody(termsOfUse),
  },
  {
    path: "/privacy",
    title: privacyPolicy.title,
    description: privacyPolicy.description,
    body: legalBody(privacyPolicy),
  },
  ...services.map((service) => {
    const detail = serviceDetails[service.id]!;
    return {
      path: `/services/${service.id}`,
      title: `${service.title} — Standards`,
      description: service.short,
      body: `${service.body}\n\n## Who it is for\n\n${detail.audience}\n\n## Problems addressed\n\n${bullets(detail.problems)}\n\n## Scope\n\n${bullets(detail.scope)}\n\n## Deliverables\n\n${bullets(detail.deliverables)}\n\n## Questions\n\n${detail.faq.map((faq) => `### ${faq.q}\n\n${faq.a}`).join("\n\n")}\n\n${inquiryStatus}\n\n${contact}`,
    };
  }),
];

export const findPublicPage = (path: string) => publicPages.find((page) => page.path === path);
export const markdownPath = (path: string) => (path === "/" ? "/index.md" : `${path}.md`);
export const canonicalPageUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
export function renderPageMarkdown(page: PublicPage): string {
  return `# ${page.title}\n\n${page.description}\n\nCanonical: ${canonicalPageUrl(page.path)}\n\n${page.body}\n\n---\n\n[About](${SITE_URL}/about) · [Contact](${SITE_URL}/contact) · [Terms](${SITE_URL}/terms) · [Privacy](${SITE_URL}/privacy)\n`;
}

export function robotsText(): string {
  return `User-agent: *\nAllow: /\nContent-Signal: search=yes, ai-train=no\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
export function sitemapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPages.map((page) => `  <url><loc>${escapeXml(canonicalPageUrl(page.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}

export function llmsText(): string {
  return `# Standards for International Trade\n\n> Egyptian international trading, product sourcing and business partnerships. Based in ${companyContact.location}.\n\n${inquiryStatus}\n\n## Public pages\n\n${publicPages.map((page) => `- [${page.title}](${canonicalPageUrl(page.path)}): ${page.description}`).join("\n")}\n\n## Machine-readable access\n\n- [Sitemap](${SITE_URL}/sitemap.xml)\n- [Crawl and content-use policy](${SITE_URL}/robots.txt)\n- [Homepage Markdown](${SITE_URL}/index.md)\n- [MCP server card](${SITE_URL}/mcp/server-card)\n\nEvery listed page also supports an explicit .md representation or an Accept: text/markdown request. Public MCP and WebMCP tools return only public business information. They cannot send inquiries, place orders or read private visitor data.\n\n## Contact\n\n${contact}\n\n## Content use\n\nContent-Signal: search=yes, ai-train=no. Third-party media keep their own licenses. Official external social/directory profiles have not been supplied; none are asserted.\n`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Standards for International Trade",
    url: SITE_URL,
    description: "Egyptian international trading, product sourcing and commercial partnerships.",
    logo: `${SITE_URL}/standards-icon.jpg`,
    email: companyContact.generalEmail,
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "general information",
        email: companyContact.generalEmail,
      },
      {
        "@type": "ContactPoint",
        contactType: "sales and partnerships",
        email: companyContact.salesEmail,
      },
      {
        "@type": "ContactPoint",
        contactType: "WhatsApp business inquiries",
        telephone: companyContact.whatsappNumber,
        url: getWhatsAppLink(),
      },
    ],
    ...(verifiedOrganizationProfiles.length ? { sameAs: verifiedOrganizationProfiles } : {}),
  };
}

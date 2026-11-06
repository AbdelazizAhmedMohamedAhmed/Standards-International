## Project rules
- Site copy lists (services, steps, industries, inquiry types, FAQs) live in src/lib/site-content.ts so pages share one editable source.
- FAQ answers use the shared FaqAnswers component on the FAQ and How We Work pages to keep behavior consistent.
- Real media credits live in mediaCredits (src/lib/site-content.ts), shown on /credits; update it whenever a photo or video changes, since several licenses require attribution.
- SITE_URL in src/lib/site-content.ts is the single origin for canonical, og:url, sitemap and JSON-LD; change it there when the official domain is confirmed.
- Service detail pages (services_.$serviceId.tsx) read serviceDetails keyed by service id; add an entry whenever a service is added.

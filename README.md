# Standards International

Independent React and TanStack Start website built with Vite and Tailwind CSS.
Editable application source lives directly in this repository.

## Development

Use Node.js 22.12+ (Node 24 recommended) and Bun 1.4.4.

```sh
bun install --frozen-lockfile
npm run dev -- --host 127.0.0.1 --port 5173
```

Set `VITE_SITE_URL` in `.env.local` to your public origin before a production
build, for this site: `VITE_SITE_URL=https://standards-intl.com`.
Without it, metadata defaults to `https://standards-intl.com`.
Canonical URLs, structured data, robots.txt and the sitemap share this setting.
Only public values belong in `VITE_*` variables; they are bundled into client code.

## Verification and production

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

The production build creates a standalone Node server under `.output/server`.
Set `PORT` and `HOST` to choose its listening address.
No external project service or account is required to build or run the app.

## Agent access and website policies

Public crawl resources, llms.txt, Markdown variants, JSON-LD and discovery headers
are served by the application. `/mcp` is a public read-only endpoint using the
official MCP SDK; browser WebMCP registers where the browser supports it.
See [AGENT-READINESS.md](AGENT-READINESS.md) for endpoints, safeguards, verification
and the checklist. Official external profile URLs are still needed for `sameAs`.

Website-use terms and privacy information are available at `/terms` and
`/privacy`. Have the documents reviewed against the business's actual practices
and applicable law before relying on them; update them when data handling changes.

## Known limitations

- Inquiry sending is not enabled; the contact form validates details locally.
- The services page plays the supplied overview video from local files. The
  homepage uses a bundled still image; all displayed media are served locally.
- Automatic inquiry sending still requires a configured sending service. Direct
  email links and WhatsApp Business click-to-chat are available now. The floating
  button, footer and Contact page use the public number in `companyContact`;
  suggested messages contain no visitor-entered form data and are not auto-sent.
- Lint passes with six existing Fast Refresh development warnings.
- One moderate advisory remains in a transitive lint-tool dependency; see
  WEBSITE-IMPROVEMENTS.md for the audit scope and next steps.

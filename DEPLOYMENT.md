# Production deployment

Public origin: **https://standards-intl.com** (also the code default).

This is a server-rendered Node.js application. It must run as a Node.js app,
not as a static ZIP extracted into public_html. The source ZIP includes current
local changes; it does not rely on the older GitHub ZIP export.

## Runtime and build settings

- Node.js: 24 recommended (minimum 22.12).
- Dependencies: `bun install --frozen-lockfile` using Bun 1.4.4.
- Build command: `npm run build`.
- Build output: `.output`.
- Server entry: `.output/server/index.mjs`.
- Start command: `npm start`.
- Public build variable: `VITE_SITE_URL=https://standards-intl.com`.
- Configure the server to listen on the hosting platform's assigned `PORT`;
  use `HOST=0.0.0.0` if the platform requires a public listener.

Use a Hostinger plan supporting Node.js applications. Review its detected
framework, install command, output directory and server entry before starting
the build; do not deploy just `.output/public`, since it has no SSR server.

## Before switching traffic

Inspect the existing website and DNS first. Preserve MX, SPF, DKIM, DMARC and
domain-verification records. Do not replace an existing website without
confirming which site will be overwritten. Enable HTTPS for the apex domain;
redirect www to the apex after inspecting its current use.

## Verify after deployment

- Home, contact and service detail pages render the expected site content.
- Bundled images respond successfully.
- Canonical URLs and structured data use the production origin.
- `/robots.txt` lists `https://standards-intl.com/sitemap.xml`.
- `/sitemap.xml` uses the production origin for every page.
- Unknown pages return HTTP 404; HTTPS has a valid certificate.

The contact form currently validates inputs but **does not send inquiries**.
No external media account is required. The services overview video and its
poster are bundled under public/videos; the homepage uses a local still image.

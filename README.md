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

## Known limitations

- Inquiry sending is not enabled; the contact form validates details locally.
- The services page plays the supplied overview video from local files. The
  homepage uses a bundled still image; all displayed media are served locally.
- The source has existing formatting lint errors.

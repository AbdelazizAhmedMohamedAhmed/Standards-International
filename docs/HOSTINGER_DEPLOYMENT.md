# STANDARDS — Hostinger deployment preparation

Prepared 6 November 2026 from main commit `ce7735179b420c87a49210eea2df850fe1ebd3ae`.

## Status

Prepared and tested locally; not published. The purchased Hostinger plan, website inventory, available Node.js slots and final domain remain unverified. No merge, hosting changes, purchase or DNS change is authorized by this preparation.

## Repository structure

The original ZIP has been retained. Its source and configuration are now extracted at the repository root: `src/`, `public/`, `vite.config.ts`, `tsconfig.json`, tests and supporting configuration. All `src/` files are byte-for-byte identical to the uploaded archive, including generated files. Branding, copy, layouts and interactions were not edited.

Eight `.asset.json` descriptors pointed at Lovable-only media URLs. The original files were downloaded from the project's preview and placed under `public/__l5e/assets-v1/`, preserving the exact URL paths used by the application. Every download matched its descriptor's MIME type and byte count. `media-manifest.json` records SHA-256 checksums and origins. These files no longer depend on a Lovable media endpoint at runtime. This does not establish a visual comparison with the current live Lovable editor version; the archive is the reference snapshot.

## Runtime decision

Use the existing TanStack Start application with server-side rendering. Vite alone does not make this a static site. This project includes an SSR entry, request middleware and a server-generated `/sitemap.xml` route. It has no configured, validated static export. Uploading `.output/public` alone would omit the server and is not a working deployment of this version.

The simplest path that preserves the existing architecture is Hostinger managed Node.js hosting, if the purchased plan supports it and has an unused Node.js app slot. Hostinger currently documents support on Business Web Hosting and Cloud plans. A VPS can also run it, but requires server administration; do not buy or upgrade anything until the existing plan is checked. If the account only supports static hosting, evaluate a separate prerender/export change or another server host before deployment.

## Proposed Hostinger settings (only after approval)

| Setting              | Value                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| Website              | A new, unused website slot; never replace an existing site                 |
| Framework            | Other / custom Node.js application (SSR), rather than a static Vite preset |
| Repository root      | `.`                                                                        |
| Node.js              | `24.x` (tested with 24.22.1)                                               |
| Package manager      | npm; use the committed `package-lock.json`                                 |
| Install              | `npm ci` (include development dependencies for the build)                  |
| Build                | `npm run build`                                                            |
| Build output         | `.output`                                                                  |
| Entry file           | `.output/server/index.mjs` relative to repository root                     |
| Start                | `npm start` / `node .output/server/index.mjs`                              |
| Listening            | Respect Hostinger's `PORT`; `HOST=0.0.0.0` if required                     |
| Initial URL          | Hostinger temporary domain, after deployment approval                      |
| Automatic deployment | Keep off until review; preparation must not trigger publishing             |

Nitro is explicitly set to `node-server` with `.output/server` and `.output/public`. Its generated `.output/nitro.json` confirms the server entry. Retain the whole output, including static assets and bundled libraries. Do not run `vite preview` as the production service. If hPanel requests paths relative to the output directory, the corresponding entry is `server/index.mjs`; verify its path convention before saving settings. Hostinger's actual custom-framework launch behavior remains to be tested on the account.

No database, authentication service, server API credential or application secret was identified as necessary for the existing site. Keep any future credentials outside Git. `bun.lock` is retained from the archive, but the deployment procedure uses npm and its generated lockfile consistently.

## Validation completed

- Dependency installation succeeded using npm, initially with lifecycle scripts disabled.
- Production build passed with Node.js 24.22.1 and npm 11.9.0.
- Built Node server started and responded on a custom `PORT`.
- All 15 unique sitemap page routes returned HTTP 200 with server-rendered STANDARDS content, including seven service detail routes.
- `/sitemap.xml` returned HTTP 200 and XML.
- All eight recovered media URLs returned HTTP 200 with the expected byte counts from the built server.
- Existing Vitest suite passed: two files, two tests.
- TypeScript `tsc --noEmit` passed.
- Full lint did not pass: 239 findings (233 Prettier formatting errors and six warnings). These are inherited formatting/style findings in the extracted project, not build failures. Application source was intentionally preserved rather than reformatted. The deployment configuration added here is formatted separately.
- No hosted browser, email-delivery or end-to-end form-submission validation has been claimed.

## Launch blockers and decisions

1. **Hostinger account evidence:** plan name, Node.js entitlement, remaining app slots and existing site inventory are not verified. The hosting connector is not exposed in this session; plugin discovery returned only Hostinger Mail. The cloud browser reports that Hostinger restricts cloud-browser sign-in. No account-specific compatibility claim can be made.
2. **Domain:** no final domain has been selected. `SITE_URL` in `src/lib/site-content.ts` and `public/robots.txt` still reference `https://standards-mark-atlas.lovable.app`. After the domain decision, update both and validate canonical links, Open Graph, JSON-LD, robots and sitemap before switching traffic. Do not infer the intended domain from earlier purchases or spelling variants.
3. **Inquiries:** buyer/partner forms validate locally but deliberately do not send or store inquiries or attachments. Existing copy explains this accurately. Company phone, email and address are also awaiting details. Delivery needs a separately agreed provider/recipient and server-side validation before a lead-generating launch.
4. **Approval:** review this branch, verify the hosting account and approve a new temporary-domain deployment before any publish operation. Review the temporary site before approving the final domain/DNS cutover or merge.

## Reference documentation

- Hostinger Node.js deployment, eligible plans and custom framework settings: https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- Hostinger runtime versions: https://www.hostinger.com/support/how-to-select-the-node-js-version-for-your-application/
- Lovable external deployment and Node server output: https://docs.lovable.dev/tips-tricks/external-deployment-hosting

## Reproduce locally

```sh
npm ci
npm run build
npm test
npx tsc --noEmit
PORT=3000 HOST=0.0.0.0 npm start
```

Stop the local process after checking pages and media. These commands run the website locally; they do not deploy it.

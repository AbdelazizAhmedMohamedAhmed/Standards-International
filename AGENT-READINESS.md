# Public agent access and crawl readiness

Updated 6 November 2026. Production origin: https://standards-intl.com.

## Requested checklist

| #   | Goal                          | Implementation / status                                                                                                                                                                                                                                |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Parseable robots.txt          | GET/HEAD `/robots.txt`, with `User-agent: *` and `Allow: /`.                                                                                                                                                                                           |
| 2   | Content Signals               | `Content-Signal: search=yes, ai-train=no`. A stated usage policy, not authentication or a guaranteed technical block on training.                                                                                                                      |
| 3   | Sitemap                       | GET/HEAD `/sitemap.xml`; 17 unique canonical public URLs including all seven service pages, terms and privacy.                                                                                                                                         |
| 4   | Sitemap pointer               | robots.txt points to `https://standards-intl.com/sitemap.xml`.                                                                                                                                                                                         |
| 5   | Title, description, canonical | Present in server-rendered HTML, verified without executing browser JavaScript for every catalogued page. Existing pages already had these tags in source.                                                                                             |
| 6   | Valid business JSON-LD        | Organization, WebSite and homepage WebPage JSON-LD are server rendered.                                                                                                                                                                                |
| 7   | Organization                  | Name, URL, description, logo, public emails, Cairo/Egypt address and two ContactPoints. No telephone, registration number, street address or opening hours invented.                                                                                   |
| 8   | sameAs                        | **Pending official business profile URLs.** `verifiedOrganizationProfiles` in `src/lib/public-site.ts` is deliberately empty. Add only verified LinkedIn/company/directory profiles; personal GitHub ownership does not establish a business identity. |
| 9   | Multiple schema types         | Organization, ContactPoint, WebSite, WebPage, ItemList, FAQPage, Service and BreadcrumbList across their corresponding pages. No promise of search-engine rich-result eligibility.                                                                     |
| 10  | About/contact/legal links     | Homepage/footer links to about, buyer/partner contact, `/terms` and `/privacy`; all are real routes.                                                                                                                                                   |
| 11  | Machine-readable contact      | `mailto:` links and structured info/sales ContactPoints use the public emails supplied by the owner.                                                                                                                                                   |
| 12  | llms.txt                      | GET/HEAD `/llms.txt` summarizes the business, current inquiry status, public pages, policies and machine endpoints.                                                                                                                                    |
| 13  | Markdown                      | Every public page supports `Accept: text/markdown` and an explicit `.md` URL; `/index.md` represents the homepage. Explicit q=0 exclusions are respected and normal browser requests remain HTML.                                                      |
| 14  | Link headers                  | Successful public page responses advertise llms.txt, a Markdown alternate, canonical URL and server card. Both HTML and Markdown vary on Accept, preserving existing Vary/Link headers.                                                                |
| 15  | Browser WebMCP                | Four real read-only tools register after page load where the browser supplies `document.modelContext`; legacy `navigator.modelContext` is supported as a fallback. Unsupported browsers remain functional; no fake API is installed.                   |
| 16  | MCP discovery                 | Requested compatibility URL `/.well-known/mcp/server-card.json`, current `/mcp/server-card`, and `/.well-known/ai-catalog.json` point to a working public `/mcp` endpoint. The served card validates against the current official v1 schema.           |

The earlier scan's missing robots/sitemap/head-tag findings did not match the existing source. A stale deployment, cached page or host routing issue remains possible; it is not established as the cause. The live domain is blocked by this execution environment's current outbound policy, so all results above are verified against the production build locally. Check Hostinger's deployed commit, runtime entry, cache and actual public responses after deployment.

## Markdown and discovery examples

```sh
curl -i https://standards-intl.com/robots.txt
curl -i https://standards-intl.com/sitemap.xml
curl -i https://standards-intl.com/llms.txt
curl -i -H 'Accept: text/markdown' https://standards-intl.com/
curl -i https://standards-intl.com/contact.md
curl -i https://standards-intl.com/mcp/server-card
```

The catalog, sitemap, llms.txt, Markdown and MCP resources share `src/lib/public-site.ts` and existing site-content data. Legal HTML and Markdown share `src/lib/legal-content.ts`. Discovery URLs are handled by the custom TanStack server entry before normal page rendering. Unknown Markdown/private paths are not converted into resources.

## Public MCP endpoint

- URL: `https://standards-intl.com/mcp`.
- Transport: stateless Streamable HTTP with JSON responses, using the official `@modelcontextprotocol/sdk` package.
- No visitor account, API token or private business credential is exposed or required for public information.
- Protocol versions are advertised from the SDK's actual supported-version list.
- Capabilities are negotiated through `initialize`, as required by the current protocol; current server cards do not contain a static tools/capabilities catalog.
- Discovery card identity and live initialize identity use the same name/version.

Tools:

1. `get_company_information`: public contacts, location, industries and current inquiry status.
2. `get_trade_services`: all services or one published service ID.
3. `get_inquiry_guidance`: buyer/partner preparation details and sales email; never sends a message.
4. `read_public_page`: Markdown for one explicitly listed public page.

Resources list/read expose only those same 17 canonical public pages. Arbitrary URLs, file paths, internal documents and visitor input are not accessible. No purchasing, uploading, email delivery, private inquiry search, user impersonation or arbitrary network calls are offered.

Request safeguards include SDK JSON-RPC validation, a 16 KiB body limit (including streamed body reads), allowed host/origin checks, POST-only transport, whitelisted tool arguments, read-only annotations and a fixed resource allowlist. These controls do not replace hosting-level request timeouts, rate limiting, patching and monitoring. Do not add write tools without a separate authorization, validation, privacy and abuse review.

## WebMCP compatibility

The current WebMCP specification uses `document.modelContext.registerTool`. Some earlier implementations use `navigator.modelContext`. The integration supports both, prefers the current API, and uses AbortSignal/unregistration for cleanup. Browser support is experimental and cannot be enabled for a visitor by site code. The tools reuse the same pure public-information functions as MCP; they do not read form fields, cookies, local storage or email.

## Terms and privacy review

The owner requested drafted website Terms of Use and a Privacy Policy. These describe the current informational site, email-based inquiries, local-only checklists, hosting processing, Google Fonts, third-party media and non-transactional public tools. No blanket claim of protection, guaranteed confidentiality, fixed retention period, nonexistent certification, or automatically concluded trade contract is made.

Before relying on these documents, have an appropriate Egyptian legal adviser verify the actual operator/legal identity, any required business disclosures, applicable law and mandatory rights, data-controller arrangements, providers/transfers, retention practice and transaction terms. Confirm the actual practices match the notice. Update the policy before introducing form submission/storage, analytics or new service providers. Technical signals and general website terms cannot protect against every risk.

## Verification

- Unit/integration tests cover robots/signals, XML sitemap, Markdown quality negotiation, HEAD, cache-variant and Link headers, public contacts, real MCP initialize/list/call/read, invalid origin/host, oversized requests and private-resource rejection.
- A real official-SDK client was connected to the local production endpoint; it initialized, listed four tools and 17 resources, called public tools and read a policy page successfully.
- Actual HTTP server-card JSON was validated against the official versioned v1 extension JSON Schema.
- Raw HTTP checks confirmed metadata and Markdown variants for all 17 canonical pages, with homepage links to about, contact and both legal pages.
- Browser tests check registration using isolated document/navigator modelContext fixtures, ordinary browsing when no API is available, legal-page layout and client-side navigation. This validates the integration paths, not universal browser/vendor support. External Google Fonts were replaced by an empty stylesheet in the isolated browser tests because the environment cannot reach that destination; layout checks therefore used fallback fonts.
- Existing business logic remains unchanged: online inquiry sending is still disabled; no live messages are sent by these tests.

References consulted:

- https://github.com/webmachinelearning/webmcp
- https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/seps/2127-mcp-server-cards.mdx
- https://github.com/modelcontextprotocol/experimental-ext-server-card/blob/main/schema.ts
- https://github.com/modelcontextprotocol/experimental-ext-server-card/blob/main/docs/discovery.md
- https://github.com/modelcontextprotocol/typescript-sdk

The original #1649 discovery discussion has evolved into the current Server Card extension/SEP-2127. The requested well-known URL is retained as a compatibility alias; an invented older schema is not presented as the current standard.

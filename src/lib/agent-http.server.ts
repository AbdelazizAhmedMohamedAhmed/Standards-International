import { SITE_URL } from "./site-content";
import {
  canonicalPageUrl,
  findPublicPage,
  llmsText,
  markdownPath,
  renderPageMarkdown,
  robotsText,
  sitemapXml,
} from "./public-site";
import { handlePublicMcp, mcpServerCard, publicAiCatalog } from "./public-mcp.server";

function acceptQuality(accept: string, type: string): number {
  const [major] = type.split("/");
  let result = 0;
  let specificity = -1;
  for (const range of accept.toLowerCase().split(",")) {
    const [media = "", ...parameters] = range.trim().split(";");
    const rank = media === type ? 2 : media === `${major}/*` ? 1 : media === "*/*" ? 0 : -1;
    if (rank < 0) continue;
    const qValue = parameters.map((value) => value.trim()).find((value) => value.startsWith("q="));
    const q = qValue === undefined ? 1 : Number(qValue.slice(2));
    const quality = Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0;
    if (rank > specificity || (rank === specificity && quality > result)) {
      specificity = rank;
      result = quality;
    }
  }
  return result;
}

export function prefersMarkdown(accept: string | null): boolean {
  if (
    !accept ||
    !accept.split(",").some((range) => range.trim().toLowerCase().split(";")[0] === "text/markdown")
  )
    return false;
  const markdown = acceptQuality(accept, "text/markdown");
  return markdown > 0 && markdown >= acceptQuality(accept, "text/html");
}

function machineResponse(
  request: Request,
  body: string,
  contentType: string,
  extra?: HeadersInit,
): Response {
  const headers = new Headers(extra);
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=300");
  return new Response(request.method === "HEAD" ? null : body, { headers });
}

export function withAgentLinks(response: Response, path: string): Response {
  const page = findPublicPage(path);
  if (!page || response.status !== 200) return response;
  const headers = new Headers(response.headers);
  const vary =
    headers
      .get("Vary")
      ?.split(",")
      .map((value) => value.trim()) ?? [];
  if (!vary.some((value) => value === "*" || value.toLowerCase() === "accept")) vary.push("Accept");
  headers.set("Vary", vary.join(", "));
  const links = [
    `<${SITE_URL}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${SITE_URL}${markdownPath(path)}>; rel="alternate"; type="text/markdown"`,
    `<${canonicalPageUrl(path)}>; rel="canonical"`,
    `<${SITE_URL}/mcp/server-card>; rel="service-desc"; type="application/mcp-server-card+json"`,
  ];
  const existing = headers.get("Link");
  headers.set("Link", [existing, ...links].filter(Boolean).join(", "));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function handleAgentRequest(request: Request): Promise<Response | null> {
  const path = new URL(request.url).pathname;
  if (path === "/mcp") return handlePublicMcp(request);
  const reserved = [
    "/robots.txt",
    "/sitemap.xml",
    "/llms.txt",
    "/.well-known/mcp/server-card.json",
    "/mcp/server-card",
    "/.well-known/ai-catalog.json",
  ];
  const pagePath = path === "/index.md" ? "/" : path.endsWith(".md") ? path.slice(0, -3) : path;
  const page = findPublicPage(pagePath);
  if (
    !reserved.includes(path) &&
    !(page && (path.endsWith(".md") || prefersMarkdown(request.headers.get("Accept"))))
  )
    return null;
  if (request.method !== "GET" && request.method !== "HEAD")
    return new Response("Method not allowed.", { status: 405, headers: { Allow: "GET, HEAD" } });
  if (path === "/robots.txt")
    return machineResponse(request, robotsText(), "text/plain; charset=utf-8");
  if (path === "/sitemap.xml")
    return machineResponse(request, sitemapXml(), "application/xml; charset=utf-8");
  if (path === "/llms.txt")
    return machineResponse(request, llmsText(), "text/plain; charset=utf-8");
  if (path === "/mcp/server-card" || path === "/.well-known/mcp/server-card.json") {
    return machineResponse(
      request,
      JSON.stringify(mcpServerCard()),
      "application/mcp-server-card+json; charset=utf-8",
      { "Access-Control-Allow-Origin": "*" },
    );
  }
  if (path === "/.well-known/ai-catalog.json") {
    return machineResponse(
      request,
      JSON.stringify(publicAiCatalog()),
      "application/ai-catalog+json; charset=utf-8",
      { "Access-Control-Allow-Origin": "*" },
    );
  }
  return page
    ? withAgentLinks(
        machineResponse(request, renderPageMarkdown(page), "text/markdown; charset=utf-8"),
        page.path,
      )
    : null;
}

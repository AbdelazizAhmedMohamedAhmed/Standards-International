import { describe, expect, it } from "vitest";
import { handleAgentRequest, prefersMarkdown, withAgentLinks } from "@/lib/agent-http.server";
import { organizationSchema, publicPages } from "@/lib/public-site";
import { SITE_URL } from "@/lib/site-content";

const get = (path: string, init?: RequestInit) =>
  handleAgentRequest(new Request(`${SITE_URL}${path}`, init));
const rpc = (body: unknown, headers: Record<string, string> = {}) =>
  get("/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...headers,
    },
    body: JSON.stringify(body),
  });

describe("Public crawler resources", () => {
  it("serves robots with crawl policy, content signals and the real sitemap pointer", async () => {
    const response = (await get("/robots.txt"))!;
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/plain");
    expect(await response.text()).toContain(
      "User-agent: *\nAllow: /\nContent-Signal: search=yes, ai-train=no\n\nSitemap: https://standards-intl.com/sitemap.xml",
    );
  });

  it("serves parseable XML with legal pages and every published service", async () => {
    const response = (await get("/sitemap.xml"))!;
    const xml = new DOMParser().parseFromString(await response.text(), "application/xml");
    expect(xml.querySelector("parsererror")).toBeNull();
    const urls = [...xml.querySelectorAll("loc")].map((node) => node.textContent);
    expect(urls).toHaveLength(17);
    expect(new Set(urls).size).toBe(17);
    expect(urls).toEqual(
      expect.arrayContaining([
        `${SITE_URL}/about`,
        `${SITE_URL}/contact`,
        `${SITE_URL}/terms`,
        `${SITE_URL}/privacy`,
        `${SITE_URL}/services/logistics`,
      ]),
    );
  });

  it("serves llms.txt and faithful explicit or negotiated Markdown", async () => {
    expect(await (await get("/llms.txt"))!.text()).toContain(`${SITE_URL}/terms`);
    const negotiated = (await get("/", { headers: { Accept: "text/markdown" } }))!;
    expect(negotiated.headers.get("Content-Type")).toContain("text/markdown");
    const markdown = await negotiated.text();
    expect(markdown).toContain("sales@standards-intl.com");
    expect(markdown).toContain("does not send messages");
    expect(markdown).not.toContain("<html");
    expect(await (await get("/index.md"))!.text()).toBe(markdown);
    expect(await (await get("/privacy.md"))!.text()).toContain("Google Fonts");
    expect(await (await get("/credits.md"))!.text()).toContain("\n\nAuthor:");
    expect(await get("/unknown.md")).toBeNull();
  });

  it("keeps ordinary browser HTML and adds discovery/cache-variant headers", async () => {
    expect(
      await get("/", { headers: { Accept: "text/html,application/xhtml+xml,*/*;q=0.8" } }),
    ).toBeNull();
    const response = withAgentLinks(
      new Response("<html>Normal page</html>", {
        headers: { Vary: "Accept-Encoding", Link: '</existing>; rel="preload"' },
      }),
      "/",
    );
    expect(await response.text()).toBe("<html>Normal page</html>");
    expect(response.headers.get("Vary")).toBe("Accept-Encoding, Accept");
    expect(response.headers.get("Link")).toContain(
      '<https://standards-intl.com/index.md>; rel="alternate"; type="text/markdown"',
    );
    expect(response.headers.get("Link")).toContain("/llms.txt");
    expect(response.headers.get("Link")).toContain("/existing");
    expect(
      withAgentLinks(new Response("html", { headers: { Vary: "*" } }), "/").headers.get("Vary"),
    ).toBe("*");
  });

  it("supports HEAD without a body and rejects writes to discovery documents", async () => {
    const response = (await get("/", { method: "HEAD", headers: { Accept: "text/markdown" } }))!;
    expect(response.headers.get("Content-Type")).toContain("text/markdown");
    expect(await response.text()).toBe("");
    expect((await get("/llms.txt", { method: "POST" }))!.status).toBe(405);
  });

  it("publishes real business contacts without invented profiles", () => {
    const organization = organizationSchema();
    expect(organization["@type"]).toBe("Organization");
    expect(organization.address.addressLocality).toBe("Cairo");
    expect(organization.contactPoint.map((point) => point.email)).toContain(
      "sales@standards-intl.com",
    );
    expect(organization).not.toHaveProperty("sameAs");
  });
});

describe("Markdown negotiation", () => {
  it.each([
    [null, false],
    ["*/*", false],
    ["text/html", false],
    ["text/markdown", true],
    ["TEXT/MARKDOWN; charset=utf-8", true],
    ["text/markdown;q=0", false],
    ["text/markdown;q=0, */*;q=1", false],
    ["text/markdown;q=0.5,text/html;q=1", false],
    ["text/markdown;q=1,text/html;q=0.5", true],
    ["text/markdown;q=invalid", false],
  ])("honors %s", (accept, expected) =>
    expect(prefersMarkdown(accept as string | null)).toBe(expected),
  );
});

describe("Public MCP HTTP boundary", () => {
  it("publishes matching discovery cards pointing to a real initialize endpoint", async () => {
    const card = await (await get("/.well-known/mcp/server-card.json"))!.json();
    expect(card).toEqual(await (await get("/mcp/server-card"))!.json());
    expect(card.remotes[0].url).toBe(`${SITE_URL}/mcp`);
    const response = (await rpc({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-11-25",
        capabilities: {},
        clientInfo: { name: "readiness-test", version: "1.0.0" },
      },
    }))!;
    expect(response.status).toBe(200);
    const message = await response.json();
    expect(message.result.serverInfo.name).toBe(card.name);
    expect(message.result.serverInfo.version).toBe(card.version);
    expect(card.remotes[0].supportedProtocolVersions).toContain(message.result.protocolVersion);
    expect(message.result.capabilities).toHaveProperty("tools");
    expect(message.result.capabilities).toHaveProperty("resources");
  });

  it("lists read-only tools and calls a public-information tool", async () => {
    const list = await (await rpc({ jsonrpc: "2.0", id: 2, method: "tools/list" }))!.json();
    expect(list.result.tools).toHaveLength(4);
    expect(
      list.result.tools.every(
        (tool: { annotations: { readOnlyHint: boolean } }) => tool.annotations.readOnlyHint,
      ),
    ).toBe(true);
    const call = await (await rpc({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "get_company_information", arguments: {} },
    }))!.json();
    expect(JSON.parse(call.result.content[0].text).salesEmail).toBe("sales@standards-intl.com");
  });

  it("reads only catalogued public resources and rejects arbitrary destinations", async () => {
    const list = await (await rpc({ jsonrpc: "2.0", id: 4, method: "resources/list" }))!.json();
    expect(list.result.resources).toHaveLength(publicPages.length);
    const read = await (await rpc({
      jsonrpc: "2.0",
      id: 5,
      method: "resources/read",
      params: { uri: `${SITE_URL}/contact` },
    }))!.json();
    expect(read.result.contents[0].text).toContain("Cairo, Egypt");
    const rejected = await (await rpc({
      jsonrpc: "2.0",
      id: 6,
      method: "resources/read",
      params: { uri: "http://169.254.169.254/latest/meta-data" },
    }))!.json();
    expect(rejected.error.code).toBe(-32602);
  });

  it("rejects foreign browser origins, invalid hosts, oversized payloads and unsupported methods", async () => {
    expect(
      (await rpc(
        { jsonrpc: "2.0", id: 1, method: "ping" },
        { Origin: "https://attacker.example" },
      ))!.status,
    ).toBe(403);
    expect(
      (await handleAgentRequest(new Request("https://attacker.example/mcp", { method: "POST" })))!
        .status,
    ).toBe(403);
    expect((await get("/mcp"))!.status).toBe(405);
    const huge = await rpc({
      jsonrpc: "2.0",
      id: 1,
      method: "ping",
      padding: "x".repeat(17 * 1024),
    });
    expect(huge!.status).toBe(413);
  });

  it("handles notifications and rejects malformed JSON, content types and methods through the SDK", async () => {
    expect((await rpc({ jsonrpc: "2.0", method: "notifications/initialized" }))!.status).toBe(202);
    const invalidJson = await get("/mcp", {
      method: "POST",
      headers: {
        Accept: "application/json, text/event-stream",
        "Content-Type": "application/json",
      },
      body: "{invalid",
    });
    expect(invalidJson!.status).toBe(400);
    const invalidType = await rpc(
      { jsonrpc: "2.0", id: 7, method: "ping" },
      { "Content-Type": "text/plain" },
    );
    expect(invalidType!.status).toBe(415);
    const unknown = await (await rpc({ jsonrpc: "2.0", id: 8, method: "send_email" }))!.json();
    expect(unknown.error.code).toBe(-32601);
    expect(
      (await rpc({ jsonrpc: "2.0", id: 9, method: "ping" }, { Origin: SITE_URL }))!.status,
    ).toBe(200);
  });
});

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
  SUPPORTED_PROTOCOL_VERSIONS,
} from "@modelcontextprotocol/sdk/types.js";
import { SITE_URL } from "./site-content";
import { publicAgentTools, executePublicAgentTool } from "./public-agent-tools";
import { canonicalPageUrl, publicPages, renderPageMarkdown } from "./public-site";

export const publicMcpIdentity = {
  name: "com.standards-intl/public-site",
  version: "1.0.0",
  title: "Standards public information",
};

export function mcpServerCard() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
    ...publicMcpIdentity,
    description:
      "Read-only company information, trade services, inquiry guidance and public website pages.",
    websiteUrl: SITE_URL,
    icons: [{ src: `${SITE_URL}/standards-favicon.png`, mimeType: "image/png", sizes: ["64x64"] }],
    remotes: [
      {
        type: "streamable-http",
        url: `${SITE_URL}/mcp`,
        supportedProtocolVersions: SUPPORTED_PROTOCOL_VERSIONS,
      },
    ],
  };
}

export function publicAiCatalog() {
  return {
    specVersion: "1.0",
    entries: [
      {
        identifier: "urn:air:standards-intl.com:mcp:public-site",
        type: "application/mcp-server-card+json",
        url: `${SITE_URL}/mcp/server-card`,
      },
    ],
  };
}

function permittedRequest(request: Request): boolean {
  const url = new URL(request.url);
  const canonical = new URL(SITE_URL);
  const siteHosts = new Set([canonical.hostname, `www.${canonical.hostname}`]);
  const loopback = new Set(["localhost", "127.0.0.1", "[::1]"]);
  if (!siteHosts.has(url.hostname) && !loopback.has(url.hostname)) return false;
  const origin = request.headers.get("Origin");
  if (!origin) return true; // Server-to-server public clients do not need browser CORS.
  if (origin === canonical.origin) return true;
  try {
    const supplied = new URL(origin);
    if (supplied.origin !== origin) return false;
    if (
      supplied.protocol === canonical.protocol &&
      siteHosts.has(supplied.hostname) &&
      supplied.port === canonical.port
    )
      return true;
    return loopback.has(url.hostname) && origin === url.origin;
  } catch {
    return false;
  }
}

export async function handlePublicMcp(request: Request): Promise<Response> {
  if (!permittedRequest(request))
    return new Response("Origin or host not allowed.", { status: 403 });
  if (request.method !== "POST")
    return new Response("Use POST for the public MCP endpoint.", {
      status: 405,
      headers: { Allow: "POST" },
    });

  const server = new Server(publicMcpIdentity, {
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
    },
  });
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: publicAgentTools }));
  server.setRequestHandler(CallToolRequestSchema, async (message) => {
    if (!publicAgentTools.some((tool) => tool.name === message.params.name))
      throw new McpError(ErrorCode.InvalidParams, "Unknown public tool.");
    try {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              executePublicAgentTool(message.params.name, message.params.arguments ?? {}),
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: error instanceof Error ? error.message : "Invalid tool arguments.",
          },
        ],
      };
    }
  });
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: publicPages.map((page) => ({
      uri: canonicalPageUrl(page.path),
      name: page.title,
      description: page.description,
      mimeType: "text/markdown",
    })),
  }));
  server.setRequestHandler(ReadResourceRequestSchema, async (message) => {
    const page = publicPages.find(
      (candidate) => canonicalPageUrl(candidate.path) === message.params.uri,
    );
    if (!page)
      throw new McpError(ErrorCode.InvalidParams, "Only published Standards pages can be read.");
    return {
      contents: [
        {
          uri: canonicalPageUrl(page.path),
          mimeType: "text/markdown",
          text: renderPageMarkdown(page),
        },
      ],
    };
  });
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
    maxRequestBodySize: 16 * 1024,
    // No session ID generator: public, read-only, stateless requests only.
  });
  await server.connect(transport);
  try {
    const response = await transport.handleRequest(request);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } finally {
    await server.close();
  }
}

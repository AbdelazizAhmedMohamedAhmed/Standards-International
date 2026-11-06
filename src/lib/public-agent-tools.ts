import { companyContact, industries, services, serviceDetails } from "./site-content";
import { getWhatsAppLink } from "./whatsapp";
import { canonicalPageUrl, findPublicPage, publicPages, renderPageMarkdown } from "./public-site";

export const publicAgentTools = [
  {
    name: "get_company_information",
    title: "Standards company information",
    description:
      "Return public business contacts, location, focus sectors and inquiry status. No private visitor data is read.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "get_trade_services",
    title: "Standards trade services",
    description:
      "List public trade services, or read the scope and deliverables of one service by its published ID.",
    inputSchema: {
      type: "object" as const,
      properties: {
        serviceId: {
          type: "string",
          enum: services.map((service) => service.id),
          description: "Optional published service ID; omit to list all services.",
        },
      },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "get_inquiry_guidance",
    title: "Prepare a buyer or partner inquiry",
    description:
      "Explain what to prepare and which public email to contact. Does not send messages, upload files or create orders.",
    inputSchema: {
      type: "object" as const,
      properties: {
        journey: {
          type: "string",
          enum: ["buyer", "partner"],
          description: "Buyer sourcing request or manufacturer/export partner inquiry.",
        },
      },
      required: ["journey"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "read_public_page",
    title: "Read a Standards public page",
    description:
      "Read a published page as Markdown from the fixed site catalog. Arbitrary URLs, private files and visitor-entered information are not accessible.",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          enum: publicPages.map((page) => page.path),
          description: "Canonical public page path, such as /, /services or /contact.",
        },
      },
      required: ["path"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
];

function checkedArguments(value: unknown, allowedKeys: string[]): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    throw new Error("Arguments must be an object.");
  if (Object.keys(value).some((key) => !allowedKeys.includes(key)))
    throw new Error("Unexpected argument. Only the documented public inputs are accepted.");
  return value as Record<string, unknown>;
}

export function executePublicAgentTool(name: string, value: unknown = {}): object {
  switch (name) {
    case "get_company_information": {
      checkedArguments(value, []);
      return {
        name: "Standards for International Trade",
        ...companyContact,
        whatsappUrl: getWhatsAppLink(),
        industries,
        inquirySendingEnabled: false,
      };
    }
    case "get_trade_services": {
      const args = checkedArguments(value, ["serviceId"]);
      if (args["serviceId"] === undefined)
        return {
          services: services.map((service) => ({
            ...service,
            url: canonicalPageUrl(`/services/${service.id}`),
          })),
        };
      const service = services.find((item) => item.id === args["serviceId"]);
      if (!service) throw new Error("Choose a published service ID.");
      return {
        ...service,
        ...serviceDetails[service.id],
        url: canonicalPageUrl(`/services/${service.id}`),
      };
    }
    case "get_inquiry_guidance": {
      const args = checkedArguments(value, ["journey"]);
      if (args["journey"] !== "buyer" && args["journey"] !== "partner")
        throw new Error("journey must be buyer or partner.");
      return {
        journey: args["journey"],
        email:
          args["journey"] === "partner" ? companyContact.partnerEmail : companyContact.salesEmail,
        whatsappNumber: companyContact.whatsappNumber,
        whatsappUrl: getWhatsAppLink(args["journey"]),
        fields:
          args["journey"] === "buyer"
            ? [
                "Name",
                "Company",
                "Email",
                "Country",
                "Product category",
                "Specifications",
                "Quantity",
                "Destination",
                "Timeline",
              ]
            : [
                "Name",
                "Company",
                "Email",
                "Country",
                "Product categories",
                "Capabilities",
                "Target markets",
              ],
        sendingEnabled: false,
        instructions:
          "Use the email address or WhatsApp link returned for this inquiry in your own application. Attach specifications or company profiles there. This tool does not send or upload anything.",
      };
    }
    case "read_public_page": {
      const args = checkedArguments(value, ["path"]);
      if (typeof args["path"] !== "string") throw new Error("A published page path is required.");
      const page = findPublicPage(args["path"]);
      if (!page) throw new Error("Only paths in the public site catalog can be read.");
      return {
        url: canonicalPageUrl(page.path),
        mimeType: "text/markdown",
        markdown: renderPageMarkdown(page),
      };
    }
    default:
      throw new Error("Unknown public tool.");
  }
}

import { describe, expect, it, vi } from "vitest";
import { executePublicAgentTool } from "@/lib/public-agent-tools";
import { registerPublicWebTools, type WebModelContext } from "@/lib/webmcp";

describe("Public browser tools", () => {
  it("works without a browser-specific API", () => {
    expect(() => registerPublicWebTools(undefined)()).not.toThrow();
  });

  it("registers executable read-only tools and cleans up on unmount", async () => {
    const registerTool = vi.fn<WebModelContext["registerTool"]>();
    const unregisterTool = vi.fn();
    const dispose = registerPublicWebTools({ registerTool, unregisterTool });
    await Promise.resolve();
    expect(registerTool).toHaveBeenCalledTimes(4);
    const tool = registerTool.mock.calls.find(
      ([definition]) => definition.name === "get_inquiry_guidance",
    )![0];
    expect(tool.annotations.readOnlyHint).toBe(true);
    const response = await tool.execute({ journey: "partner" });
    const data = JSON.parse(response.content[0]!.text);
    expect(data.email).toBe("partner@standards-intl.com");
    expect(data.sendingEnabled).toBe(false);
    dispose();
    expect(unregisterTool).toHaveBeenCalledTimes(4);
  });

  it("rejects private paths, arbitrary arguments and unsupported business actions", () => {
    expect(() => executePublicAgentTool("read_public_page", { path: "/../../.env" })).toThrow();
    expect(() =>
      executePublicAgentTool("read_public_page", { path: "https://attacker.example" }),
    ).toThrow();
    expect(() =>
      executePublicAgentTool("get_company_information", { visitorEmail: "private@example.com" }),
    ).toThrow();
    expect(() => executePublicAgentTool("get_inquiry_guidance", { journey: "order" })).toThrow();
    expect(() => executePublicAgentTool("send_email", {})).toThrow();
  });
});

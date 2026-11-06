import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { getWhatsAppLink } from "@/lib/whatsapp";

afterEach(cleanup);

describe("WhatsApp Business contact", () => {
  it.each([
    [undefined, "trade inquiry"],
    ["buyer", "product sourcing"],
    ["partner", "manufacturing or export partnership"],
  ] as const)("opens the supplied international number for %s", (journey, message) => {
    const url = new URL(getWhatsAppLink(journey));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/201111014264");
    expect(url.searchParams.get("text")).toContain(message);
    expect([...url.searchParams.keys()]).toEqual(["text"]);
  });

  it("offers an accessible external link without an embedded third-party widget", () => {
    const { container } = render(<WhatsAppButton />);
    const link = screen.getByRole("link", {
      name: "Chat with Standards on WhatsApp (opens in a new tab)",
    });
    expect(link).toHaveAttribute("href", getWhatsAppLink());
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(container.querySelector("iframe, script")).toBeNull();
  });
});

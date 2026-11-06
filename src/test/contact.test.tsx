import type { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

async function renderContact(type: "buyer" | "partner" = "buyer") {
  // Exercise the real route tree without the document shell or remote stylesheets.
  routeTree.update({ component: Outlet });
  Object.assign(routeTree.options, {
    shellComponent: ({ children }: { children: ReactNode }) => <>{children}</>,
  });
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [`/contact?type=${type}`] }),
    context: { queryClient: new QueryClient() },
  });
  render(<RouterProvider router={router} />);
  await router.load();
  return screen.findByRole("button", { name: "Check inquiry details" });
}

describe("Inquiry preparation", () => {
  it("explains email delivery before a visitor fills out the checklist", async () => {
    await renderContact();
    expect(screen.getByText("Send your inquiry by email")).toBeInTheDocument();
    expect(screen.getByText(/Online sending is not enabled yet/)).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "sales@standards-intl.com" })
        .every((link) => link.getAttribute("href") === "mailto:sales@standards-intl.com"),
    ).toBe(true);
  });

  it("focuses the first invalid field and associates its error", async () => {
    fireEvent.click(await renderContact());
    const first = screen.getByLabelText(/^Name/);
    expect(first).toHaveFocus();
    expect(first).toHaveAttribute("aria-invalid", "true");
    expect(first).toHaveAccessibleDescription("This field is required.");
    expect(screen.getByRole("alert")).toHaveTextContent("Please check the highlighted fields");
  });

  it("offers distinct buyer and partner paths without incomplete tab semantics", async () => {
    await renderContact("partner");
    expect(screen.getByRole("button", { name: "Become a Trade Partner" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Request Product Sourcing" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByLabelText(/^Manufacturing or trading capabilities/)).toBeRequired();
    expect(screen.queryByLabelText(/^Destination country/)).not.toBeInTheDocument();
  });
});

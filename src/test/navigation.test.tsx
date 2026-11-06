import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Header, Footer } from "@/components/site/SiteChrome";

afterEach(cleanup);

async function renderNavigation(component: () => React.ReactNode) {
  const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({ component });
  const router = createRouter({
    routeTree: rootRoute,
    context: { queryClient: new QueryClient() },
  });
  render(<RouterProvider router={router} />);
  await router.load();
}

describe("Site navigation", () => {
  it("announces mobile menu state and returns focus when Escape closes it", async () => {
    await renderNavigation(Header);
    const toggle = await screen.findByRole("button", { name: "Open navigation" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close navigation" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(toggle).toHaveAttribute("aria-expanded", "false"));
    expect(toggle).toHaveFocus();
  });

  it("shows the supplied public contact details and both inquiry paths", async () => {
    await renderNavigation(Footer);
    expect(await screen.findByRole("link", { name: "info@standards-intl.com" })).toHaveAttribute(
      "href",
      "mailto:info@standards-intl.com",
    );
    expect(screen.getByRole("link", { name: "sales@standards-intl.com" })).toHaveAttribute(
      "href",
      "mailto:sales@standards-intl.com",
    );
    expect(screen.getByText("Cairo, Egypt")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "partner@standards-intl.com" })).toHaveAttribute(
      "href",
      "mailto:partner@standards-intl.com",
    );
    expect(screen.getByRole("link", { name: "Request product sourcing" })).toHaveAttribute(
      "href",
      expect.stringContaining("type=buyer"),
    );
    expect(screen.getByRole("link", { name: "Become a trade partner" })).toHaveAttribute(
      "href",
      expect.stringContaining("type=partner"),
    );
  });
});

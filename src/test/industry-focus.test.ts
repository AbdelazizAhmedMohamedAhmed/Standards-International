import { describe, expect, it } from "vitest";
import { industries } from "@/lib/site-content";

describe("Company sector focus", () => {
  it("focuses on the five requested business sectors only", () => {
    expect([...industries]).toEqual([
      "Packaging Materials",
      "Chemicals",
      "Building Materials",
      "Food & Beverages",
      "Furniture",
    ]);
  });
});

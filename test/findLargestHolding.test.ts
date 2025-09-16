/**
 * Test suite for findLargestHolding.
 *
 * This test checks the function that finds the asset with the highest value in a portfolio.
 * It covers:
 * - Normal case: returns the largest asset
 * - Edge case: returns null for empty array
 * - Tie case: returns the first asset with the highest value
 *
 * Terms:
 * - Asset: An object with id, name, and value
 * - Portfolio: Array of Asset objects
 *
 * Author: Jack Buchholzer
 */

import { findLargestHolding, Asset } from "../src/Portfolio/portolioPerformance";

describe("findLargestHolding", () => {
  it("returns the asset with the highest value", () => {
    const portfolio: Asset[] = [
      { id: 1, name: "JACK", value: 4000 },
      { id: 2, name: "MSFT", value: 5000 },
      { id: 3, name: "GOOG", value: 3000 },
    ];
    const largest: Asset | null = findLargestHolding(portfolio);
    expect(largest).not.toBeNull();
    expect(largest!.name).toBe("MSFT");
    expect(largest!.value).toBe(5000);
  });

  it("returns the first asset when there is a tie for largest value", () => {
    // If two assets have the same highest value, the function returns the first one it finds
    const portfolio: Asset[] = [
      { id: 1, name: "JACK", value: 5000 },
      { id: 2, name: "MSFT", value: 5000 },
      { id: 3, name: "GOOG", value: 3000 },
    ];
    const largest: Asset | null = findLargestHolding(portfolio);
    expect(largest).not.toBeNull();
    expect(largest!.name).toBe("JACK"); // The first asset with the highest value
    expect(largest!.value).toBe(5000);
  });

  it("returns null for an empty portfolio", () => {
    const largest: Asset | null = findLargestHolding([]);
    expect(largest).toBeNull();
  });
});

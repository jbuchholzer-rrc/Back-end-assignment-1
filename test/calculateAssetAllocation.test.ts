/**
 * Test  for calculateAssetAllocation.
 *
 * This test checks the function that calculates the percentage allocation of each asset in a portfolio.
 * It covers:
 * - Even distribution: assets with equal value
 * - Uneven distribution: assets with different values
 * - Edge case: empty or zero-value portfolio
 *
 * Terms:
 * - Asset: An object with id, name, and value
 * - Allocation: Percentage of total portfolio value for each asset
 *
 * Author: Jack Buchholzer
 */

import { calculateAssetAllocation, Asset } from "../src/Portfolio/portolioPerformance";

describe("calculateAssetAllocation", () => {
  it("calculates percentages for each asset", () => {
    const portfolio: Asset[] = [
      { id: 1, name: "Stock A", value: 50 },
      { id: 2, name: "Stock B", value: 50 },
    ];
    const result = calculateAssetAllocation(portfolio);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Stock A");
    expect(result[1].name).toBe("Stock B");

    // both should be ~50%
    expect(result[0].percentage).toBeCloseTo(50, 5);
    expect(result[1].percentage).toBeCloseTo(50, 5);

    // total should be ~100%
    const total = result.reduce((sum: number, r: { percentage: number }) => sum + r.percentage, 0);
    expect(total).toBeCloseTo(100, 5);
  });

  it("calculates percentages for uneven asset values", () => {
    // Example: Asset A is 75, Asset B is 25. A should be 75%, B should be 25%.
    const portfolio: Asset[] = [
      { id: 1, name: "Asset A", value: 75 },
      { id: 2, name: "Asset B", value: 25 },
    ];
    const result = calculateAssetAllocation(portfolio);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Asset A");
    expect(result[1].name).toBe("Asset B");
    expect(result[0].percentage).toBeCloseTo(75, 5);
    expect(result[1].percentage).toBeCloseTo(25, 5);
    // Total should be 100%
    const total = result.reduce((sum: number, r: { percentage: number }) => sum + r.percentage, 0);
    expect(total).toBeCloseTo(100, 5);
  });

  it("returns empty array when total portfolio value is 0", () => {
    const portfolio: Asset[] = [
      { id: 1, name: "Zero A", value: 0 },
      { id: 2, name: "Zero B", value: 0 },
    ];
    const result = calculateAssetAllocation(portfolio);
    expect(result).toEqual([]);
  });
});

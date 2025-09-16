/**
 * Tests for the calculatePortfolioPerformance function which evaluates investment performance
 * 
 * @remarks
 * Tests cover scenarios for:
 * - Moderate gain calculation (20% increase)
 * - Input validation for initial investment
 * 
 * @see calculatePortfolioPerformance - The function being tested
 * 
 * @example
 * ```typescript
 * const result = calculatePortfolioPerformance(10000, 12000);
 * // Returns performance metrics for 20% gain
 * ```
 */


import { calculatePortfolioPerformance } from "../src/Portfolio/portolioPerformance";

describe("calculatePortfolioPerformance", () => {
  it("returns a moderate gain at exactly 20%", () => {
    const res = calculatePortfolioPerformance(10_000, 12_000);
    expect(res.profitOrLoss).toBe(2000);
    expect(res.percentageChange).toBe(20);
    expect(res.performanceSummary).toBe("Gained moderately");
  });

  it("handles invalid initial investment (<= 0)", () => {
    const res = calculatePortfolioPerformance(0, 5000);
    expect(res.percentageChange).toBe(0);
    expect(res.performanceSummary).toMatch(/greater than 0/i);
  });
});



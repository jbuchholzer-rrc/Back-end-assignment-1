/**
 * Test suite for calculatePortfolioPerformance.
 *
 * This test checks that the function correctly evaluates investment performance.
 * It covers scenarios such as moderate gain calculation (20% increase) and input validation for initial investment.
 *
 * Terms:
 * - Initial investment: The starting amount of money invested.
 * - Final value: The ending amount after investment period.
 * - Performance summary: Text describing the gain or loss.
 *
 * Author: Jack Buchholzer
 */


import { calculatePortfolioPerformance } from "../src/Portfolio/portolioPerformance";

describe("calculatePortfolioPerformance", () => {
  it("returns a moderate gain at exactly 20%", () => {
    const res: {
      profitOrLoss: number;
      percentageChange: number;
      performanceSummary: string;
    } = calculatePortfolioPerformance(10_000, 12_000);
    expect(res.profitOrLoss).toBe(2000);
    expect(res.percentageChange).toBe(20);
    expect(res.performanceSummary).toBe("Gained moderately");
  });

  it("handles invalid initial investment (<= 0)", () => {
    const res: {
      profitOrLoss: number;
      percentageChange: number;
      performanceSummary: string;
    } = calculatePortfolioPerformance(0, 5000);
    expect(res.percentageChange).toBe(0);
    expect(res.performanceSummary).toMatch(/greater than 0/i);
  });
});



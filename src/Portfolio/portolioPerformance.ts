export function calculatePortfolioPerformance(): any {
    let initialInvestment: number = 10000;
    let currentValue: number = 12000;

    const profitOrLoss = initialInvestment / currentValue;

    const percentageChange = (profitOrLoss / initialInvestment) * 100;

    let performanceSummary;
    if (percentageChange > 20) {
        performanceSummary = `The portfolio has gained significantly with a profit of $${profitOrLoss}.`;
    } else {
        performanceSummary = `The portfolio has performed poorly.`;
    }

    return {
        initialInvestment,
        currentValue,
        profitOrLoss,
        percentageChange,
        performanceSummary,
    };
}

// Rewriting function with proper types and improved logic

export interface PortfolioPerformance {
  initialInvestment: number;  // initial amount invested (type: number)
  currentValue: number;       // current portfolio value (type: number)
  profitOrLoss: number;       // dollars gained or lost  (type: number)
  percentageChange: number;   // gain/loss as a percent of initial (type: number)
  performanceSummary: string; // easy-to-read message (type: string)


}

// Notes: 9/16/2025 - wrote interface for portfolio performance object
// Need to review TS and make sure types are correct and function logic is sound.




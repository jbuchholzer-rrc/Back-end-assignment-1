/**
 * @file portfolioPerformance.ts
 * @author Jack Buchholzer
 * @date 9/16/2025
 * 
 * @description
 * This is my first TypeScript assignment for my backend development class.
 * The file contains interfaces and functions for calculating and managing portfolio performance.
 * I'm learning TypeScript and implementing financial calculations for investment portfolios.
 * 
 * Key features:
 * - Calculates portfolio performance metrics (profit/loss, percentage change)
 * - Generates performance summaries based on percentage thresholds
 * - Finds largest holding in a portfolio
 * - Calculates asset allocation percentages
 * 
 * Note to self: This is my first time working with TypeScript interfaces and
 * implementing financial calculations. The code includes basic error handling
 * and type safety measures.
 * 
 * Note: if there is too many comments in the code, please let me know. this is what im used to at work :)
 */


export interface PortfolioPerformance {
  initialInvestment: number;  // initial amount invested (type: number)
  currentValue: number;       // current portfolio value (type: number)
  profitOrLoss: number;       // dollars gained or lost  (type: number)
  percentageChange: number;   // gain/loss as a percent of initial (type: number)
  performanceSummary: string; // easy-to-read message (type: string)


}

// Notes: 9/16/2025 - wrote interface for portfolio performance object
// Need to review TS and make sure types are correct and function logic is sound.




// setting up interfaces for assets and allocation items
export interface Asset { 
  id: number;
  name: string;
  value: number;
}

export interface AllocationItem {
  name: string;
  value: number;
  percentage: number;
}

// Build new portfolio performance calculation function improved with types
// set to follow diagram provided in assignment

export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  // safety: avoid divide-by-zero
  if (initialInvestment <= 0) {
    return {
      initialInvestment,
      currentValue,
      profitOrLoss: currentValue - initialInvestment,
      percentageChange: 0,
      performanceSummary: "Initial investment must be greater than 0.",
    };
  }

  
  // calculate profit/loss and percentage change
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange = (profitOrLoss / initialInvestment) * 100;


  // Ranges for performance summary:
  //  > 20%                 -> Gained significantly
  //  10% to 20% (inclusive)-> Gained moderately
  //  0%  to <10%           -> Gained slightly
  //  exactly 0%            -> No change
  //  -10% < to 0%          -> Lost slightly
  //  -20% < to <= -10%     -> Lost moderately
  //  <= -20%               -> Lost significantly
  
  
  
/* performance summary logic using switch statement */
/* this is more readable than a long if-else chain in the original */


let performanceSummary: string;
  switch (true) {
    case percentageChange > 20:
      performanceSummary = "Gained significantly";
      break;
    case percentageChange >= 10 && percentageChange <= 20:
      performanceSummary = "Gained moderately";
      break;
    case percentageChange > 0 && percentageChange < 10:
      performanceSummary = "Gained slightly";
      break;
    case percentageChange === 0:
      performanceSummary = "No change";
      break;
    case percentageChange < 0 && percentageChange > -10:
      performanceSummary = "Lost slightly";
      break;
    case percentageChange <= -10 && percentageChange > -20:
      performanceSummary = "Lost moderately";
      break;
    case percentageChange <= -20:
      performanceSummary = "Lost significantly";
      break;
    default:
      performanceSummary = "No change";
  }

 return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}

// Function 1 addition feature : Find the largest holding in a portfolio

/** findLargestHolding()
 * 
 * Finds the asset with the highest value in the portfolio.
 * @param portfolio - Array of assets to search through
 * @returns The asset with the highest value, or null if portfolio is empty
 */

export function findLargestHolding(portfolio: Asset[]): Asset | null {
  if (portfolio.length === 0) return null;

  let largest = portfolio[0];
  for (let i = 1; i < portfolio.length; i++) {
    if (portfolio[i].value > largest.value) {
      largest = portfolio[i];
    }
  }
  return largest;
}



/** calculateAssetAllocation()
 * 
 * Calculates the percentage allocation of each asset in a portfolio
 * @param portfolio - Array of assets with name and value properties
 * @returns Array of allocation items containing name, value and percentage, or empty array if total value is 0
 */


export function calculateAssetAllocation(portfolio: Asset[]): AllocationItem[] {
  let totalValue = 0;
  for (let i = 0; i < portfolio.length; i++) {
    totalValue += portfolio[i].value;
  }
  if (totalValue === 0) return [];

  const allocation: AllocationItem[] = [];
  for (let i = 0; i < portfolio.length; i++) {
    const a = portfolio[i];
    const percentage = (a.value / totalValue) * 100;
    allocation.push({ name: a.name, value: a.value, percentage });
  }
  return allocation;
}





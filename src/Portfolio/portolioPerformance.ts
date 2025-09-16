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

// stage 1 portfolio performance calculation function
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


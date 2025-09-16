/**
 * File: src/app.ts
 * Purpose: main express app for assignment-1. Defines routes and handlers/types.
 * Author: Jack Buchholzer
 * Last modified: 9/16/2025
 */



// Import express and types for handling requests and responses
import express, {Request, Response} from 'express';
// imprt package.json to get version info
import pkg from "../package.json";

// Import types + functions from portfolioPerformance module
import {
  calculatePortfolioPerformance,
  findLargestHolding,
  calculateAssetAllocation,
  type Asset,
  type AllocationItem,
  type PortfolioPerformance,
} from "./Portfolio/portolioPerformance";

// String literal type for health status
export type Healthstatus = "OK";


// shape interface for json response from healthcheck endpoint
export interface HealthResponse {
    status: Healthstatus; // curent health status (string literal type)
    uptime: number;  // server uptime (number type)
    timestamp: string; // current timestamp (string date type)
    version: string; // version from package.json (string type)


}

// simple error shape for bad requests
interface ErrorResponse {
  error: string;
}

// response shapes for portfolio endpoints
interface LargestHoldingResponse {
  largest: Asset | null;
}

interface AllocationResponse {
  allocation: AllocationItem[];
}



export const app = express();


/* --------------------------------------------------------------------------------------
   Health (GET)
---------------------------------------------------- ------------------------------------*/

app.get("/api/v1/health", (_req: Request, res: Response<HealthResponse>) => {
    const body: HealthResponse = {
        status: "OK", // health status (string literal type)
        uptime: Math.round(process.uptime()), // round uptime to nearest second
        timestamp: new Date().toDateString(), // current date as string (string type)
        version: pkg.version // version from package.json (string type)
    };
    
    // Send JSON response with status code 200
    res.status(200).json(body);
});



/* --------------------------------------------------------------------------------------
   Portfolio performance (GET)
   Example:
   /api/v1/portfolio/performance?initialInvestment=10000&currentValue=12000
---------------------------------------------------- ------------------------------------*/
app.get("/api/v1/portfolio/performance", (req: Request, res: Response) => {
  const initial = Number(req.query.initialInvestment);
  const current = Number(req.query.currentValue);

  // simple checks for numbers
  if (Number.isNaN(initial) || Number.isNaN(current)) {
    return res
      .status(400)
      .json({ error: "Please provide numeric initialInvestment and currentValue." });
  }

  const result = calculatePortfolioPerformance(initial, current);
  res.status(200).json(result);
});




/* -------------------------------------------------------------------------------------------------------------
   Largest holding (GET)
   Example:
   /api/v1/portfolio/largest-holding?portfolio=[{"id":1,"name":"AAPL","value":5000},{"id":2,"name":"MSFT","value":6000}]
---------------------------------------------------- -----------------------------------------------------------*/
app.get("/api/v1/portfolio/largest-holding", (req: Request, res: Response) => {
  const raw = req.query.portfolio as string;

  if (!raw) {
    return res.status(400).json({ error: "Please provide ?portfolio=[...] as JSON." });
  }

  try {
    const portfolio = JSON.parse(raw); // expect an array of {id,name,value}
    const largest = findLargestHolding(portfolio);
    res.status(200).json({ largest });
  } catch {
    res.status(400).json({ error: "Invalid portfolio JSON." });
  }
});





/* ----------------------------------------------------------------------------------------------------------
   Asset allocation (GET)
   Example:
   /api/v1/portfolio/allocation?portfolio=[{"id":1,"name":"A","value":50},{"id":2,"name":"B","value":50}]
-------------------------------------------------------------------------------------------------------------*/
app.get("/api/v1/portfolio/allocation", (req: Request, res: Response) => {
  const raw = req.query.portfolio as string;

  if (!raw) {
    return res.status(400).json({ error: "Please provide ?portfolio=[...] as JSON." });
  }

  try {
    const portfolio = JSON.parse(raw); // expect an array of {id,name,value}
    const allocation = calculateAssetAllocation(portfolio);
    res.status(200).json({ allocation });
  } catch {
    res.status(400).json({ error: "Invalid portfolio JSON." });
  }
});

export default app;


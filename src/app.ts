/**
 * File: src/app.ts
 * Purpose: main express app for assignment-1.
 * Author: Jack Buchholzer
 */




// Import express and types for handling requests and responses
import express, {Request, Response} from 'express';
// imprt package.json to get version info
import pkg from "../package.json";


// String literal type for health status
export type Healthstatus = "OK";


// shape interface for json response from healthcheck endpoint
export interface HealthResponse {
    status: Healthstatus; // curent health status (string literal type)
    uptime: number;  // server uptime (number type)
    timestamp: string; // current timestamp (string date type)
    version: string; // version from package.json (string type)


}


// Create and export the express app
export const app = express();


// Create GET route for healthcheck endpoint

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

export default app;


/**
 * tests/health.test.ts
 * Author: Jack Buchholzer
 *
 * Goal: Make sure /api/v1/health returns the basic fields we expect.
 * 
 * Test 1: It should respond with 200 OK, JSON, status "OK", and the correct version.
 * Test 2: It should include uptime as a number and timestamp as a string.
 * Test 3: Response should match HealthResponse type
 * 
 * Log: JCB - 9/16/2025 - all tests written and passing.
 *
 * 
 * 
*/

import request from "supertest";
import app from "../src/app";
import type { HealthResponse } from "../src/app";
import pkg from "../package.json";


describe("GET /api/v1/health", () => {
  
  
    // Test 1: It should respond with 200 OK, JSON, status "OK", and the correct version.
  
  
  it("returns 200 with OK status and correct version", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);

    
    
    const body: HealthResponse = res.body as HealthResponse;
    expect(body.status).toBe("OK");
    expect(body.version).toBe(pkg.version);


});


});
// Test 2: It should include uptime as a number and timestamp as a string.
it("includes uptime as number and timestamp as string", async () => {
    const res = await request(app).get("/api/v1/health");
    const body: HealthResponse = res.body as HealthResponse;
    
    // Check uptime is a number
    expect(typeof body.uptime).toBe("number");
    
    // Check timestamp exists and is string format
    expect(typeof body.timestamp).toBe("string");
    expect(Date.parse(body.timestamp)).not.toBeNaN();
});




// Test 3: Response should match HealthResponse type
it("matches HealthResponse type structure", async () => {
    const res = await request(app).get("/api/v1/health");
    const body: HealthResponse = res.body as HealthResponse;
    
    // Check all required fields exist
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("version"); 
    expect(body).toHaveProperty("uptime");
    expect(body).toHaveProperty("timestamp");


});
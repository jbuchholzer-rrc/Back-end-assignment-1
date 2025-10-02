/**
 * Branch Routes Tests
 * This file contains tests for all branch-related endpoints
 * including CRUD operations.
 */

import request from "supertest";
import app from "src/app";

describe("Branch Routes", () => {
    describe("POST /branches", () => {
        // Test creating a new branch successfully
        it("should create a new branch successfully", async () => {
            const newBranch = {
                name: "Calgary Branch",
                address: "123 Main St, Calgary, AB, T2P 1A1",
                phone: "403-555-0000"
            };

            const response = await request(app)
                .post("/branches")
                .send(newBranch);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
        });

        // Test verifying branch data is returned correctly
        it("should return branch data correctly", async () => {
            const newBranch = {
                name: "Downtown Office",
                address: "456 King St, Vancouver, BC, V6B 1A1",
                phone: "604-555-1000"
            };

            const response = await request(app)
                .post("/branches")
                .send(newBranch);

            expect(response.status).toBe(201);
            expect(response.body.name).toBe(newBranch.name);
            expect(response.body.address).toBe(newBranch.address);
            expect(response.body.phone).toBe(newBranch.phone);
        });
    });
});

/**
 * Branch Routes Tests
 * This file contains tests for all branch-related endpoints
 * including CRUD operations.
 * 
 * @author Jack Buchholzer
 */

import request from "supertest";
import app from "../src/app";

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
            expect(response.body.data).toHaveProperty("id");
        });

        // Test validation with valid branch data
        it("should accept branch with all valid fields", async () => {
            const validBranch = {
                name: "Toronto Branch",
                address: "100 Queen St, Toronto, ON, M5H 2N2",
                phone: "416-555-6000"
            };

            const response = await request(app)
                .post("/branches")
                .send(validBranch);

            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty("id");
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
            expect(response.body.data.name).toBe(newBranch.name);
            expect(response.body.data.address).toBe(newBranch.address);
            expect(response.body.data.phone).toBe(newBranch.phone);
        });
    });

    describe("GET /branches", () => {
        // Test getting all branches
        it("should get all branches", async () => {
            const response = await request(app).get("/branches");

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe("GET /branches/:id", () => {
        // Test retrieving a branch by its id
        it("should retrieve a branch by its id", async () => {
            // First, create a branch
            const newBranch = {
                name: "Mississauga Branch",
                address: "789 Square One Dr, Mississauga, ON, L5B 1M2",
                phone: "905-555-2000"
            };

            const createResponse = await request(app)
                .post("/branches")
                .send(newBranch);

            const createdBranchId = createResponse.body.data.id;

            // Then, retrieve the branch by id
            const getResponse = await request(app)
                .get(`/branches/${createdBranchId}`);

            expect(getResponse.status).toBe(200);
            expect(getResponse.body.data.id).toBe(createdBranchId);
        });
    });

    describe("PUT /branches/:id", () => {
        // Test updating a branch name
        it("should update a branch name", async () => {
            // First, create a branch
            const newBranch = {
                name: "Old Branch Name",
                address: "999 Test St, Ottawa, ON, K1A 0B1",
                phone: "613-555-3000"
            };

            const createResponse = await request(app)
                .post("/branches")
                .send(newBranch);

            const createdBranchId = createResponse.body.data.id;

            // Then, update the branch name
            const updatedName = "New Branch Name";
            const updateResponse = await request(app)
                .put(`/branches/${createdBranchId}`)
                .send({ name: updatedName });

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.data.name).toBe(updatedName);
        });

        // Test updating a branch address
        it("should update a branch address", async () => {
            // First, create a branch with address "123 Main St"
            const newBranch = {
                name: "Test Branch",
                address: "123 Main St",
                phone: "416-555-4000"
            };

            const createResponse = await request(app)
                .post("/branches")
                .send(newBranch);

            const createdBranchId = createResponse.body.data.id;

            // Then, update the branch address to "456 Oak Ave"
            const updatedAddress = "456 Oak Ave";
            const updateResponse = await request(app)
                .put(`/branches/${createdBranchId}`)
                .send({ address: updatedAddress });

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.data.address).toBe(updatedAddress);
        });
    });

    describe("DELETE /branches/:id", () => {
        // Test deleting a branch
        it("should delete a branch", async () => {
            // First, create a branch
            const newBranch = {
                name: "Branch to Delete",
                address: "111 Delete St, Halifax, NS, B3H 1A1",
                phone: "902-555-5000"
            };

            const createResponse = await request(app)
                .post("/branches")
                .send(newBranch);

            const createdBranchId = createResponse.body.data.id;

            // Then, delete the branch
            const deleteResponse = await request(app)
                .delete(`/branches/${createdBranchId}`);

            expect(deleteResponse.status).toBe(204);
        });

        // Test deleting non-existent branch returns 404
        it("should return 404 when deleting non-existent branch", async () => {
            const response = await request(app)
                .delete("/branches/99999");

            expect(response.status).toBe(404);
        });
    });
});

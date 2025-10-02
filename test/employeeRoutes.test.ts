/**
 * Employee Routes Tests
 * This file contains tests for all employee-related endpoints
 * including CRUD operations and filtering functionality.
 */

import request from "supertest";
import app from "src/app";

describe("Employee Routes", () => {
    beforeEach(() => {
        // Clear test data before each test if needed
        // This ensures a clean slate for each test case
    });

    describe("POST /employees", () => {
        // Test creating a new employee with valid data
        it("should create a new employee successfully", async () => {
            const newEmployee = {
                name: "John Doe",
                position: "Software Developer",
                department: "IT",
                email: "john.doe@pixell-river.com",
                phone: "604-555-1234",
                branchId: 1
            };

            const response = await request(app)
                .post("/employees")
                .send(newEmployee);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body.name).toBe(newEmployee.name);
            expect(response.body.position).toBe(newEmployee.position);
            expect(response.body.department).toBe(newEmployee.department);
            expect(response.body.email).toBe(newEmployee.email);
            expect(response.body.phone).toBe(newEmployee.phone);
            expect(response.body.branchId).toBe(newEmployee.branchId);
        });

        // Test creating employee with missing required fields
        it("should fail to create employee with missing parameters", async () => {
            const incompleteEmployee = {
                name: "Jane Doe",
                position: "Manager"
                // Missing department, email, phone, branchId
            };

            const response = await request(app)
                .post("/employees")
                .send(incompleteEmployee);

            expect(response.status).toBe(400);
        });
    });

    describe("GET /employees/:id", () => {
        // Test retrieving an employee by their id
        it("should get an employee by id", async () => {
            // First, create an employee
            const newEmployee = {
                name: "Alice Smith",
                position: "Data Analyst",
                department: "Analytics",
                email: "alice.smith@pixell-river.com",
                phone: "604-555-5678",
                branchId: 2
            };

            const createResponse = await request(app)
                .post("/employees")
                .send(newEmployee);

            const createdEmployeeId = createResponse.body.id;

            // Then, retrieve the employee by id
            const getResponse = await request(app)
                .get(`/employees/${createdEmployeeId}`);

            expect(getResponse.status).toBe(200);
            expect(getResponse.body.id).toBe(createdEmployeeId);
            expect(getResponse.body.name).toBe(newEmployee.name);
        });

        // Test retrieving a non-existent employee returns 404
        it("should return 404 when employee not found", async () => {
            const response = await request(app)
                .get("/employees/99999");

            expect(response.status).toBe(404);
        });
    });

    describe("PUT /employees/:id", () => {
        // Test updating an employee's name
        it("should update an employee's name", async () => {
            // First, create an employee
            const newEmployee = {
                name: "Bob Johnson",
                position: "Product Manager",
                department: "Product",
                email: "bob.johnson@pixell-river.com",
                phone: "604-555-9999",
                branchId: 1
            };

            const createResponse = await request(app)
                .post("/employees")
                .send(newEmployee);

            const createdEmployeeId = createResponse.body.id;

            // Then, update the employee's name
            const updatedName = "Robert Johnson";
            const updateResponse = await request(app)
                .put(`/employees/${createdEmployeeId}`)
                .send({ name: updatedName });

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.name).toBe(updatedName);
            expect(updateResponse.body.id).toBe(createdEmployeeId);
        });

        // Test updating an employee's position
        it("should update an employee's position", async () => {
            // First, create an employee with Junior Developer position
            const newEmployee = {
                name: "Sarah Lee",
                position: "Junior Developer",
                department: "Engineering",
                email: "sarah.lee@pixell-river.com",
                phone: "604-555-7777",
                branchId: 3
            };

            const createResponse = await request(app)
                .post("/employees")
                .send(newEmployee);

            const createdEmployeeId = createResponse.body.id;

            // Then, update the employee's position to Senior Developer
            const updatedPosition = "Senior Developer";
            const updateResponse = await request(app)
                .put(`/employees/${createdEmployeeId}`)
                .send({ position: updatedPosition });

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.position).toBe(updatedPosition);
        });
    });

    describe("DELETE /employees/:id", () => {
        // Test deleting an employee successfully
        it("should delete an employee successfully", async () => {
            // First, create an employee
            const newEmployee = {
                name: "Tom Wilson",
                position: "Accountant",
                department: "Finance",
                email: "tom.wilson@pixell-river.com",
                phone: "604-555-4444",
                branchId: 2
            };

            const createResponse = await request(app)
                .post("/employees")
                .send(newEmployee);

            const createdEmployeeId = createResponse.body.id;

            // Then, delete the employee
            const deleteResponse = await request(app)
                .delete(`/employees/${createdEmployeeId}`);

            expect(deleteResponse.status).toBe(204);
        });
    });
});

/**
 * Employee Routes Tests
 * This file contains tests for all employee-related endpoints
 * including CRUD operations and filtering functionality.
 */

import request from "supertest";
import app from "../src/app";

describe("Employee Routes", () => {
    beforeEach(() => {
        // Clear test data before each test if needed
        // This ensures a clean slate for each test case
    });

    describe("POST /employees", () => {
        // Test creating a new employee with valid data
        it("should create a new employee successfully", async () => {
            const newEmployee = {
                firstName: "John",
                lastName: "Doe",
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
            expect(response.body.firstName).toBe(newEmployee.firstName);
            expect(response.body.lastName).toBe(newEmployee.lastName);
            expect(response.body.position).toBe(newEmployee.position);
            expect(response.body.department).toBe(newEmployee.department);
            expect(response.body.email).toBe(newEmployee.email);
            expect(response.body.phone).toBe(newEmployee.phone);
            expect(response.body.branchId).toBe(newEmployee.branchId);
        });

        // Test validation accepts valid data
        it("should accept employee with all valid fields", async () => {
            const validEmployee = {
                firstName: "Jane",
                lastName: "Smith",
                position: "Project Manager",
                department: "Operations",
                email: "jane.smith@pixell-river.com",
                phone: "604-555-5678",
                branchId: 2
            };

            const response = await request(app)
                .post("/employees")
                .send(validEmployee);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
        });

        // Test validation rejects missing fields
        it("should reject employee with missing required fields", async () => {
            const invalidEmployee = {
                lastName: "Johnson",
                position: "Analyst",
                department: "Finance",
                email: "johnson@pixell-river.com",
                phone: "604-555-9999",
                branchId: 3
                // Missing firstName
            };

            const response = await request(app)
                .post("/employees")
                .send(invalidEmployee);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");
        });

        // Test email validation
        it("should reject employee with invalid email format", async () => {
            const invalidEmailEmployee = {
                firstName: "Tom",
                lastName: "Brown",
                position: "Engineer",
                department: "IT",
                email: "notanemail",
                phone: "604-555-7777",
                branchId: 1
            };

            const response = await request(app)
                .post("/employees")
                .send(invalidEmailEmployee);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toContain("email");
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

        // Test updating a non-existent employee returns 404
        it("should return 404 when updating non-existent employee", async () => {
            const response = await request(app)
                .put("/employees/99999")
                .send({ name: "Updated Name" });

            expect(response.status).toBe(404);
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

        // Test verifying deleted employees can't be retrieved
        it("should verify deleted employee cannot be retrieved", async () => {
            // First, create an employee
            const newEmployee = {
                name: "Emma Davis",
                position: "HR Manager",
                department: "Human Resources",
                email: "emma.davis@pixell-river.com",
                phone: "604-555-3333",
                branchId: 1
            };

            const createResponse = await request(app)
                .post("/employees")
                .send(newEmployee);

            const createdEmployeeId = createResponse.body.id;

            // Then, delete the employee
            await request(app)
                .delete(`/employees/${createdEmployeeId}`);

            // Finally, try to retrieve the deleted employee
            const getResponse = await request(app)
                .get(`/employees/${createdEmployeeId}`);

            expect(getResponse.status).toBe(404);
        });

        // Test deleting a non-existent employee returns 404
        it("should return 404 when deleting non-existent employee", async () => {
            const response = await request(app)
                .delete("/employees/99999");

            expect(response.status).toBe(404);
        });
    });

    describe("GET /employees/branch/:branchId", () => {
        // Test getting employees from a specific branch
        it("should get employees from a specific branch", async () => {
            // Create 2 employees with branchId 999 (unique branch)
            const employee1 = {
                name: "Mike Brown",
                position: "Developer",
                department: "IT",
                email: "mike.brown@pixell-river.com",
                phone: "604-555-1111",
                branchId: 999
            };

            const employee2 = {
                name: "Lisa White",
                position: "Designer",
                department: "Design",
                email: "lisa.white@pixell-river.com",
                phone: "604-555-2222",
                branchId: 999
            };

            const employee3 = {
                name: "Kevin Green",
                position: "Manager",
                department: "Management",
                email: "kevin.green@pixell-river.com",
                phone: "604-555-3333",
                branchId: 998
            };

            await request(app).post("/employees").send(employee1);
            await request(app).post("/employees").send(employee2);
            await request(app).post("/employees").send(employee3);

            // Get employees from branch 999
            const response = await request(app)
                .get("/employees/branch/999");

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body.every((emp: any) => emp.branchId === 999)).toBe(true);
        });
    });

    describe("GET /employees", () => {
        // Test verifying all employee properties are returned
        it("should return all employee properties", async () => {
            // Create an employee with all fields filled
            const newEmployee = {
                name: "Rachel Adams",
                position: "Business Analyst",
                department: "Operations",
                email: "rachel.adams@pixell-river.com",
                phone: "604-555-8888",
                branchId: 3
            };

            await request(app).post("/employees").send(newEmployee);

            // Get all employees
            const response = await request(app).get("/employees");

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty("id");
            expect(response.body[0]).toHaveProperty("name");
            expect(response.body[0]).toHaveProperty("position");
            expect(response.body[0]).toHaveProperty("department");
            expect(response.body[0]).toHaveProperty("email");
            expect(response.body[0]).toHaveProperty("phone");
            expect(response.body[0]).toHaveProperty("branchId");
        });
    });
});

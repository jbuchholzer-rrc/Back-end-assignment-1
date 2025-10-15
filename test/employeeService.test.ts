/**
 * Employee Service Tests
 * This file contains tests for the employee service layer
 * Tests verify Firestore integration and business logic
 * 
 * Author: Jack Buchholzer
 */

import { createEmployee, getAllEmployees } from '../src/api/v1/services/employeeService';

describe('Employee Service', () => {
    describe('createEmployee', () => {
        // This test verifies the employee service with Firestore integration
        it('should create an employee and return it with an id', async () => {
            const employeeData = {
                name: 'Alice Johnson',
                position: 'Data Analyst',
                department: 'Analytics',
                email: 'alice.johnson@pixell-river.com',
                phone: '604-555-0001',
                branchId: 1
            };

            // Call the service to create an employee
            const result = await createEmployee(employeeData);

            // Verify the employee has an id
            expect(result).toHaveProperty('id');
            expect(result.id).toBeDefined();
            expect(typeof result.id).toBe('number');

            // Verify all fields are present and correct
            expect(result.name).toBe(employeeData.name);
            expect(result.position).toBe(employeeData.position);
            expect(result.department).toBe(employeeData.department);
            expect(result.email).toBe(employeeData.email);
            expect(result.phone).toBe(employeeData.phone);
            expect(result.branchId).toBe(employeeData.branchId);
        });
    });

    describe('getAllEmployees', () => {
        // This test verifies the get all employees function from Firestore
        it('should retrieve all employees as an array', async () => {
            // Call the service to get all employees
            const result = await getAllEmployees();

            // Verify the result is an array
            expect(Array.isArray(result)).toBe(true);

            // Verify each item in the array has the correct Employee type structure
            if (result.length > 0) {
                result.forEach(employee => {
                    expect(employee).toHaveProperty('id');
                    expect(employee).toHaveProperty('name');
                    expect(employee).toHaveProperty('position');
                    expect(employee).toHaveProperty('department');
                    expect(employee).toHaveProperty('email');
                    expect(employee).toHaveProperty('phone');
                    expect(employee).toHaveProperty('branchId');
                });
            }
        });
    });
});

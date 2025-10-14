/**
 * Employee Service Tests
 * This file contains tests for the employee service layer
 * Tests verify Firestore integration and business logic
 * 
 * Author: Jack Buchholzer
 */

import { createEmployee } from '../src/api/v1/services/employeeService';

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
});

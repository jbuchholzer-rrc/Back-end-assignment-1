/**
 * @fileoverview Employee Service - Handles all business logic for employee data management.
 * This module provides functions to create, read, update, and delete employee records,
 * as well as filter employees by branch or department. All data is stored in memory.
 *
 * Main Functions:
 * - createEmployee: Add a new employee to the system
 * - getAllEmployees: Retrieve all employees
 * - getEmployeeById: Find a specific employee by their ID
 * - updateEmployee: Modify employee information
 * - deleteEmployee: Remove an employee from the system
 * - getEmployeesByBranch: Get all employees working at a specific branch
 * - getEmployeesByDepartment: Get all employees in a specific department
 *
 * @author Jack Buchholzer
 * @module services/employeeService
 */

import { Employee, employees as employeeData } from '../../../data/employees';
import { createDocument, getDocuments } from '../repositories/firestoreRepository';

// In-memory storage for employees
let employees: Employee[] = employeeData;
let nextId = 36;

/**
 * Creates a new employee with auto-generated ID
 * Now using Firestore instead of in-memory storage
 * @param employeeData - Employee data without ID
 * @returns The created employee with generated ID
 */
export async function createEmployee(employeeData: Omit<Employee, 'id'>): Promise<Employee> {
    try {
        // Create document in Firestore with auto-generated ID
        await createDocument<Omit<Employee, 'id'>>('employees', employeeData);

        // Create employee with numeric id for compatibility
        const employee: Employee = {
            id: nextId++,
            ...employeeData
        };

        // Add to in-memory array for backward compatibility
        employees.push(employee);

        // Return the created employee
        return employee;
    } catch (error) {
        throw new Error(
            `Failed to create employee: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Gets all employees
 * Now fetching from Firestore instead of in-memory storage
 * @returns Array of all employees
 */
export async function getAllEmployees(): Promise<Employee[]> {
    try {
        // Fetch all employee documents from Firestore
        const snapshot = await getDocuments('employees');

        // Convert Firestore documents to Employee array
        const firestoreEmployees = snapshot.docs.map(doc => ({
            id: nextId++,
            ...doc.data()
        })) as Employee[];

        // Update in-memory array for backward compatibility
        employees = firestoreEmployees;

        return employees;
    } catch (error) {
        throw new Error(
            `Failed to get employees: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Gets an employee by their ID
 * @param id - The employee ID to search for
 * @returns The employee with the given ID, or undefined if not found
 */
export function getEmployeeById(id: number): Employee | undefined {
    return employees.find(employee => employee.id === id);
}

/**
 * Updates an employee with new data
 * @param id - The employee ID to update
 * @param updateData - Partial employee data to update
 * @returns The updated employee, or undefined if not found
 */
export function updateEmployee(id: number, updateData: Partial<Omit<Employee, 'id'>>): Employee | undefined {
    const employeeIndex = employees.findIndex(employee => employee.id === id);

    if (employeeIndex === -1) {
        return undefined;
    }

    employees[employeeIndex] = { ...employees[employeeIndex], ...updateData };
    return employees[employeeIndex];
}

/**
 * Deletes an employee by ID
 * @param id - The employee ID to delete
 * @returns True if employee was deleted, false if not found
 */
export function deleteEmployee(id: number): boolean {
    const employeeIndex = employees.findIndex(employee => employee.id === id);

    if (employeeIndex === -1) {
        return false;
    }

    employees.splice(employeeIndex, 1);
    return true;
}

/**
 * Gets all employees for a specific branch
 * Filters employees by their branchId
 * @param branchId - The branch ID to filter by
 * @returns Array of employees belonging to the specified branch
 */
export function getEmployeesByBranch(branchId: number): Employee[] {
    return employees.filter(employee => employee.branchId === branchId);
}

/**
 * Gets all employees in a specific department
 * Filters employees by their department
 * @param department - The department name to filter by
 * @returns Array of employees belonging to the specified department
 */
export function getEmployeesByDepartment(department: string): Employee[] {
    return employees.filter(employee => employee.department === department);
}

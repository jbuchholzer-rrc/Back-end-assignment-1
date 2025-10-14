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
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../repositories/firestoreRepository';

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
 * Retrieves employee data from Firestore
 * @param id - The employee ID to search for
 * @returns The employee with the given ID, or undefined if not found
 */
export async function getEmployeeById(id: number): Promise<Employee | undefined> {
    try {
        // Retrieve employee document from Firestore by ID
        const doc = await getDocumentById('employees', id.toString());
        
        if (!doc) {
            return undefined;
        }
        
        const data = doc.data();
        if (!data) {
            return undefined;
        }
        
        return {
            id,
            ...data
        } as Employee;
    } catch (error) {
        throw new Error(
            `Failed to get employee by ID: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Updates an employee with new data
 * Updates employee data in Firestore
 * @param id - The employee ID to update
 * @param updateData - Partial employee data to update
 * @returns The updated employee, or undefined if not found
 */
export async function updateEmployee(id: number, updateData: Partial<Omit<Employee, 'id'>>): Promise<Employee | undefined> {
    try {
        // Check if employee exists before updating
        const existingEmployee = await getEmployeeById(id);
        
        if (!existingEmployee) {
            return undefined;
        }
        
        // Update employee document in Firestore
        await updateDocument<Partial<Omit<Employee, 'id'>>>('employees', id.toString(), updateData);
        
        // Return the updated employee
        return {
            ...existingEmployee,
            ...updateData
        };
    } catch (error) {
        throw new Error(
            `Failed to update employee: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Deletes an employee by ID
 * Deletes employee data from Firestore
 * @param id - The employee ID to delete
 * @returns True if employee was deleted, false if not found
 */
export async function deleteEmployee(id: number): Promise<boolean> {
    try {
        // Check if employee exists before deleting
        const existingEmployee = await getEmployeeById(id);
        
        if (!existingEmployee) {
            return false;
        }
        
        // Delete employee document from Firestore
        await deleteDocument('employees', id.toString());
        
        return true;
    } catch (error) {
        throw new Error(
            `Failed to delete employee: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Gets all employees for a specific branch
 * Fetches all employees from Firestore and filters by branchId
 * @param branchId - The branch ID to filter by
 * @returns Array of employees belonging to the specified branch
 */
export async function getEmployeesByBranch(branchId: number): Promise<Employee[]> {
    try {
        // Fetch all employee documents from Firestore
        const snapshot = await getDocuments('employees');
        
        // Convert Firestore documents to Employee array and filter by branchId
        const allEmployees = snapshot.docs.map(doc => ({
            id: parseInt(doc.id) || 0,
            ...doc.data()
        })) as Employee[];
        
        // Filter employees by branch after fetching from Firestore
        return allEmployees.filter(employee => employee.branchId === branchId);
    } catch (error) {
        throw new Error(
            `Failed to get employees by branch: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
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

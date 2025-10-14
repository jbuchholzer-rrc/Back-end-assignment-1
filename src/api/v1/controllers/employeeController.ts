/**
 * @fileoverview Employee Controller - Handles HTTP requests for employee operations.
 * This module acts as the bridge between the HTTP routes and the employee service layer.
 * It processes incoming requests, validates data, calls the appropriate service functions,
 * and sends back HTTP responses with proper status codes.
 *
 * Main Controller Functions:
 * - createEmployeeController: Handles POST requests to create new employees
 * - getAllEmployeesController: Handles GET requests to retrieve all employees
 * - getEmployeeByIdController: Handles GET requests to find employees by ID
 * - updateEmployeeController: Handles PUT requests to update employee data
 * - deleteEmployeeController: Handles DELETE requests to remove employees
 * - getEmployeesByBranchController: Handles GET requests to filter employees by branch
 * - getEmployeesByDepartmentController: Handles GET requests to filter employees by department
 *
 * @author Jack Buchholzer
 * @module controllers/employeeController
 */

import { Request, Response } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, getEmployeesByBranch, getEmployeesByDepartment } from '../services/employeeService';
import { SuccessResponse, ErrorResponse } from '../models/responseModels';

/**
 * Controller function to handle employee creation
 * Validates required fields and creates a new employee record
 * Uses consistent response format
 * @param req - Express Request object containing employee data in body
 * @param res - Express Response object to send back the result
 */
export async function createEmployeeController(req: Request, res: Response): Promise<void> {
    try {
        // Extract employee data from request body
        const { name, position, department, email, phone, branchId } = req.body;

        // Validate required fields
        if (!name || !position || !department || !email || !phone || branchId === undefined) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Create employee object without ID (service will generate it)
        const employeeData = {
            name,
            position,
            department,
            email,
            phone,
            branchId
        };

        // Call service layer to create the employee
        const newEmployee = await createEmployee(employeeData);

        // Return 201 Created status with consistent response format
        const response: SuccessResponse<typeof newEmployee> = {
            success: true,
            data: newEmployee,
            message: "Employee created"
        };
        res.status(201).json(response);
    } catch (error) {
        // Handle any errors that occur during employee creation
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to create employee',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to retrieve all employees
 * Returns the complete list of all employees in the system
 * Uses consistent response format
 * @param _req - Express Request object (unused, prefixed with underscore)
 * @param res - Express Response object to send back the employee list
 */
export async function getAllEmployeesController(_req: Request, res: Response): Promise<void> {
    try {
        // Call service layer to get all employees
        const employees = await getAllEmployees();

        // Return 200 OK status with consistent response format
        const response: SuccessResponse<typeof employees> = {
            success: true,
            data: employees
        };
        res.status(200).json(response);
    } catch (error) {
        // Handle any errors that occur during retrieval
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to retrieve employees',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to retrieve a specific employee by ID
 * Validates the ID and returns the employee if found, or 404 if not found
 * Uses consistent error handling
 * @param req - Express Request object with id parameter in the URL
 * @param res - Express Response object to send back the employee or error
 */
export function getEmployeeByIdController(req: Request, res: Response): void {
    try {
        // Extract and parse employee ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Invalid employee ID'
            };
            res.status(400).json(errorResponse);
            return;
        }

        // Call service layer to find the employee
        const employee = getEmployeeById(id);

        // Return 404 if employee not found, otherwise return 200 with employee data
        if (!employee) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Employee not found'
            };
            res.status(404).json(errorResponse);
            return;
        }

        res.status(200).json(employee);
    } catch (error) {
        // Handle any errors that occur during retrieval with consistent error format
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to retrieve employee',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to update an existing employee
 * Allows partial updates - only the fields provided in the request will be changed
 * Uses consistent error handling
 * @param req - Express Request object with id parameter and update data in body
 * @param res - Express Response object to send back the updated employee or error
 */
export function updateEmployeeController(req: Request, res: Response): void {
    try {
        // Extract and parse employee ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Invalid employee ID'
            };
            res.status(400).json(errorResponse);
            return;
        }

        // Extract update data from request body
        const updateData = req.body;

        // Call service layer to update the employee
        const updatedEmployee = updateEmployee(id, updateData);

        // Return 404 if employee not found, otherwise return 200 with updated employee
        if (!updatedEmployee) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Employee not found'
            };
            res.status(404).json(errorResponse);
            return;
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        // Handle any errors that occur during update with consistent error format
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to update employee',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to delete an employee
 * Removes the employee from the system permanently
 * Uses consistent error handling
 * @param req - Express Request object with id parameter in the URL
 * @param res - Express Response object with 204 status on success, 404 if not found
 */
export function deleteEmployeeController(req: Request, res: Response): void {
    try {
        // Extract and parse employee ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Invalid employee ID'
            };
            res.status(400).json(errorResponse);
            return;
        }

        // Call service layer to delete the employee
        const deleted = deleteEmployee(id);

        // Return 404 if employee not found, otherwise return 204 No Content
        if (!deleted) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Employee not found'
            };
            res.status(404).json(errorResponse);
            return;
        }

        res.status(204).send();
    } catch (error) {
        // Handle any errors that occur during deletion with consistent error format
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to delete employee',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to retrieve employees by branch
 * Filters and returns only employees who work at the specified branch location
 * @param req - Express Request object with branchId parameter in the URL
 * @param res - Express Response object to send back the filtered employee list
 */
export function getEmployeesByBranchController(req: Request, res: Response): void {
    try {
        // Extract and parse branch ID from request parameters
        const branchId = parseInt(req.params.branchId);

        // Validate that branch ID is a valid number
        if (isNaN(branchId)) {
            res.status(400).json({ error: 'Invalid branch ID' });
            return;
        }

        // Call service layer to get employees for the branch
        const employees = getEmployeesByBranch(branchId);

        // Return 200 OK status with the filtered employee array
        res.status(200).json(employees);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({
            error: 'Failed to retrieve employees by branch',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to retrieve employees by department
 * Filters and returns only employees who work in the specified department
 * @param req - Express Request object with department parameter in the URL
 * @param res - Express Response object to send back the filtered employee list
 */
export function getEmployeesByDepartmentController(req: Request, res: Response): void {
    try {
        // Extract department from request parameters
        const department = req.params.department;

        // Call service layer to get employees in the department
        const employees = getEmployeesByDepartment(department);

        // Return 200 OK status with the filtered employee array
        res.status(200).json(employees);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({
            error: 'Failed to retrieve employees by department',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

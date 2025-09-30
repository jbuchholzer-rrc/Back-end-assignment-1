import { Request, Response } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById } from '../services/employeeService';

/**
 * Controller function to handle employee creation
 * @param req - Express Request object containing employee data in body
 * @param res - Express Response object
 */
export function createEmployeeController(req: Request, res: Response): void {
    try {
        // Extract employee data from request body
        const { name, position, department, email, phone, branchId } = req.body;

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
        const newEmployee = createEmployee(employeeData);

        // Return 201 Created status with the newly created employee
        res.status(201).json(newEmployee);
    } catch (error) {
        // Handle any errors that occur during employee creation
        res.status(500).json({
            error: 'Failed to create employee',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to retrieve all employees
 * @param req - Express Request object
 * @param res - Express Response object
 */
export function getAllEmployeesController(_req: Request, res: Response): void {
    try {
        // Call service layer to get all employees
        const employees = getAllEmployees();

        // Return 200 OK status with the employee array
        res.status(200).json(employees);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({
            error: 'Failed to retrieve employees',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to retrieve a specific employee by ID
 * @param req - Express Request object with id parameter
 * @param res - Express Response object
 */
export function getEmployeeByIdController(req: Request, res: Response): void {
    try {
        // Extract and parse employee ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid employee ID' });
            return;
        }

        // Call service layer to find the employee
        const employee = getEmployeeById(id);

        // Return 404 if employee not found, otherwise return 200 with employee data
        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.status(200).json(employee);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({
            error: 'Failed to retrieve employee',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

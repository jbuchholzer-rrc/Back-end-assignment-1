import { Request, Response } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, getEmployeesByBranch, getEmployeesByDepartment } from '../services/employeeService';

/**
 * Controller function to handle employee creation
 * @param req - Express Request object containing employee data in body
 * @param res - Express Response object
 */
export function createEmployeeController(req: Request, res: Response): void {
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

/**
 * Controller function to update an existing employee
 * @param req - Express Request object with id parameter and update data in body
 * @param res - Express Response object
 */
export function updateEmployeeController(req: Request, res: Response): void {
    try {
        // Extract and parse employee ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid employee ID' });
            return;
        }

        // Extract update data from request body
        const updateData = req.body;

        // Call service layer to update the employee
        const updatedEmployee = updateEmployee(id, updateData);

        // Return 404 if employee not found, otherwise return 200 with updated employee
        if (!updatedEmployee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        // Handle any errors that occur during update
        res.status(500).json({
            error: 'Failed to update employee',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to delete an employee
 * @param req - Express Request object with id parameter
 * @param res - Express Response object
 */
export function deleteEmployeeController(req: Request, res: Response): void {
    try {
        // Extract and parse employee ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid employee ID' });
            return;
        }

        // Call service layer to delete the employee
        const deleted = deleteEmployee(id);

        // Return 404 if employee not found, otherwise return 204 No Content
        if (!deleted) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        // Handle any errors that occur during deletion
        res.status(500).json({
            error: 'Failed to delete employee',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to retrieve employees by branch
 * @param req - Express Request object with branchId parameter
 * @param res - Express Response object
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
 * @param req - Express Request object with department parameter
 * @param res - Express Response object
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

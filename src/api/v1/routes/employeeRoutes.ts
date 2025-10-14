/**
 * @fileoverview Employee Routes - Defines all HTTP route endpoints for employee operations.
 * This module sets up the Express router and maps URL paths to controller functions.
 * Each route handles a specific HTTP method (GET, POST, PUT, DELETE) and connects
 * incoming requests to the appropriate controller function.
 *
 * Routes Defined:
 * - POST /employees - Create a new employee
 * - GET /employees - Retrieve all employees
 * - GET /employees/branch/:branchId - Get employees filtered by branch
 * - GET /employees/department/:department - Get employees filtered by department
 * - GET /employees/:id - Get a specific employee by ID
 * - PUT /employees/:id - Update an employee's information
 * - DELETE /employees/:id - Remove an employee
 *
 * Note: Filter routes (branch, department) are placed before the /:id route
 * to prevent the router from treating "branch" or "department" as an ID.
 *
 * @author Jack Buchholzer
 * @module routes/employeeRoutes
 */

import { Router } from 'express';
import {
    createEmployeeController,
    getAllEmployeesController,
    getEmployeeByIdController,
    updateEmployeeController,
    deleteEmployeeController,
    getEmployeesByBranchController,
    getEmployeesByDepartmentController
} from '../controllers/employeeController';
import { validate } from '../middleware/validationMiddleware';
import { employeeSchema } from '../validation/employeeValidation';

const router = Router();

// POST /employees - Create a new employee
// Validates employee data before creating
router.post('/employees', validate(employeeSchema), createEmployeeController);

// GET /employees - Get all employees
router.get('/employees', getAllEmployeesController);

// Logical operation endpoints - Filter employees by specific criteria
// GET /employees/branch/:branchId - Get employees by branch
router.get('/employees/branch/:branchId', getEmployeesByBranchController);

// GET /employees/department/:department - Get employees by department
router.get('/employees/department/:department', getEmployeesByDepartmentController);

// GET /employees/:id - Get a specific employee by ID
router.get('/employees/:id', getEmployeeByIdController);

// PUT /employees/:id - Update an employee by ID
// Validates employee data before updating
router.put('/employees/:id', validate(employeeSchema), updateEmployeeController);

// DELETE /employees/:id - Delete an employee by ID
router.delete('/employees/:id', deleteEmployeeController);

export default router;

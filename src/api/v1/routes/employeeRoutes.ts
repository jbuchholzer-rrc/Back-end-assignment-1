/**
 * Employee Routes
 * This file defines all the routes for employee-related operations
 * including create, read, update, and delete functionality.
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

const router = Router();

// POST /employees - Create a new employee
router.post('/employees', createEmployeeController);

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
router.put('/employees/:id', updateEmployeeController);

// DELETE /employees/:id - Delete an employee by ID
router.delete('/employees/:id', deleteEmployeeController);

export default router;

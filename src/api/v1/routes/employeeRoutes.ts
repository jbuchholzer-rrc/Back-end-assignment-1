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
    deleteEmployeeController
} from '../controllers/employeeController';

const router = Router();

// POST /employees - Create a new employee
router.post('/employees', createEmployeeController);

// GET /employees - Get all employees
router.get('/employees', getAllEmployeesController);

// GET /employees/:id - Get a specific employee by ID
router.get('/employees/:id', getEmployeeByIdController);

// PUT /employees/:id - Update an employee by ID
router.put('/employees/:id', updateEmployeeController);

// DELETE /employees/:id - Delete an employee by ID
router.delete('/employees/:id', deleteEmployeeController);

export default router;

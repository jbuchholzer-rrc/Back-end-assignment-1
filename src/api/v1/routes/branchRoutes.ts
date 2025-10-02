/**
 * @fileoverview Branch Routes - Defines all HTTP route endpoints for branch operations.
 * This module sets up the Express router and maps URL paths to controller functions.
 * Each route handles a specific HTTP method (GET, POST, PUT, DELETE) and connects
 * incoming requests to the appropriate controller function for branch locations.
 *
 * Routes Defined:
 * - POST /branches - Create a new branch location
 * - GET /branches - Retrieve all branch locations
 * - GET /branches/:id - Get a specific branch by ID
 * - PUT /branches/:id - Update a branch's information
 * - DELETE /branches/:id - Remove a branch location
 *
 * @author Jack Buchholzer
 * @module routes/branchRoutes
 */

import { Router } from 'express';
import {
    createBranchController,
    getAllBranchesController,
    getBranchByIdController,
    updateBranchController,
    deleteBranchController
} from '../controllers/branchController';

const router = Router();

// POST /branches - Create a new branch
router.post('/branches', createBranchController);

// GET /branches - Get all branches
router.get('/branches', getAllBranchesController);

// GET /branches/:id - Get a specific branch by ID
router.get('/branches/:id', getBranchByIdController);

// PUT /branches/:id - Update a branch by ID
router.put('/branches/:id', updateBranchController);

// DELETE /branches/:id - Delete a branch by ID
router.delete('/branches/:id', deleteBranchController);

export default router;

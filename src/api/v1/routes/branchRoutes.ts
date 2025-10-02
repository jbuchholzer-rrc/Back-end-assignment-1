/**
 * Branch Routes
 * This file defines all the routes for branch-related operations
 * including create, read, update, and delete functionality.
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

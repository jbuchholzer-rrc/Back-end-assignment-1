import { Request, Response } from 'express';
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from '../services/branchService';

/**
 * Controller function to handle branch creation
 * @param req - Express Request object containing branch data in body
 * @param res - Express Response object
 */
export function createBranchController(req: Request, res: Response): void {
    try {
        // Extract branch data from request body
        const { name, address, phone } = req.body;

        // Create branch object without ID (service will generate it)
        const branchData = {
            name,
            address,
            phone
        };

        // Call service layer to create the branch
        const newBranch = createBranch(branchData);

        // Return 201 Created status with the newly created branch
        res.status(201).json(newBranch);
    } catch (error) {
        // Handle any errors that occur during branch creation
        res.status(500).json({
            error: 'Failed to create branch',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to retrieve all branches
 * @param req - Express Request object
 * @param res - Express Response object
 */
export function getAllBranchesController(_req: Request, res: Response): void {
    try {
        // Call service layer to get all branches
        const branches = getAllBranches();

        // Return 200 OK status with the branches array
        res.status(200).json(branches);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({
            error: 'Failed to retrieve branches',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to retrieve a specific branch by ID
 * @param req - Express Request object with id parameter
 * @param res - Express Response object
 */
export function getBranchByIdController(req: Request, res: Response): void {
    try {
        // Extract and parse branch ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid branch ID' });
            return;
        }

        // Call service layer to find the branch
        const branch = getBranchById(id);

        // Return 404 if branch not found, otherwise return 200 with branch data
        if (!branch) {
            res.status(404).json({ error: 'Branch not found' });
            return;
        }

        res.status(200).json(branch);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({
            error: 'Failed to retrieve branch',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to update an existing branch
 * @param req - Express Request object with id parameter and update data in body
 * @param res - Express Response object
 */
export function updateBranchController(req: Request, res: Response): void {
    try {
        // Extract and parse branch ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid branch ID' });
            return;
        }

        // Extract update data from request body
        const updateData = req.body;

        // Call service layer to update the branch
        const updatedBranch = updateBranch(id, updateData);

        // Return 404 if branch not found, otherwise return 200 with updated branch
        if (!updatedBranch) {
            res.status(404).json({ error: 'Branch not found' });
            return;
        }

        res.status(200).json(updatedBranch);
    } catch (error) {
        // Handle any errors that occur during update
        res.status(500).json({
            error: 'Failed to update branch',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

/**
 * Controller function to delete a branch
 * @param req - Express Request object with id parameter
 * @param res - Express Response object
 */
export function deleteBranchController(req: Request, res: Response): void {
    try {
        // Extract and parse branch ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid branch ID' });
            return;
        }

        // Call service layer to delete the branch
        const deleted = deleteBranch(id);

        // Return 404 if branch not found, otherwise return 204 No Content
        if (!deleted) {
            res.status(404).json({ error: 'Branch not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        // Handle any errors that occur during deletion
        res.status(500).json({
            error: 'Failed to delete branch',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

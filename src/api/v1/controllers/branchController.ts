/**
 * @fileoverview Branch Controller - Handles HTTP requests for branch operations.
 * This module acts as the bridge between the HTTP routes and the branch service layer.
 * It processes incoming requests for branch locations, validates data, calls service functions,
 * and sends back HTTP responses with proper status codes.
 *
 * Main Controller Functions:
 * - createBranchController: Handles POST requests to create new branch locations
 * - getAllBranchesController: Handles GET requests to retrieve all branches
 * - getBranchByIdController: Handles GET requests to find branches by ID
 * - updateBranchController: Handles PUT requests to update branch information
 * - deleteBranchController: Handles DELETE requests to remove branches
 *
 * @author Jack Buchholzer
 * @module controllers/branchController
 */

import { Request, Response } from 'express';
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from '../services/branchService';
import { SuccessResponse, ErrorResponse } from '../models/responseModels';

/**
 * Controller function to handle branch creation
 * Creates a new branch location in the system
 * Uses consistent response structure
 * @param req - Express Request object containing branch data (name, address, phone) in body
 * @param res - Express Response object to send back the created branch
 */
export async function createBranchController(req: Request, res: Response): Promise<void> {
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
        const newBranch = await createBranch(branchData);

        // Return 201 Created status with consistent response format
        const response: SuccessResponse<typeof newBranch> = {
            success: true,
            data: newBranch,
            message: "Branch created"
        };
        res.status(201).json(response);
    } catch (error) {
        // Handle any errors that occur during branch creation
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to create branch',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to retrieve all branches
 * Returns the complete list of all branch locations in the system
 * Uses consistent response structure
 * @param _req - Express Request object (unused, prefixed with underscore)
 * @param res - Express Response object to send back the branch list
 */
export async function getAllBranchesController(_req: Request, res: Response): Promise<void> {
    try {
        // Call service layer to get all branches
        const branches = await getAllBranches();

        // Return 200 OK status with consistent response format
        const response: SuccessResponse<typeof branches> = {
            success: true,
            data: branches
        };
        res.status(200).json(response);
    } catch (error) {
        // Handle any errors that occur during retrieval
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to retrieve branches',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to retrieve a specific branch by ID
 * Validates the ID and returns the branch if found, or 404 if not found
 * Uses consistent response structure
 * @param req - Express Request object with id parameter in the URL
 * @param res - Express Response object to send back the branch or error
 */
export async function getBranchByIdController(req: Request, res: Response): Promise<void> {
    try {
        // Extract and parse branch ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Invalid branch ID'
            };
            res.status(400).json(errorResponse);
            return;
        }

        // Call service layer to find the branch
        const branch = await getBranchById(id);

        // Return 404 if branch not found, otherwise return 200 with branch data
        if (!branch) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Branch not found'
            };
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<typeof branch> = {
            success: true,
            data: branch
        };
        res.status(200).json(response);
    } catch (error) {
        // Handle any errors that occur during retrieval
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to retrieve branch',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to update an existing branch
 * Allows partial updates - only the fields provided in the request will be changed
 * Uses consistent response structure
 * @param req - Express Request object with id parameter and update data in body
 * @param res - Express Response object to send back the updated branch or error
 */
export async function updateBranchController(req: Request, res: Response): Promise<void> {
    try {
        // Extract and parse branch ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Invalid branch ID'
            };
            res.status(400).json(errorResponse);
            return;
        }

        // Extract update data from request body
        const updateData = req.body;

        // Call service layer to update the branch
        const updatedBranch = await updateBranch(id, updateData);

        // Return 404 if branch not found, otherwise return 200 with updated branch
        if (!updatedBranch) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Branch not found'
            };
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<typeof updatedBranch> = {
            success: true,
            data: updatedBranch,
            message: "Branch updated"
        };
        res.status(200).json(response);
    } catch (error) {
        // Handle any errors that occur during update
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to update branch',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * Controller function to delete a branch
 * Removes the branch location from the system permanently
 * Uses consistent response structure
 * @param req - Express Request object with id parameter in the URL
 * @param res - Express Response object with 204 status on success, 404 if not found
 */
export async function deleteBranchController(req: Request, res: Response): Promise<void> {
    try {
        // Extract and parse branch ID from request parameters
        const id = parseInt(req.params.id);

        // Validate that ID is a valid number
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Invalid branch ID'
            };
            res.status(400).json(errorResponse);
            return;
        }

        // Call service layer to delete the branch
        const deleted = await deleteBranch(id);

        // Return 404 if branch not found, otherwise return 204 No Content
        if (!deleted) {
            const errorResponse: ErrorResponse = {
                success: false,
                error: 'Branch not found'
            };
            res.status(404).json(errorResponse);
            return;
        }

        res.status(204).send();
    } catch (error) {
        // Handle any errors that occur during deletion
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Failed to delete branch',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
}

/**
 * @fileoverview Branch Service - Handles all business logic for branch data management.
 * This module provides functions to create, read, update, and delete branch records.
 * Branches represent physical locations where the company operates. All data is stored in memory.
 *
 * Main Functions:
 * - createBranch: Add a new branch location to the system
 * - getAllBranches: Retrieve all branch locations
 * - getBranchById: Find a specific branch by its ID
 * - updateBranch: Modify branch information (name, address, phone)
 * - deleteBranch: Remove a branch from the system
 *
 * @author Jack Buchholzer
 * @module services/branchService
 */

import { Branch } from '../../../data/branches';

// In-memory storage for branches
let branches: Branch[] = [];
let nextId = 1;

/**
 * Creates a new branch with auto-generated ID
 * @param branchData - Branch data without ID
 * @returns The created branch with generated ID
 */
export function createBranch(branchData: Omit<Branch, 'id'>): Branch {
    // Generate new ID
    const newBranch: Branch = {
        id: nextId++,
        ...branchData
    };

    // Add to branches array
    branches.push(newBranch);

    // Return the created branch
    return newBranch;
}

/**
 * Gets all branches
 * @returns Array of all branches
 */
export function getAllBranches(): Branch[] {
    return branches;
}

/**
 * Gets a branch by its ID
 * @param id - The branch ID to search for
 * @returns The branch with the given ID, or undefined if not found
 */
export function getBranchById(id: number): Branch | undefined {
    return branches.find(branch => branch.id === id);
}

/**
 * Updates a branch with new data
 * @param id - The branch ID to update
 * @param updateData - Partial branch data to update
 * @returns The updated branch, or undefined if not found
 */
export function updateBranch(id: number, updateData: Partial<Omit<Branch, 'id'>>): Branch | undefined {
    const branchIndex = branches.findIndex(branch => branch.id === id);

    if (branchIndex === -1) {
        return undefined;
    }

    branches[branchIndex] = { ...branches[branchIndex], ...updateData };
    return branches[branchIndex];
}

/**
 * Deletes a branch by ID
 * @param id - The branch ID to delete
 * @returns True if branch was deleted, false if not found
 */
export function deleteBranch(id: number): boolean {
    const branchIndex = branches.findIndex(branch => branch.id === id);

    if (branchIndex === -1) {
        return false;
    }

    branches.splice(branchIndex, 1);
    return true;
}

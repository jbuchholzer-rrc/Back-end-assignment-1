/**
 * @fileoverview Branch Service - Handles all business logic for branch data management.
 * This module provides functions to create, read, update, and delete branch records.
 * Branches represent physical locations where the company operates. All data is stored in Firestore.
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

import { Branch, branches as branchData } from '../../../data/branches';
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../repositories/firestoreRepository';

// In-memory storage for branches
let branches: Branch[] = branchData;
let nextId = 11;

/**
 * Creates a new branch with auto-generated ID
 * Stores branch data in Firestore
 * @param branchData - Branch data without ID
 * @returns The created branch with generated ID
 */
export async function createBranch(branchData: Omit<Branch, 'id'>): Promise<Branch> {
    try {
        // Create document in Firestore with auto-generated ID
        await createDocument<Omit<Branch, 'id'>>('branches', branchData);

        // Create branch with numeric id for compatibility
        const branch: Branch = {
            id: nextId++,
            ...branchData
        };

        // Add to in-memory array for backward compatibility
        branches.push(branch);

        // Return the created branch
        return branch;
    } catch (error) {
        throw new Error(
            `Failed to create branch: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Gets all branches
 * Fetches branch data from Firestore
 * @returns Array of all branches
 */
export async function getAllBranches(): Promise<Branch[]> {
    try {
        // Fetch all branch documents from Firestore
        const snapshot = await getDocuments('branches');

        // Convert Firestore documents to Branch array
        const firestoreBranches = snapshot.docs.map(doc => ({
            id: nextId++,
            ...doc.data()
        })) as Branch[];

        // Update in-memory array for backward compatibility
        branches = firestoreBranches;

        return branches;
    } catch (error) {
        throw new Error(
            `Failed to get branches: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Gets a branch by its ID
 * Retrieves branch data from Firestore
 * @param id - The branch ID to search for
 * @returns The branch with the given ID, or undefined if not found
 */
export async function getBranchById(id: number): Promise<Branch | undefined> {
    try {
        // Retrieve branch document from Firestore by ID
        const doc = await getDocumentById('branches', id.toString());
        
        if (!doc) {
            return undefined;
        }
        
        const data = doc.data();
        if (!data) {
            return undefined;
        }
        
        return {
            id,
            ...data
        } as Branch;
    } catch (error) {
        throw new Error(
            `Failed to get branch by ID: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Updates a branch with new data
 * Updates branch data in Firestore
 * @param id - The branch ID to update
 * @param updateData - Partial branch data to update
 * @returns The updated branch, or undefined if not found
 */
export async function updateBranch(id: number, updateData: Partial<Omit<Branch, 'id'>>): Promise<Branch | undefined> {
    try {
        // Check if branch exists before updating
        const existingBranch = await getBranchById(id);
        
        if (!existingBranch) {
            return undefined;
        }
        
        // Update branch document in Firestore
        await updateDocument<Partial<Omit<Branch, 'id'>>>('branches', id.toString(), updateData);
        
        // Return the updated branch
        return {
            ...existingBranch,
            ...updateData
        };
    } catch (error) {
        throw new Error(
            `Failed to update branch: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

/**
 * Deletes a branch by ID
 * Deletes branch data from Firestore
 * @param id - The branch ID to delete
 * @returns True if branch was deleted, false if not found
 */
export async function deleteBranch(id: number): Promise<boolean> {
    try {
        // Check if branch exists before deleting
        const existingBranch = await getBranchById(id);
        
        if (!existingBranch) {
            return false;
        }
        
        // Delete branch document from Firestore
        await deleteDocument('branches', id.toString());
        
        return true;
    } catch (error) {
        throw new Error(
            `Failed to delete branch: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

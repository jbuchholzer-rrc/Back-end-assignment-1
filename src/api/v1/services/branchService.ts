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

import { Branch } from '../../../data/branches';
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../repositories/firestoreRepository';

// Counter for generating sequential branch IDs
let nextId = 11;

/**
 * Creates a new branch with auto-generated ID
 * Stores branch data in Firestore with the ID as part of the document
 * @param branchData - Branch data without ID
 * @returns The created branch with generated ID
 */
export async function createBranch(branchData: Omit<Branch, 'id'>): Promise<Branch> {
    try {
        // Create branch with numeric id
        const branch: Branch = {
            id: nextId++,
            ...branchData
        };

        // Store the complete branch object (including ID) in Firestore
        // Use the numeric ID as the document ID for easy retrieval
        await createDocument<Branch>('branches', branch, branch.id.toString());

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
        const branches = snapshot.docs.map(doc => doc.data() as Branch);

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
        
        if (!doc || !doc.exists) {
            return undefined;
        }
        
        // Return the branch data directly (it already contains the ID)
        return doc.data() as Branch;
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
        
        // Create the updated branch object
        const updatedBranch: Branch = {
            ...existingBranch,
            ...updateData
        };
        
        // Update the entire branch document in Firestore
        await updateDocument<Branch>('branches', id.toString(), updatedBranch);
        
        // Return the updated branch
        return updatedBranch;
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

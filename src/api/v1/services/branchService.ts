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

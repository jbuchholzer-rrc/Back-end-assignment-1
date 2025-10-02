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

/**
 * Branch Service Tests
 * This file contains tests for the branch service layer
 * Tests verify Firestore integration and business logic
 * 
 * Author: Jack Buchholzer
 */

import { createBranch } from '../src/api/v1/services/branchService';

describe('Branch Service', () => {
    describe('createBranch', () => {
        // This test verifies the branch service with Firestore integration
        it('should create a branch and return it with an id', async () => {
            const branchData = {
                name: 'Downtown Branch',
                address: '123 Main Street, Vancouver, BC V6B 1A1',
                phone: '604-555-1000'
            };

            // Call the service to create a branch
            const result = await createBranch(branchData);

            // Verify the branch has an id
            expect(result).toHaveProperty('id');
            expect(result.id).toBeDefined();
            expect(typeof result.id).toBe('number');

            // Verify all fields are present and correct
            expect(result.name).toBe(branchData.name);
            expect(result.address).toBe(branchData.address);
            expect(result.phone).toBe(branchData.phone);
        });
    });
});

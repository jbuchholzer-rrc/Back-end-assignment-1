/**
 * Firestore Repository
 * Generic functions for interacting with Firestore database
 *
 * Author: Jack Buchholzer
 */

import { db } from '../../../../config/firebase';

/**
 * Creates a new document in Firestore
 * Takes a collection name and data object, adds to Firestore, returns created document with id
 *
 * @param collectionName - The name of the Firestore collection
 * @param data - The data object to store in the document
 * @returns Promise with the created document including its generated id
 */
export async function createDocument<T>(
    collectionName: string,
    data: T
): Promise<T & { id: string }> {
    try {
        // Add document to Firestore collection
        const docRef = await db.collection(collectionName).add(data as any);

        // Return the document with its generated id
        return {
            id: docRef.id,
            ...data
        };
    } catch (error) {
        // Handle errors during document creation
        throw new Error(
            `Failed to create document in ${collectionName}: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}

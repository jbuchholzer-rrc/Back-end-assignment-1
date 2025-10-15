/**
 * Firebase Configuration
 * Sets up Firebase Admin connection using credentials from environment variables
 * Uses dotenv for local development with external APIs and services
 *
 * Author: Jack Buchholzer
 */

import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin with credentials from environment variables
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
});

// Export Firestore database instance
export const db = admin.firestore();

// Export auth instance
export const auth = admin.auth();

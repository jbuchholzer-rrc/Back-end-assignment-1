/**
 * Response model for successful API responses
 * Uses generics to allow flexible data types
 *
 * Author: Jack Buchholzer
 */
export interface SuccessResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

/**
 * Response model for error API responses
 * Provides consistent error format across the API
 *
 * Author: Jack Buchholzer
 */
export interface ErrorResponse {
    success: boolean;
    error: string;
    details?: any;
}

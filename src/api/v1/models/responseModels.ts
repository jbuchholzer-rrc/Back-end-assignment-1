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

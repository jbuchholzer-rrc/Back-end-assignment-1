import Joi from "joi";

/**
 * Validation schema for branch input data
 * Validates all required fields for creating or updating branch records
 *
 * Author: Jack Buchholzer
 */
export const branchSchema = Joi.object({
    name: Joi.string().min(3).required(),
    address: Joi.string().min(5).required(),
    phone: Joi.string().required(),
});

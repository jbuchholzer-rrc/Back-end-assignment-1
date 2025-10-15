import Joi from "joi";

/**
 * Validation schema for branch input data
 * Validates all required fields for creating branch records
 *
 * Author: Jack Buchholzer
 */
export const branchSchema = Joi.object({
    name: Joi.string().min(3).required(),
    address: Joi.string().min(5).required(),
    phone: Joi.string().required(),
});

/**
 * Validation schema for branch update data
 * Validates fields for updating branch records
 * All fields are optional to allow partial updates
 *
 * Author: Jack Buchholzer
 */
export const branchUpdateSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    address: Joi.string().min(5).optional(),
    phone: Joi.string().optional(),
}).min(1);

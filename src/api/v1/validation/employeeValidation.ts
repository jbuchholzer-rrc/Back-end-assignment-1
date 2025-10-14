import Joi from "joi";

/**
 * Validation schema for employee input data
 * Validates all required fields for creating or updating employee records
 *
 * Author: Jack Buchholzer
 */
export const employeeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    branchId: Joi.number().required(),
});

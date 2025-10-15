import Joi from "joi";

/**
 * Validation schema for employee input data
 * Validates all required fields for creating employee records
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

/**
 * Validation schema for employee update data
 * Validates fields for updating employee records
 * All fields are optional to allow partial updates
 *
 * Author: Jack Buchholzer
 */
export const employeeUpdateSchema = Joi.object({
    name: Joi.string().min(2).optional(),
    position: Joi.string().optional(),
    department: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    branchId: Joi.number().optional(),
}).min(1);

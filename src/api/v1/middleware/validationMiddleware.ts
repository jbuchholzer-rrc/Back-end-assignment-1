import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/**
 * Validation middleware function
 * Takes a Joi schema and returns Express middleware that validates request body
 * If validation fails, sends 400 error response
 * If validation passes, continues to next middleware
 *
 * Author: Jack Buchholzer
 */
export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        next();
    };
};

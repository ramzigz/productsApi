import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Generic validation middleware for any schema
export const validateRequest = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction): void | Response => {
    const { error } = schema.validate(req.query); // Assuming query params are validated
    if (error) {
        // Return a 400 error with validation details
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next(); // Call next() if validation is successful
};

import Joi from 'joi';

// Validation schema for search query (as previously defined)
export const searchProductsSchema = Joi.object({
  q: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Query string cannot be empty',
    'string.min': 'Query string must be at least 1 character long',
    'string.max': 'Query string cannot be longer than 100 characters',
    'any.required': 'Query string is required',
  }),
});

// Validation schema for retrieving products by category (as previously defined)
export const categoryProductsSchema = Joi.object({
  category: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Category cannot be empty',
    'string.min': 'Category name must be at least 1 character long',
    'string.max': 'Category name cannot be longer than 50 characters',
    'any.required': 'Category is required',
  }),
});

// Validation schema for pagination (skip, limit) and field selection (select)
export const paginationAndSelectSchema = Joi.object({
  skip: Joi.number().integer().min(0).default(0).messages({
    'number.base': 'Skip must be a valid number',
    'number.integer': 'Skip must be an integer',
    'number.min': 'Skip must be at least 0',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a valid number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit must be at most 100',
  }),
  select: Joi.string().pattern(/^[a-zA-Z,]+$/).optional().messages({
    'string.pattern.base': 'Select must be a comma-separated list of field names (e.g., "title,price")',
  }),
});

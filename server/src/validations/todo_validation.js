import Joi from 'joi';

const postSchema = Joi.object({
    userId: Joi.number().required().messages({
        "any.required": "Email is required"
    }),
    title: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least {#limit} characters',
      'string.max': 'Title cannot be longer than {#limit} characters',
      'any.required': 'Title is required',
    }),

    status: Joi.string().valid('PENDING', 'IN-PROGRESS', 'COMPLETED').required().messages({
      'any.only': 'Status must be one of [pending, in-progress, completed]',
      'any.required': 'Status is required',
    }),

    completed: Joi.boolean().required().messages({
      'boolean.base': 'Completed must be a boolean',
      'any.required': 'Completed is required',
    }),
});

const updateSchema = Joi.object({
    userId: Joi.number().required().messages({
        "any.required": "Email is required"
    }),
    title: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least {#limit} characters',
      'string.max': 'Title cannot be longer than {#limit} characters',
      'any.required': 'Title is required',
    }),

    status: Joi.string().valid('PENDING', 'IN-PROGRESS', 'COMPLETED').required().messages({
      'any.only': 'Status must be one of [pending, in-progress, completed]',
      'any.required': 'Status is required',
    }),

    completed: Joi.boolean().required().messages({
      'boolean.base': 'Completed must be a boolean',
      'any.required': 'Completed is required',
    }),
});

export default {
    postSchema,
    updateSchema,
};

import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least {#limit} characters long",
    "string.max": "Username cannot be longer than {#limit} characters",
    "any.required": "Username is required"
  }),
  email: Joi.string().email().required().messages({
    "string.min": "Email must be at least {#limit} characters long",
    "string.max": "Email cannot be longer than {#limit} characters",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be longer than {#limit} characters",
    "any.required": "Password is required"
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.min": "Email must be at least {#limit} characters long",
    "string.max": "Email cannot be longer than {#limit} characters",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be longer than {#limit} characters",
    "any.required": "Password is required"
  }),
});

const updateSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least {#limit} characters long",
    "string.max": "Username cannot be longer than {#limit} characters",
    "any.required": "Username is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Username must be at least {#limit} characters long",
    "string.max": "Username cannot be longer than {#limit} characters",
    "any.required": "Password is required"
  }),
});

export default {
    registerSchema,
    loginSchema,
    updateSchema,
}
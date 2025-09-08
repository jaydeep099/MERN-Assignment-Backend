const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required().min(2).messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "Minimum 2 characters are required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().required().min(2).messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "string.min": "Minimum 2 characters are required",
    "any.required": "Last name is required",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email is not valid",
    "any.required": "Email is required",
  }),
});

const setPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email is not valid",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  setPasswordSchema,
};

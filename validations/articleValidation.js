const Joi = require("joi");

const articleSchema = Joi.object({
  title: Joi.string().required().min(5).max(60).messages({
    "string.base": "title must be string",
    "any.required": "title is required",
    "string.min": "Minimum 5 characters are required",
    "string.max": "Maximum 60 characters are required",
  }),
  content: Joi.string().required().min(10).messages({
    "string.base": "title must be string",
    "any.required": "title is required",
    "string.min": "Minimum 10 characters are required",
  }),
});

module.exports = {
  articleSchema 
};

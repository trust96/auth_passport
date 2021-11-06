import Joi from "joi";

export const registerValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(6).max(15).required(),
  role: Joi.string().required(),
  age: Joi.number().required().min(12).max(100),
  username: Joi.string().required(),
});

export const loginValidation = Joi.object({
  password: Joi.string().min(6).max(15).required(),
  username: Joi.string().required(),
});

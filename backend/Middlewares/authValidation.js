const Joi = require("joi");

// Validation middleware for user authentication
const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    role: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid signup data", error });
  }
  next();
};
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid login data", error });
  }
  next();
};

// adding validaation for admins authentication
const adminSignupValidation = (req, res, next) => {
  const schema = Joi.object({
    institution: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    role: Joi.string().valid("Administrator").required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid admin data", error });
  }
  next();
};
const adminLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid admin login data", error });
  }
  next();
};

module.exports = {
  signinValidation,
  loginValidation,
  adminSignupValidation,
  adminLoginValidation,
};

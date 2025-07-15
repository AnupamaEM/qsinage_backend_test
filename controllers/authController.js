const authService = require('../services/authService');
const Joi = require('joi');

const validate = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.signup = async (req, res, next) => {
  try {
    validate(registerSchema, req.body);
    const user = await authService.signup(req.body);
    res.status(201).json({ message: 'User registered', user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    validate(loginSchema, req.body);
    const result = await authService.signin(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

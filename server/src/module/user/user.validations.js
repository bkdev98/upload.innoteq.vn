import Joi from 'joi';

export default {
  register: {
    body: {
      email: Joi.string().min(3).max(120).required(),
      password: Joi.string().min(6).max(120).required(),
      fullname: Joi.string().min(3).max(80).required(),
      avatar: Joi.string(),
      role: Joi.string(),
    },
    options: {
      allowUnknownBody: false,
    },
  },
  createUser: {
    body: {
      email: Joi.string().min(3).max(120).required(),
      password: Joi.string().min(6).max(120).required(),
      fullname: Joi.string().min(3).max(80).required(),
      avatar: Joi.string(),
      role: Joi.string(),
    },
  },
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  editProfile: {
    body: {
      email: Joi.string().min(3).max(120),
      password: Joi.string().min(6).max(120),
      fullname: Joi.string().min(3).max(80),
      avatar: Joi.string(),
      role: Joi.string(),
    },
    options: {
      allowUnknownBody: false,
    },
  },
  resetPassword: {
    body: {
      password: Joi.string().min(6).max(120).required(),
    },
  },
};
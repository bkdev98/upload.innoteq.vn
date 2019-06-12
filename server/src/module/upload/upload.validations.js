import Joi from 'joi';

export default {
  upload: {
    data: {
      file: Joi.binary(),
    },
  },
};

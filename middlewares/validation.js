const { celebrate, Joi } = require('celebrate');
const { regexForLinks } = require('../utils/constants');

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const userInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexForLinks),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexForLinks),
  }),
});

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexForLinks),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  userIdValidator,
  userInfoValidator,
  signinValidator,
  signupValidator,
  userAvatarValidator,
  cardValidator,
  cardIdValidator,
};

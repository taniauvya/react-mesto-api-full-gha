const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, getSelfUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { MONGO_ID_LENGTH, linkRx } = require('../validations/constants');

router.get('/', getUsers);

router.get('/me', getSelfUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(MONGO_ID_LENGTH),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).options({ presence: 'required' }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkRx),
  }).options({ presence: 'required' }),
}), updateAvatar);

module.exports = router;

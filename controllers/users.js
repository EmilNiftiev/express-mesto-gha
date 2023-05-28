const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_CODES.OK).send({ users }))
    .catch((err) => res.status(STATUS_CODES.SERVER_ERROR).send({
      message: 'Ошибка сервера',
      err: err.message,
      stack: err.stack,
    }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res
          .status(STATUS_CODES.SERVER_ERROR)
          .send({
            message: 'Ошибка сервера',
            err: err.message,
            stack: err.stack,
          });
      }
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.OK).send({ data: user });
      } else {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .send({
            message: 'Введены некорректные данные для поиска',
            err: err.message,
            stack: err.stack,
          });
      } else {
        res
          .status(STATUS_CODES.SERVER_ERROR)
          .send({ message: 'Ошибка сервера' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.OK).send(user);
      } else {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при обновлении аватара',
            err: err.message,
            stack: err.stack,
          });
      } else {
        res
          .status(STATUS_CODES.SERVER_ERROR)
          .send({ message: 'Ошибка сервера' });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.status(STATUS_CODES.OK).send(user);
      } else {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля',
            err: err.message,
            stack: err.stack,
          });
      } else {
        res
          .status(STATUS_CODES.SERVER_ERROR)
          .send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
};

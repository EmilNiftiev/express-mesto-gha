const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, { expiresIn: '7d' });
      res.send({ _id: token });
    })
    .catch(next);
};

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
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
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
    .orFail(new Error('NotValidUserId')) // Если ошибка, сразу пробрасываем в блок Catch
    .then((user) => {
      res.status(STATUS_CODES.OK).send({ data: user });
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
      } else if (err.message === 'NotValidUserId') {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({
            message: 'Пользователь не найден',
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

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new Error('NotValidUserId')) // Если ошибка, сразу пробрасываем в блок Catch
    .then((user) => {
      res.status(STATUS_CODES.OK).send(user);
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
      } else if (err.message === 'NotValidUserId') {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({
            message: 'Пользователь не найден',
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

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(new Error('NotValidUserId')) // Если ошибка, сразу пробрасываем в блок Catch
    .then((user) => {
      res.status(STATUS_CODES.OK).send(user);
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
      } else if (err.message === 'NotValidUserId') {
        res
          .status(STATUS_CODES.NOT_FOUND)
          .send({
            message: 'Пользователь не найден',
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

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
  login,
};

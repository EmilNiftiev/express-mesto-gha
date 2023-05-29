/* eslint-disable no-console */
const Card = require('../models/card');
const { STATUS_CODES } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(STATUS_CODES.OK).send({ cards }))
    .catch((err) => res.status(STATUS_CODES.SERVER_ERROR).send({
      message: 'Ошибка сервера',
      err: err.message,
      stack: err.stack,
    }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CODES.CREATED).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании карточки',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(STATUS_CODES.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Переданы некорректные данные для постановки лайка',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(STATUS_CODES.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Переданы некорректные данные для снятия лайка',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(STATUS_CODES.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({
          message: 'Карточка не найдена',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};

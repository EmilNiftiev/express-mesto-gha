const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const {
  cardValidator,
  cardIdValidator,
} = require('../middlewares/validation');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', cardValidator, createCard);
cardRouter.put('/cards/:cardId/likes', cardIdValidator, likeCard);
cardRouter.delete('/cards/:cardId/likes', cardIdValidator, dislikeCard);
cardRouter.delete('/cards/:cardId', cardIdValidator, deleteCard);

module.exports = cardRouter;

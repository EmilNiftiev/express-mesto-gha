/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet'); // Установка: npm install --save helmet
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { STATUS_CODES } = require('./utils/constants');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

const app = express();
app.use(helmet()); // Набор middleware-функций для защиты от веб-уязвимостей

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('БД подключена'))
  .catch((err) => console.log('Ошбика подключения к БД', err));

mongoose.set({ runValidators: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6473529d41c875d94c20d456',
  };
  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.all('/*', (req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Такой страницы не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

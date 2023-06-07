/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet'); // Установка: npm install --save helmet
const { default: mongoose } = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');

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

app.post('/signin', login);
app.post('/signup', createUser);

// app.use(auth); // Все маршруты, расположенные ниже, защищены авторизацией
app.use('/', userRouter);
app.use('/', cardRouter);
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

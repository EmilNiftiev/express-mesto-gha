const mongoose = require('mongoose');
const validator = require('validator'); // Установка: npm install validator

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'], // Указываем требования и передаем клиенту сообщение об ошибке
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    }, // https://www.npmjs.com/package/validator
    required: true,
  },
}, { versionKey: false }); // Убираем отслеживание версии схемы ("__v" в объекте)

module.exports = mongoose.model('user', userSchema);

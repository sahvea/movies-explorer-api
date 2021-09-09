const CAST_ERR = 'CastError';
const VALIDATION_ERR = 'ValidationError';
const MONGO_ERR = 'MongoError';

const codeStatuses = {
  mongoErr: 11000,
  internalServerErr: 500,
};

const messages = {
  internalServerError: 'На сервере произошла ошибка.',
  incorrectEmail: 'Некорректный формат почты.',
  incorrectURL: 'Некорректный формат ссылки.',
  incorrectLoginData: 'Неправильные почта или пароль.',
  incorrectUserId: 'Пользователь по указанному _id не найден.',
  incorrectProfileDataCreate: 'Переданы некорректные данные при создании пользователя.',
  incorrectProfileDataUpdate: 'Переданы некорректные данные при обновлении профиля.',
  alreadyExistingEmail: 'Пользователь с текущим email уже зарегистрирован.',
  incorrectMovieDataCreate: 'Переданы некорректные данные при создании фильма.',
  incorrectMovieId: 'Фильм с указанным _id не найден.',
  movieDeletionError: 'Недостаточно прав для удаления фильма.',
  notFoundError: 'Запрашиваемый ресурс не найден.',
  successfulLogin: 'Cookies успешно созданы.',
  successfulLogout: 'Cookies успешно удалены.',
  authError: 'Ошибка аутентификации.',
  authRequired: 'Необходима авторизация.',
};

module.exports = {
  CAST_ERR,
  VALIDATION_ERR,
  MONGO_ERR,
  codeStatuses,
  messages,
};

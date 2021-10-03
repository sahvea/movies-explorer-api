const CAST_ERR = 'CastError';
const VALIDATION_ERR = 'ValidationError';
const MONGO_ERR = 'MongoError';

const CORS_METHODS = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD'];
const CORS_HEADERS = ['Authorization', 'Content-Type', 'Accept'];
const ALLOWED_CORS = [
  'https://sahvea.diploma.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];

const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
} = process.env;

const codeStatuses = {
  badRequestErr: 400,
  unauthorizedErr: 401,
  forbiddenErr: 403,
  notFoundErr: 404,
  conflictErr: 409,
  internalServerErr: 500,
  mongoErr: 11000,
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
  corsErr: 'Not allowed by CORS',
};

module.exports = {
  CAST_ERR,
  VALIDATION_ERR,
  MONGO_ERR,
  MONGO_URL,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
  PORT,
  codeStatuses,
  messages,
  CORS_METHODS,
  CORS_HEADERS,
  ALLOWED_CORS,
};

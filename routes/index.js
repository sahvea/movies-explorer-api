const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err'); // 404
const { validateUserBody, validateUserEntranceData } = require('../middlewares/validation');
const { messages } = require('../utils/constants');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateUserEntranceData, login);
router.delete('/signout', logout);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.all('*', () => {
  throw new NotFoundError(messages.notFoundError);
});

module.exports = router;

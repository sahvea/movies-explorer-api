const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { NotFoundError } = require('../errors/classes');
const messages = require('../utils/messages');

router.post('/signup', createUser);
router.post('/signin', login);
router.delete('/signout', logout);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.use('*', () => {
  throw new NotFoundError(messages.notFoundError);
});

module.exports = router;

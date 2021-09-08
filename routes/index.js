const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

const { NotFoundError } = require('../errors/classes');
const messages = require('../utils/messages');

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.use('*', () => {
  throw new NotFoundError(messages.notFoundError);
});

module.exports = router;

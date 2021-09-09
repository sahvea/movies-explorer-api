const router = require('express').Router();

const { getCurrentUser, updateUser } = require('../controllers/users');
const { validateUserUpdateData } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserUpdateData, updateUser);

module.exports = router;

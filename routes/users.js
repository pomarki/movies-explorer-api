const router = require('express').Router();
const { validationsUpdateUser } = require('../middlewares/validations');
const { getActualUserInfo, updateUserProfile } = require('../controllers/users');

router.get('/me', getActualUserInfo);
router.patch('/me', validationsUpdateUser, updateUserProfile);

module.exports = router;

const router = require('express').Router();
const {
  getSelfUser, updateUser,
} = require('../controllers/users');
const { updateUser: updateUserSchema } = require('../validations/joiSchemas');

router.get('/me', getSelfUser);
router.patch('/me', updateUserSchema, updateUser);

module.exports = router;

const router = require('express').Router();

const { signup: signupSchema, signin: signinSchema } = require('../validations/joiSchemas');
const NotFoundError = require('../errors/NotFoundError');

const {
  login, createUser,
} = require('../controllers/users');

router.post('/signin', signinSchema, login);
router.post('/signup', signupSchema, createUser);

router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Нет обработчика данного пути'));
});

module.exports = router;

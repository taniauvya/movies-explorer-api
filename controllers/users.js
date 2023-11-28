const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleUpdateErr, handleCreateDupErr, handleGetSingleErr } = require('../errors/handlers');

const { JWT_SECRET } = require('../config');

const notFoundMessage = 'Пользователь с данным ID не найден';

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports.getSelfUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleGetSingleErr(next, err, notFoundMessage));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      /* eslint-disable no-shadow */
      const { password, ...userProps } = user._doc;
      /* eslint-enable no-shadow */
      return res.send(userProps);
    })
    .catch((err) => handleCreateDupErr(next, err));
};

module.exports.updateUser = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: false, // если пользователь не найден, он не будет создан
  })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleUpdateErr(next, err, notFoundMessage));
};

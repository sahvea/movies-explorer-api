const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const messages = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: messages.incorrectEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(messages.incorrectLoginData));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(messages.incorrectLoginData));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

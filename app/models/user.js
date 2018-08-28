"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  auth: {
    local: {
      username: String,
      email: String,
      password: String,
    },
    facebook: {
      id: String,
      token: String,
      name: String,
      email: String
    },
    twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    }
  }

});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.auth.local.password);
};

module.exports = mongoose.model('User', userSchema);
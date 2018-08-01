"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let User = require('../../../models/user');

module.exports = function () {
  passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
      User.findOne({'auth.local.username': username}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log('User not found');
          return done(null, false);
        }
        if (!user.validatePassword(password)) {
          console.log('Password not valid');
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));
};
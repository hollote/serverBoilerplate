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
          return done(null, false, { message: 'user not found' });
        }
        if (!user.validatePassword(password)) {
          return done(null, false, { message: 'wrong password' });
        }
        return done(null, user);
      });
    }
  ));
};
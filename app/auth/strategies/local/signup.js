"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let User = require('../../../models/user');

module.exports = function () {
  passport.use('local-signup', new LocalStrategy(
    function (username, password, done) {
      User.findOne({'auth.local.username': username}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          console.log('User already created');
          return done(null, false);
        }
        let newUser = new User();
        newUser.auth.local.username = username;
        // also save other data on signup (as email)
        newUser.auth.local.password = newUser.generateHash(password);
        newUser.save(function (err) {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      });
    }
  ));
};
"use strict";

const LocalStrategy = require('passport-local').Strategy;

function isLoggedIn() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
}

const user = {
  username: 'test-user',
  password: 'test-password',
  id: 1
};

let findUser = (username, cb) => cb(false, user);

module.exports = function (passport) {

  passport.serializeUser(function (user, cb) {
    cb(null, {username: user.username, id: user.id});
  });

  passport.deserializeUser(function (id, cb) {
    findUser(id, function (err, user) {
      cb(err, user);
    });
  });

  passport.use('local', new LocalStrategy(
    function (username, password, done) {
      findUser(username, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (password !== user.password) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));
  passport.isLoggedIn = isLoggedIn;
};
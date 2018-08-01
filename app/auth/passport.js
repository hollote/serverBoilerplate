"use strict";

const path = require('path');

module.exports = function (passport) {

  passport.isLoggedIn = () => (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
  passport.serializeUser(function (user, cb) {
    //TODO: remove all password from saving in session
    cb(null, user);
  });
  passport.deserializeUser(function (user, cb) {
    cb(null, user);
    // User.findById(id, function (err, user) {
    //   done(err, user);
    // });
  });

  //load strategy files
  require(path.join(__dirname, 'strategies/local', 'login'))();
  require(path.join(__dirname, 'strategies/local', 'signup'))();
};
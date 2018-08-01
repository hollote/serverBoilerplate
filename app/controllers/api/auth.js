"use strict";
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * check if login
 */
router.get('/', function (req, res) {
  //TODO: fix trigger twice
  let sessionData = req.session && req.session.passport;
  if (!sessionData || !sessionData.user || !sessionData.user.id) {
    res.status(401);
    res.json({success: false, error: {message: 'Unauthorized'}});
    return;
  }
  res.status(200);
  res.json({
    success: true,
    data: {
      user: sessionData.user
    }
  });
});
/**
 * Login
 */

//TODO: fix response wait if wrong auth
router.post('/',
  passport.authenticate('local-login', {
    failureRedirect: '/error'
  }),
  function (req, res) {
    res.status(200);
    res.json({success: true, data: {user: _.omit(req.user, 'passwordHash')}});
  });

/**
 * SignUp
 */
//TODO: fix response wait if user already exists
router.post('/signup',
  passport.authenticate('local-signup'),
  function (req, res) {
    res.status(200);
    res.json({success: true, data: {user: _.omit(req.user, 'passwordHash')}});
  });

/**
 * Logout
 */
router.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
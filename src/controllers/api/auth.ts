"use strict";
import * as _ from 'lodash';
import * as express from 'express';
const router = express.Router();
import * as passport from "passport";

/**
 * check if login
 */
router.get('/', function (req, res) {
  //TODO: fix trigger twice
  let sessionData = req.session && req.session.passport;
  if (!sessionData || !sessionData.user || !sessionData.user._id) {
    res.status(401);
    return res.json({success: false, error: {message: 'Unauthorized'}});
  }
  res.status(200);
  return res.json({
    success: true,
    data: {
      user: sessionData.user
    }
  });
});
/**
 * Login
 */

router.post('/', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      res.status(500);
      return res.json({success: false, error: {message: err}});
    }
    if (!user) {
      res.status(401);
      return res.json({success: false, error: {info}});
    }
    res.status(200);
    return res.json({success: true, data: {user: _.omit(req.user, 'auth.local.password')}});
  })(req, res, next);
});

/**
 * SignUp
 */
//TODO: fix response wait if user already exists
router.post('/signup',
  passport.authenticate('local-signup'),
  function (req, res) {
    res.status(200);
    return res.json({success: true, data: {user: _.omit(req.user, 'auth.local.password')}});
  });

/**
 * Logout
 */
router.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

export {
  router
};

//TODO: end /signup middleware, /logout  + move them upper (before /)

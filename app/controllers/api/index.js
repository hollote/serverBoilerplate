"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/auth', require('./auth'));
router.use('/profile', passport.isLoggedIn(), (req, res) => {
  res.status(200);
  res.render('index', {title: 'Profile'});
});

module.exports = router;
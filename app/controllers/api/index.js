"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/auth', require('./auth'));
router.use('/profile', passport.isLoggedIn(), ()=>'test');

module.exports = router;
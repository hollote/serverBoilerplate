"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
  console.log(req.user);
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
      user: {username: req.user.username, id: req.user.id}
    }
  });
});
router.post('/',
  passport.authenticate('local', {failureRedirect: '/error'}),
  function (req, res) {
    res.status(200);
    res.json({success: true, data: {user: req.user}});
  });
module.exports = router;
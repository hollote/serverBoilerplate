"use strict";
const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use('/api/', require('./api/index'));

router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

module.exports = router;
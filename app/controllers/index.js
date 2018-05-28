"use strict";
const express = require('express');
const router = express.Router();

router.use('/api/', require('./api/index'));

router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

module.exports = router;
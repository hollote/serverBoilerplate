"use strict";
const express = require('express');
const router = express.Router();
const indexRouter = require('../../routes/index');

router.use('/test', indexRouter);

module.exports = router;
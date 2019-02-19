"use strict";

const configDatabase = require('../config/database');
const express = require('express');
const app = express();

// const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const sassMiddleware = require('node-sass-middleware');
const log = require('./utils/logger');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

require('./auth/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(global.PROJECT_ROOT, 'public')));

mongoose.connect(configDatabase.mongoDB.url, { useNewUrlParser: true });

app.use(session({
  store: new RedisStore({
    url: configDatabase.redisStore.url
  }),
  secret: configDatabase.redisStore.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./controllers/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // console.log(req);
  //TODO: log req.baseUrl correct.
  log.info(`requested url: ${req.baseUrl}`);
  // next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export {
  app
};

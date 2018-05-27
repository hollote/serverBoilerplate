"use strict";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log = require('./utils/logger');
const session = require('express-session');

const app = express();

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
app.use(express.static(path.join(__dirname, 'public')));

//TODO: save session in store
// app.use(session({
//   key: 'sid',
//   secret: 'session_cookie_secret',
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: false
// }));

app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;

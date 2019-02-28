'use strict';

import {PassportStatic} from 'passport';
import {Strategy} from 'passport-local';
import {Request} from 'express';

import {IUserModel, User, userCreate} from '../models/user';

export const localLoginCallback = (err: any, user: IUserModel | null, password: string, cb: any) => {
  if (err) {
    return cb(err);
  }
  if (!user || !user.validatePassword(password)) {
    return cb(null, false, {message: 'wrong email or password'});
  }
  return cb(null, user);
};

export const localSignupCallback = (err: any, user: IUserModel | null, req: Request, email: string, password: string, cb: any) => {
  if (err) {
    return cb(err);
  }
  if (user) {
    return cb(null, false, {message: 'user already created'});
  }

  // TODO: change all to promises
  return userCreate({email, username: req.body.username, password}).then((newUser) => {
    return cb(null, newUser);
  }, (err: any) => {
    throw err;
  });

};

export const localLoginStrategy = (email: string, password: string, cb: any) =>
  User.findOne({'auth.local.email': email}, (err, user) => localLoginCallback(err, user, password, cb));

export const localSignupStrategy = (req: Request, email: string, password: string, cb: any) =>
  User.findOne({'auth.local.email': email}, (err, user) => localSignupCallback(err, user, req, email, password, cb));

export const serializeUser = (user: IUserModel, cb: (err: any, user: IUserModel) => any) => {
  cb(null, user.id);
};

export const deserializeUser = (userId: string, cb: (err: any, user: IUserModel) => any) => {
  User.findById(userId, (err, user: IUserModel) => {
    cb(err, user);
  });
};

export let init = (passport: PassportStatic) => {
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  passport.use('local-login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, localLoginStrategy));
  passport.use('local-signup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, localSignupStrategy));
};

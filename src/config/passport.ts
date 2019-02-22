'use strict';

import {PassportStatic} from 'passport';
import {Strategy} from 'passport-local';
import {Request, Response, NextFunction} from 'express';

import {IUserModel, User, userCreate} from '../models/user';

export let init = (passport: PassportStatic) => {

  passport.serializeUser<any, any>((user: IUserModel, cb: any) => {
    cb(null, user.id);
  });

  passport.deserializeUser((userId: string, cb: any) => {
    User.findById(userId, (err, user) => {
      cb(err, user);
    });
  });

  const localLoginStrategy = (email: string, password: string, cb: any) =>
    User.findOne({'auth.local.email': email}, (err: any, user: IUserModel) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false, {message: 'user not found'});
      }
      if (!user.validatePassword(password)) {
        return cb(null, false, {message: 'wrong email or password'});
      }
      return cb(null, user);
    });

  const localSignupStrategy = (req: Request, email: string, password: string, cb: any) =>
    User.findOne({'auth.local.email': email}, (err: any, user: IUserModel) => {
      if (err) {
        return cb(err);
      }
      if (user) {
        return cb(null, false, {message: 'user already created'});
      }

      userCreate({email, username: req.body.username, password}).then((newUser) => {
        return cb(null, newUser);
      }, (err: any) => {
        throw err;
      });
    });

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

export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  return res.json({success: false, error: {message: 'Unauthorized'}});
};

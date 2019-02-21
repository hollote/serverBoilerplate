"use strict";

import {PassportStatic} from 'passport';
import {Strategy} from "passport-local";
import {Request, Response, NextFunction} from 'express';

import {IUserModel, User} from "../models/user";

export let init = (passport: PassportStatic) => {

  passport.serializeUser<any, any>((user: IUserModel, cb: any) => {
    console.log(user);
    cb(null, user);
  });

  passport.deserializeUser((user: IUserModel, cb: any) => {
    console.log(user);
    cb(null, user);
    // User.findById(id, (err, user) => {
    //   cb(err, user);
    // });
  });

  const localLoginStrategy = (username: string, password: string, cb: any) =>
    User.findOne({'auth.local.username': username}, function (err: any, user: IUserModel) {
      console.log(1);
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

  const localSignupStrategy = (username: string, password: string, cb: any) =>
    User.findOne({'auth.local.username': username}, function (err: any, user: IUserModel) {
      console.log(2);
      if (err) {
        return cb(err);
      }
      if (user) {
        console.log('User already created');
        return cb(null, false);
      }
      let newUser = new User();
      newUser.auth.local.username = username;
      // also save other data on signup (as email)
      newUser.auth.local.password = newUser.generateHash(password);
      newUser.save(function (err: any) {
        if (err) {
          throw err;
        }
        return cb(null, newUser);
      });
    });

  passport.use('local-login', new Strategy(localLoginStrategy));
  passport.use('local-signup', new Strategy(localSignupStrategy));

};

export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  return res.json({success: false, error: {message: 'Unauthorized'}});
};

"use strict";

import {IUserModel, User} from "../../../models/user";

const localSignupStrategy = (username: string, password: string, cb: any) =>
  User.findOne({'auth.local.username': username}, function (err: any, user: IUserModel) {
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

export {
  localSignupStrategy
}

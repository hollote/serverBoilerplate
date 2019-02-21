"use strict";

import {IUserModel, User} from "../../../models/user";

const localLoginStrategy = (username: string, password: string, cb: any) => {
  User.findOne({'auth.local.username': username}, function (err: any, user: IUserModel) {
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, false, {message: 'user not found'});
    }
    if (!user.validatePassword(password)) {
      return cb(null, false, {message: 'wrong password'});
    }
    return cb(null, user);
  });
};

export {
  localLoginStrategy
}

'use strict';

import {Document, Schema, Model, model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import _ = require('lodash');

import {IUser} from '../interfaces/user';

export interface IUserModel extends IUser, Document {
  generateHash(password: string): string;
  validatePassword(password: string): boolean;
}

export interface IUserCreateAttr {
  email: string;
  username: string;
  password: string;
}

export let UserSchema: Schema = new Schema({
  auth: {
    local: {
      username: String,
      email: String,
      password: String,
    },
    // facebook: {
    //   id: String,
    //   token: String,
    //   name: String,
    //   email: String
    // },
    // twitter: {
    //   id: String,
    //   token: String,
    //   displayName: String,
    //   username: String
    // },
    // google: {
    //   id: String,
    //   token: String,
    //   email: String,
    //   name: String
    // }
  },

});

export const getUserData = (user: IUserModel) => _.pick(user, 'id', 'auth.local.email', 'auth.local.username');

UserSchema.methods.generateHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
UserSchema.methods.validatePassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.auth.local.password);
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export const userCreate = (createAttr: IUserCreateAttr) => {
  const newUser = new User();
  newUser.auth.local.email = createAttr.email;
  newUser.auth.local.username = createAttr.username;
  newUser.auth.local.password = newUser.generateHash(createAttr.password);
  return newUser.save();
};

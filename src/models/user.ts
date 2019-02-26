'use strict';

import {Document, Schema, Model, model} from 'mongoose';
import _ = require('lodash');

import {IUser} from '../interfaces/user';
import {generateHash, validatePassword} from '../utils/common';

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
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
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
UserSchema.methods.generateHash = generateHash;
UserSchema.methods.validatePassword = function(password: string): boolean {
  return validatePassword(password, this.auth.local.password);
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
export const getUserData = (user: IUserModel) => _.pick(user, 'id', 'auth.local.email', 'auth.local.username');
export const userCreate = (createAttr: IUserCreateAttr) => {
  const newUser = new User();
  newUser.auth.local.email = createAttr.email;
  newUser.auth.local.username = createAttr.username;
  newUser.auth.local.password = newUser.generateHash(createAttr.password);
  return newUser.save();
};

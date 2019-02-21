"use strict";

import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
  generateHash(password: string): string,
  validatePassword(password: string): boolean
}
import * as bcrypt from 'bcrypt';

export let UserSchema: Schema = new Schema({
  auth: {
    local: {
      username: String,
      email: String,
      password: String,
    }
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
  }

});

UserSchema.methods.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
UserSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.auth.local.password);
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

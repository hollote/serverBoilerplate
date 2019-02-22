'use strict';

import {Request, Response} from 'express';
import * as joi from 'joi';

import {getUserData} from '../../../models/user';

export const schema = {
  body: {
    username: joi.string().required(),
    email: joi.string().email({minDomainAtoms: 2}),
    password: joi.string().required(),
  },
};

export let handler = (req: Request, res: Response) => {
  res.status(200);
  return res.json({success: true, data: {user: getUserData(req.user)}});
};

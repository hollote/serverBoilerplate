'use strict';

import {Request, Response} from 'express';

import {getUserData} from '../../../models/user';

export let handler = (req: Request, res: Response) => {
  const sessionData = req.session && req.session.passport;
  if (!sessionData || !sessionData.user) {
    res.status(401);
    return res.json({success: false, error: {message: 'Unauthorized'}});
  }
  res.status(200);
  return res.json({success: true, data: {user: getUserData(req.user)}});
};

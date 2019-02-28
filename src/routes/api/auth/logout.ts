'use strict';

import {Request, Response} from 'express';

export let handler = (req: Request, res: Response) => {
  req.logout();
  res.status(200);
  return res.json({success: true, data: {message: 'Logout successful'}});
};

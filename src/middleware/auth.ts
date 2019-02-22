import {NextFunction, Request, Response} from 'express';

export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  return res.json({success: false, error: {message: 'Unauthorized'}});
};

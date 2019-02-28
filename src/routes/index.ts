'use strict';

import * as express from 'express';
import {Request, Response, NextFunction} from 'express';

import {router as api} from './api';
import {logger} from '../utils/logger';
import {CustomErrback} from '../interfaces/errors';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use('/api/', api);

router.use((req: Request, res: Response) => {
  logger.info(`requested url: ${req.url}`);
  res.status(404);
  return res.json({success: false, error: {message: 'Not Found'}});
});
// TODO: create test
router.use((err: CustomErrback, req: Request, res: Response) => {
  res.status(err.status || 500);
  return res.json({success: false, error: {message: req.app.get('env') === 'development' ? err.message : ''}});
});

export {
  router,
};

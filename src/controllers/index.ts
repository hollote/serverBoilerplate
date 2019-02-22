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

router.get('/', (req: Request, res: Response) => {
  res.render('index', {title: 'Express'});
});

// catch 404 and forward to error handler
router.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req);
  // TODO: log req.baseUrl correct.
  logger.info(`requested url: ${req.baseUrl}`);
  // next(createError(404));
});

// error handler
router.use((err: CustomErrback, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export {
  router,
};

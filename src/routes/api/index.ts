'use strict';

import * as express from 'express';

import { isAuthenticated } from '../../middleware/auth';
import { router as auth } from './auth';

const router = express.Router();
router.use('/auth', auth);
router.use('/profile', isAuthenticated, (req, res) => {
  res.status(200);
  return res.json({
    success: true,
    data: {
      auth: 'authorized',
    },
  });
});

export {
  router,
};

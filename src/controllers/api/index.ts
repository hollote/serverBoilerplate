"use strict";
import * as express from 'express';
const router = express.Router();
import { isAuthenticated } from '../../config/passport';
import { router as auth } from './auth';

router.use('/auth', auth);
router.use('/profile', isAuthenticated, (req, res) => {
  res.status(200);
  return res.json({
    success: true,
    data: {
      auth: 'authorized'
    }
  });
});

export {
  router
};

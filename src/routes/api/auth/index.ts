'use strict';

import * as express from 'express';
import * as passport from 'passport';
import {celebrate, errors} from 'celebrate';

import {schema as signUpSchema, handler as signUpHandler} from './signup';
import {schema as loginSchema, handler as loginHandler} from './login';
import {handler as authHandler} from './auth';
import {handler as logoutHandler} from './logout';

const router = express.Router({mergeParams: true});
// TODO: create test
router.post('/signup',
  celebrate(signUpSchema),
  passport.authenticate('local-signup'),
  signUpHandler,
);
// TODO: create test
router.post('/login',
  celebrate(loginSchema),
  passport.authenticate('local-login'),
  loginHandler,
);
// TODO: create test
router.post('/logout',
  logoutHandler,
);
// TODO: create test
router.get('/',
  authHandler,
);

router.use(errors()); // TODO: override this with custom errors

export {
  router,
};

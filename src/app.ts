'use strict';

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as redisConnect from 'connect-redis';
import * as helmet from 'helmet';

import {config} from './config/database';
import { init as passportConfig  } from './config/passport';
import { router } from './routes';

passportConfig(passport);

const app = express();
const RedisStore = redisConnect(session);
mongoose.connect(config.mongoDB.url, {useNewUrlParser: true});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  store: new RedisStore({
    url: config.redisStore.url,
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

export {
  app,
};

'use strict';

import * as winston from 'winston';

const transports = [];

if (process.env.NODE_ENV !== 'test') {
  transports.push(new (winston.transports.Console)());
}

const logger = winston.createLogger({transports});

export { logger };

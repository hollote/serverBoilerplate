'use strict';
import * as winston from 'winston';

// TODO: check for Singleton
const logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)(),
  ],
});

export { logger };

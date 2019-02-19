#!/usr/bin/env node
"use strict";

const path = require('path');

(global as any).PROJECT_ROOT = path.resolve(__dirname, '../');

import * as cluster from 'cluster';
import * as os from 'os';
import { app } from './app/app';
import { normalizePort } from './app/utils/common';
import { logger } from './app/utils/logger';
const launchServer = (port) => app.listen(port, () => logger.info(`App listening on port ${app.get('port')}`));

app.set('port', normalizePort(process.env.PORT || '3000'));
app.set('env', process.env.NODE_ENV || 'development');

if (app.get('env') !== 'production') {
  launchServer(app.get('port'));
} else if (cluster.isMaster) {
  logger.info(`Master is running (processId: ${process.pid})`);

  let cpuCount = process.env.CLUSTER || os.cpus().length;
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
    logger.info(`Forking process number ${i}...`);
  }
} else {
  launchServer(app.get('port'));
  logger.info(`Worker started (processId: ${process.pid})`);
}

cluster.on('exit', function (worker) {
  logger.info('Worker %d died :(', worker.id);
  cluster.fork();
});

"use strict";

import * as cluster from 'cluster';
import * as os from 'os';
import {app as App} from './app';
import {normalizePort} from './utils/common';
import {logger} from './utils/logger';

const launchServer = (port: string) => App.listen(port, () => logger.info(`App listening on port ${App.get('port')}`));

App.set('port', normalizePort(process.env.PORT || '3000'));
App.set('env', process.env.NODE_ENV || 'development');

if (App.get('env') !== 'production') {
  launchServer(App.get('port'));
} else if (cluster.isMaster) {
  logger.info(`Master is running (processId: ${process.pid})`);

  let cpuCount = process.env.CLUSTER || os.cpus().length;
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
    logger.info(`Forking process number ${i}...`);
  }
} else {
  launchServer(App.get('port'));
  logger.info(`Worker started (processId: ${process.pid})`);
}

cluster.on('exit', function (worker) {
  logger.info('Worker %d died :(', worker.id);
  cluster.fork();
});

export {
  App
}

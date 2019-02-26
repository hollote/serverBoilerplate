'use strict';

import * as cluster from 'cluster';
import * as os from 'os';

import {app} from './app';
import {normalizePort} from './utils/common';
import {logger} from './utils/logger';

const launchServer = (port: string) => app.listen(port, () => logger.info(`App listening on port ${app.get('port')}`));

app.set('port', normalizePort(process.env.PORT || '3000'));
app.set('env', process.env.NODE_ENV || 'development');

if (app.get('env') !== 'production') {
  launchServer(app.get('port'));
} else if (cluster.isMaster) {
  logger.info(`Master is running (processId: ${process.pid})`);

  const cpuCount = process.env.CLUSTER || os.cpus().length;
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
    logger.info(`Forking process number ${i}...`);
  }
} else {
  launchServer(app.get('port'));
  logger.info(`Worker started (processId: ${process.pid})`);
}

cluster.on('exit', (worker) => {
  logger.info('Worker %d died :(', worker.id);
  cluster.fork();
});

export {
  app,
};

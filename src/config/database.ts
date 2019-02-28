'use strict';

const config = {
  redisStore: {
    url: process.env.REDIS_STORE_URI || '//localhost:6379',
    secret: process.env.REDIS_STORE_SECRET || 'secret',
  },
  mongoDB: {
    url: process.env.MONGO_STORE_URI || 'mongodb://localhost:27017/baseNodeJs',
  },
};

export {
  config,
};

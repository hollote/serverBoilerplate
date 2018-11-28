# Server boilerplate

### Environment:
- Server
    - Express
    - Mongoose
    - Passport
- DB
    - Redis (for sessions)
    - Mongo

TODO:
1. ~~Change upm to yarn~~
2. ~~Configure debug (nodemon)~~
3. ~~Add unit test (possible mocha + chai + sinon)~~
4. ~~Add documentation (jsDoc)~~
5. ~~unit tests coverage~~
6. ~~js hint validation~~
7. Pre commit hook -- tests, jshint
8. ~~Launch as a cluster in production mode~~
9. Clean dependencies
10. Add Logs (use npm module, see to use cassandra (or other db) as bd storage for logs(as strategy))
11. Passport + passport-local, save user session in Redis (as example https://medium.com/devschacht/node-hero-chapter-8-27b74c33a5ce)
12. RBAC (later)
13. launch all via docker (need to add health check and wait for containers start)


Later:
1. Integrate jsDoc with GitHubPages (as example https://medium.com/@kevinast/integrate-gitbook-jsdoc-974be8df6fb3)


All main modules have to be independent and easy to replace


How to run:

1. yarn
2. run redis & mongo in docker containers:
  https://hub.docker.com/_/redis/

  docker pull redis
  docker run -p 127.0.0.1:6379:6379 --name some-redis -d redis

  https://hub.docker.com/_/mongo/

  docker pull mongo
  docker run -p 127.0.0.1:27017:27017 --name some-mongo -d mongo

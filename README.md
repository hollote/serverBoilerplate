# Server boilerplate

### Environment:
- Server
    - Express
    - Mongoose
    - Passport
- DB
    - Redis (for sessions)
    - Mongo

### Architecture

    ├─client               # frontend folder
    │  ├─src               # frontend src
    │  │  ├─api
    │  │  ├─router
    │  │  ├─styles
    │  │  ├─components
    │  │  ├─store          # state management
    │  │  │  └─modules
    │  │  └─view           # app pages
    │  │     └─auth
    │  └─static            # static folder
    |
    └─server               # server folder
       └─src               # server src
          ├─api            # server api list
          │  ├─auth        # completely token-based authentication
          │  ├─thing
          │  └─user
          ├─config         # server configurations
          │  ├─index       # default server port, mongo uri, etc settings
          │  ├─security    # security settins
          │  └─seed        # populate database with sample data on server start
          ├─entry.js       # entry file for environment setup
          ├─main.js        # main file after entry
          └─routes.js      # router

### Run through Docker
```bash
    instructions will be here
```


### Setup Locally:
- Steps:
The server and client are completely seperated in this project, so go to each client and server folder and run:

```bash
    instructions will be here
```

- Others:
```bash
npm run build      # Running production mode
npm run eslint     # Check your coding style
npm run eslint-fix # Use auto ESLint fix
```


TODO:
7. Pre commit hook -- tests, jshint
9. Clean dependencies
10. Add Logs (use npm module, see to use cassandra (or other db) as bd storage for logs(as strategy))
11. Passport + passport-local, save user session in Redis (as example https://medium.com/devschacht/node-hero-chapter-8-27b74c33a5ce)
12. RBAC (later)
13. launch all via docker (need to add health check and wait for containers start)

How to run:

1. yarn
2. run redis & mongo in docker containers:
  https://hub.docker.com/_/redis/

  docker pull redis
  docker run -p 127.0.0.1:6379:6379 --name some-redis -d redis

  https://hub.docker.com/_/mongo/

  docker pull mongo
  docker run -p 127.0.0.1:27017:27017 --name some-mongo -d mongo

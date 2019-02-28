# Server boilerplate
Server boilerplate API

### Environment:
- Server
    - Express
    - Mongoose
    - Passport
- DB
    - Redis (for sessions)
    - Mongo

### Architecture

```text
   ├─src
   │  ├─config         # configs folder
   │  ├─interfaces     # interfaces
   │  ├─middleware     # middleware for express
   │  ├─models         # models
   │  ├─routes         # routes      
   │  └─utils          # utils
   ├─bin               # launch application 
   ├─test              # test folder
   └─scripts           # scripts folder
```

#### How to run locally:

Install yarn (https://yarnpkg.com/lang/en/docs/install/)
```bash
    yarn install
    docker-compose -f ./docker-compose.dev-db.yml up -d  # run mongo, redis in docker
    yarn run debug # launch server with chrome debug
```
When commit, need to up test db `docker-compose -f ./docker-compose.test.yml up -d`
#### How to run tests locally:

```bash
    docker-compose -f ./docker-compose.test.yml up -d
    yarn run test
```

#### To see test coverage
```bash
    docker-compose -f ./docker-compose.test.yml up -d
    yarn run coverage
```
After run `yarn run coverage` you can also see /reports/coverage/index.html

#### How to run in docker:
1. sh docker.sh prod - wip
2. sh docker.sh dev - wip

### Roadmap
- add tests for endpoints
- create API documentation (swagger UI)
- create correct setup for docker dev, prod
- switch from cookies to JWT tokens
- add RBAC

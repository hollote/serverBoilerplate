# Server boilerplate
### Badges will be here https://shields.io/#/
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

    └─server               # server folder
       ├─app
       │  ├─auth
       │  │  └─strategies  # strategies for auth
       │  ├─controllers    # routes
       │  │  └─api         # api
       │  ├─models         # models
       │  ├─utils          # utils
       │  └─views          # will be removed
       ├─bin               # launch application 
       ├─config            # configs folder
       └─test              # test folder

### Install
install yarn ( https://yarnpkg.com/lang/en/docs/install/ )
#### Setup using Docker:
- install Docker
--dev
```bash
npm run create_image_dev
npm run docker_dev
```

--prod
```bash
npm run create_image_prod
npm run docker_prod
```

#### Setup Locally:

```bash
    instructions will be here
```

#### How to run:
1. sh docker.sh prod
2. sh docker.sh dev
Add delay to launch node app (delay or healthcheck)

### Roadmap
- add tests
- setup linters
- setup hooks
- transform to typescript
- create API documentation
- add more strategies to login
- add linking of accounts
- add RBAC
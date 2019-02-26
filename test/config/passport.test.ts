import {expect} from 'chai';
import * as Chance from 'chance';
import * as mocks from 'node-mocks-http';

import {IUserCreateAttr, userCreate, User, IUserModel} from '../../src/models/user';
import {deserializeUser, localLoginStrategy, localSignupStrategy, serializeUser} from '../../src/config/passport';

let userAttr: IUserCreateAttr;
const chance = new Chance();
// TODO: move to separate test helper file
const userData = () => {
  return {
    email: chance.email(),
    username: chance.word({syllables: 3}),
    password: chance.word({syllables: 3}),
  };
};

describe('Passport configuration', () => {
  beforeEach((done) => {
    userAttr = userData();
    // clear all db data
    User.deleteMany({}, done);
  });

  describe('serialize user', () => {
    it('create userId from user model', (done) => {
      userCreate(userAttr).then((newUser) => {
        serializeUser(newUser, (err, userId) => {
          expect(err).to.be.null;
          expect(userId).to.be.a('string');
          done();
        });
      }, (err: any) => {
        done(new Error(err));
      });
    });
  });

  describe('deserialize user', () => {
    it('get user from userId if user exists', (done) => {
      userCreate(userAttr).then((newUser) => {
        deserializeUser(newUser.id, (err, user) => {
          expect(err).to.be.null;
          expect(user).to.have.property('id');
          expect(user).to.have.nested.property('auth.local.email');
          expect(user).to.have.nested.property('auth.local.username');
          expect(user).to.have.nested.property('auth.local.password');
          done();
        });
      }, (err: any) => {
        done(new Error(err));
      });
    });
    it('get error if user does not exists', (done) => {
      deserializeUser(chance.string({length: 24}), (err, user) => {
        expect(err).not.to.be.null;
        expect(user).to.be.undefined;
        done();
      });
    });
  });

  describe('signup strategy', () => {
    it('create new user without errors', (done) => {
      const req = mocks.createRequest({
        body: userAttr,
      });
      localSignupStrategy(req, userAttr.email, userAttr.password, (err: any, user: IUserModel, desc: { message: string }) => {
        expect(err).to.be.null;
        expect(user).to.have.property('id');
        expect(user).to.have.nested.property('auth.local.email');
        expect(user).to.have.nested.property('auth.local.username');
        expect(user).to.have.nested.property('auth.local.password');
        done();
      });
    });
    it('create user with existed data return error', (done) => {
      userCreate(userAttr).then((newUser) => {
        const req = mocks.createRequest({
          body: userAttr,
        });
        localSignupStrategy(req, userAttr.email, userAttr.password, (err: any, user: IUserModel, desc: { message: string }) => {
          expect(err).to.be.null;
          expect(user).to.be.false;
          expect(desc).to.have.property('message');
          done();
        });
      }, (err: any) => {
        done(new Error(err));
      });
    });
  });

  describe('signin strategy', () => {
    it('login with existed user and correct credentials', (done) => {
      userCreate(userAttr).then(() => {
        localLoginStrategy(userAttr.email, userAttr.password, (err: any, user: IUserModel, desc: { message: string }) => {
          // console.log(err);
          // console.log(user);
          // console.log(desc);
          expect(err).to.be.null;
          expect(user).to.have.property('id');
          expect(user).to.have.nested.property('auth.local.email');
          expect(user).to.have.nested.property('auth.local.username');
          expect(user).to.have.nested.property('auth.local.password');
          done();
        });
      }, (err: any) => {
        done(new Error(err));
      });
    });
    it('login with not existed user', (done) => {
      localLoginStrategy(userAttr.email, userAttr.password, (err: any, user: IUserModel, desc: { message: string }) => {
        expect(err).to.be.null;
        expect(user).to.be.false;
        expect(desc).to.have.property('message');
        done();
      });
    });
    it('login with existed user and incorrect password', (done) => {
      userCreate(userAttr).then(() => {
        localLoginStrategy(userAttr.email, chance.word({syllables: 3}), (err: any, user: IUserModel, desc: { message: string }) => {
          expect(err).to.be.null;
          expect(user).to.be.false;
          expect(desc).to.have.property('message');
          done();
        });
      }, (err: any) => {
        done(new Error(err));
      });
    });
  });
});

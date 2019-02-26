import {expect} from 'chai';
import * as Chance from 'chance';

import {IUserCreateAttr, userCreate, User, getUserData} from '../../src/models/user';

let userAttr: IUserCreateAttr;
const chance = new Chance();

const userData = () => {
  return {
    email: chance.email(),
    username: chance.word({syllables: 3}),
    password: chance.word({syllables: 3}),
  };
};

describe('User model', () => {

  beforeEach((done) => {
    userAttr = userData();
    // clear all db data
    User.deleteMany({}, done);
  });

  describe('Create User', () => {
    it('should create user in db', (done) => {
      userCreate(userAttr).then((newUser) => {
        expect(newUser.auth.local.email).to.be.equals(userAttr.email);
        expect(newUser.auth.local.username).to.be.equals(userAttr.username);
        expect(newUser.auth.local.password).to.be.a('string');
        expect(newUser.auth.local.password.length).to.be.at.least(1);
        done();
      }, (err: any) => {
        done(new Error(err));
      });
    });
  });

  describe('Get User Data', () => {
    it('should return userData without password', (done) => {
      userCreate(userAttr).then((newUser) => {
        const userData = getUserData(newUser);
        expect(userData).to.have.property('id');
        expect(userData).to.have.nested.property('auth.local.email');
        expect(userData).to.have.nested.property('auth.local.username');
        expect(userData).to.not.have.nested.property('auth.local.password');
        done();
      });
    });
  });

  describe('Validate password that saved in db', () => { // do i need them here?
    it('user password should be valid with correct data', (done) => {
      userCreate(userAttr).then((newUser) => {
        expect(newUser.validatePassword(userAttr.password)).to.be.true;
        done();
      });
    });
    it('user password should be valid with correct data', (done) => {
      userCreate(userAttr).then((newUser) => {
        expect(newUser.validatePassword(chance.word())).to.be.false;
        done();
      });
    });
  });

});

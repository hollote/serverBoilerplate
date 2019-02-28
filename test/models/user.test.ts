import {expect} from 'chai';
import * as Chance from 'chance';

import {IUserCreateAttr, userCreate, User, getUserData, _userCreate} from '../../src/models/user';

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

  beforeEach(() => {
    userAttr = userData();
  });

  describe('Create User', () => {
    it('should create user', (done) => {
      let newUser = _userCreate(userAttr);

      expect(newUser.auth.local.email).to.be.equals(userAttr.email);
      expect(newUser.auth.local.username).to.be.equals(userAttr.username);
      expect(newUser.auth.local.password).to.be.a('string');
      expect(newUser.auth.local.password.length).to.be.at.least(1);
      done();
    });
  });

  describe('Get User Data', () => {
    it('should return userData without password', (done) => {
      let newUser = _userCreate(userAttr);
      const userData = getUserData(newUser);

      expect(userData).to.have.property('id');
      expect(userData).to.have.nested.property('auth.local.email');
      expect(userData).to.have.nested.property('auth.local.username');
      expect(userData).to.not.have.nested.property('auth.local.password');
      done();
    });
  });

});

import {expect} from 'chai';

import {normalizePort, generateHash, validatePassword} from '../../src/utils/common';

const SALT = '$2b$10$grOH05NLRJJAmsJ6HSdFtO';

describe('Utils', () => {
  describe('normalizePort', () => {
    it('normalizePort should return number or false', () => {
      expect(normalizePort('3000')).to.be.equal(3000);
      expect(normalizePort('200')).to.be.equal(200);
      expect(normalizePort('wrong')).to.be.false;
    });
  });

  // do i need this part of tests here ? (tests are present for 3rd party library)
  describe('generate hash password', () => {
    it('generated hashed password should generate correctly', () => {
      expect(generateHash(
        'test123',
        SALT,
      )).to.be.equal('$2b$10$grOH05NLRJJAmsJ6HSdFtOciDOaoXNMsT2RpwE2lixi4hWStf9Raa');
    });
  });

  describe('validatePassword', () => {
    it('correct password should be valid', () => {
      expect(validatePassword(
        'test123',
        '$2b$10$grOH05NLRJJAmsJ6HSdFtOciDOaoXNMsT2RpwE2lixi4hWStf9Raa',
      )).to.be.true;
    });

    it('invalid password should return false', () => {
      expect(validatePassword(
        'test132',
        '$2b$10$grOH05NLRJJAmsJ6HSdFtOciDOaoXNMsT2RpwE2lixi4hWStf9Raa')).to.be.false;
    });
  });
});

import {expect} from 'chai';

import {normalizePort} from '../../src/utils/common';

describe('Utils', () => {
  describe('normalizePort', () => {
    it('should return number or false', () => {
      expect(normalizePort('3000')).to.be.equal(3000);
      expect(normalizePort('-200')).to.be.false;
      expect(normalizePort('wrong')).to.be.false;
    });
  });
});

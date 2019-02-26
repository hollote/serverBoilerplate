import * as mocks from 'node-mocks-http';
import {expect} from 'chai';

import {isAuthenticated} from '../../src/middleware/auth';


describe('Auth middleware', () => {
  describe('request handler creation', () => {

    it('should return a function()', () => {
      expect(isAuthenticated).to.be.a('function');
    });

    it('should accept three arguments', () => {
      expect(isAuthenticated.length).to.equal(3);
    });

    it('we should have no access if user is not authenticated', (done) => {
      const request = mocks.createRequest({});
      const response = mocks.createResponse({});

      request.isAuthenticated = () => false;
      isAuthenticated(request, response, () => {
        done(new Error('should not run'));
      });

      expect(response.statusCode).to.be.equals(401);
      expect(response._getData()).to.be.equals('{"success":false,"error":{"message":"Unauthorized"}}');
      done();
    });

    it('we should have access if user is is authenticated', (done) => {
      const request = mocks.createRequest({});
      const response = mocks.createResponse({});

      request.isAuthenticated = () => true;
      isAuthenticated(request, response, () => {
        done();
      });
    });
  });
});

import * as mocks from 'node-mocks-http';
import {expect} from 'chai';

import {isAuthenticated} from '../../src/middleware/auth';


describe('Auth middleware', () => {
  it('should have no access if user is not authenticated', (done) => {
    const request = mocks.createRequest({});
    const response = mocks.createResponse({});

    request.isAuthenticated = () => false;
    isAuthenticated(request, response, () => {
      done(new Error('should not run'));
    });

    expect(response.statusCode).to.be.equals(401);
    expect(JSON.parse(response._getData())).to.deep.equals({"success":false,"error":{"message":"Unauthorized"}});
    done();
  });

  it('should have access if user is is authenticated', (done) => {
    const request = mocks.createRequest({});
    const response = mocks.createResponse({});

    request.isAuthenticated = () => true;
    isAuthenticated(request, response, () => {
      done();
    });
  });
});

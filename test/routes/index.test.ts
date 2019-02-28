import * as request from 'supertest';
import {expect} from 'chai';

import {app} from '../../src';

describe('GET /', () => {
  it('should respond with error', (done) => {
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });
});

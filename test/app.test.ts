import * as request from 'supertest';
import {expect} from 'chai';

import {app} from '../src/app';

describe("API Server", function () {

  describe('GET /', function () {
    it('respond with error', function (done) {
      request(app)
        .get("/")
        .expect(404)
        .end(done);
    });
  });

  // describe('GET /users', function () {
  //   it('respond without error', function (done) {
  //     request(app)
  //       .get("/users")
  //       .expect(200)
  //       .expect("respond with a resource")
  //       .end(done);
  //   });
  // });
  //
  // describe('GET /users', function () {
  //   it("should return 404", function (done) {
  //     request(app)
  //       .get("/random")
  //       .expect(404)
  //       .end(function (err, res) {
  //         expect(res.status).to.be.equal(404);
  //         done();
  //       });
  //   });
  // });

});

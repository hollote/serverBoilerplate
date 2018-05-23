const request = require('supertest');
const app = require('../app');

describe("API Server", function () {

    describe('GET /users', function () {
        it('respond without error', function (done) {
            request(app)
                .get("/users")
                .expect(200)
                .expect("respond with a resource")
                .end(done);
        });
    });

});
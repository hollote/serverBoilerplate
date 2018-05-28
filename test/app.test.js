const request = require('supertest');
const expect = require('chai').expect;

const app = require('../app/app');

describe("API Server", function () {

    describe('GET /', function () {
        it('respond without error', function (done) {
            request(app)
                .get("/")
                .expect(200)
                .end(done);
        });
    });

    describe('GET /users', function () {
        it('respond without error', function (done) {
            request(app)
                .get("/users")
                .expect(200)
                .expect("respond with a resource")
                .end(done);
        });
    });

    describe('GET /users', function () {
        it("should return 404", function (done) {
            request(app)
                .get("/random")
                .expect(404)
                .end(function (err, res) {
                    expect(res.status).to.be.equal(404);
                    done();
                });
        });
    });

});
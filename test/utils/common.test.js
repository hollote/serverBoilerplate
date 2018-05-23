const expect = require('chai').expect;

const util = require('../../utils/common');

describe('Utils', function () {
    it('normalizePort should work correctly', function () {
        expect(util.normalizePort('3000')).to.be.equal(3000);
        expect(util.normalizePort(NaN)).to.be.NaN;
        expect(util.normalizePort(200)).to.be.equal(200);
        expect(util.normalizePort(-200)).to.be.false;
    })
});
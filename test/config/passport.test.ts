import {expect} from 'chai';
import * as Chance from 'chance';
import * as mocks from "node-mocks-http";
import * as sinon from 'sinon';
import {Request} from "express";

import {IUserCreateAttr, IUserModel, _userCreate} from '../../src/models/user';
import * as userModel from '../../src/models/user';
import {localLoginCallback, localSignupCallback} from '../../src/config/passport';

let userAttr: IUserCreateAttr;
const chance = new Chance();
// TODO: move to separate test helper file
const userData = () => {
  return {
    email: chance.email(),
    username: chance.word({syllables: 3}),
    password: chance.word({syllables: 3}),
  };
};

describe('Passport configuration', () => {
  beforeEach(() => {
    userAttr = userData();
  });

  describe('Local Signup Callback', () => {
    it('should return error in case of error', () => {
      let err = new Error('error');
      let request = mocks.createRequest({});
      let cb = (err: any, user: IUserModel | null, req: Request, email: string, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);

      localSignupCallback(err, null, request, userAttr.email, 'password', spy);

      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equals(err);
    });

    it('should return custom error if user exists', () => {
      let newUser = _userCreate(userAttr);
      let request = mocks.createRequest({});
      let cb = (err: any, user: IUserModel | null, req: Request, email: string, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);

      localSignupCallback(null, newUser, request, userAttr.email, 'password', spy);

      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equals(null);
      expect(spy.getCall(0).args[1]).to.be.equals(false);
      expect(spy.getCall(0).args[2]).to.deep.equals({message: 'user already created'});
    });

    it('should return user if user is not exists yet', (done) => {
      let newUser = _userCreate(userAttr);
      let request = mocks.createRequest({});
      let cb = (err: any, user: IUserModel | null, req: Request, email: string, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);
      let stub = sinon.stub(userModel, "userCreate");
      stub.returns(Promise.resolve(newUser));

      localSignupCallback(null, null, request, userAttr.email, 'password', spy).then(
        () => {
          expect(stub.calledOnce).to.be.true;
          expect(spy.getCall(0).args[0]).to.be.equals(null);
          expect(spy.getCall(0).args[1]).to.deep.equals(newUser);
          stub.restore();
          done();
        });
    });

    it('should return error if user can\'t be created', (done) => {
      let request = mocks.createRequest({});
      let cb = (err: any, user: IUserModel | null, req: Request, email: string, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);
      let stub = sinon.stub(userModel, "userCreate");
      stub.returns(Promise.reject(new Error('error')));

      localSignupCallback(null, null, request, userAttr.email, 'password', spy)
        .then(() => {
          done(new Error('error'));
        })
        .catch(() => {
          expect(spy.calledOnce).to.be.false;
          stub.restore();
          done();
        });
    })
  });

  describe('Local Login Callback', () => {
    it('should return error in case of error', () => {
      let err = new Error('error');
      let cb = (err: any, user: IUserModel | null, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);

      localLoginCallback(err, null, 'password', spy);

      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equals(err);
    });

    it('should return custom error if no user provided', () => {
      let cb = (err: any, user: IUserModel | null, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);

      localLoginCallback(null, null, 'password', spy);

      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equals(null);
      expect(spy.getCall(0).args[1]).to.be.equals(false);
      expect(spy.getCall(0).args[2]).to.deep.equals({message: 'wrong email or password'});
    });

    it('should return custom error if user have wrong', () => {
      let newUser = _userCreate(userAttr);
      let cb = (err: any, user: IUserModel | null, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);
      let stub = sinon.stub(newUser, "validatePassword");
      stub.withArgs('password').returns(false);

      localLoginCallback(null, newUser, 'password', spy);

      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equals(null);
      expect(spy.getCall(0).args[1]).to.be.equals(false);
      expect(spy.getCall(0).args[2]).to.deep.equals({message: 'wrong email or password'});
      stub.restore();
    });

    it('should return user if user provided', () => {
      let newUser = _userCreate(userAttr);
      let cb = (err: any, user: IUserModel | null, desc: { message: string }) => {
      };
      let spy = sinon.spy(cb);
      let stub = sinon.stub(newUser, "validatePassword");
      stub.withArgs('password').returns(true);

      localLoginCallback(null, newUser, 'password', spy);

      expect(spy.calledOnce).to.be.true;
      expect(spy.getCall(0).args[0]).to.be.equals(null);
      expect(spy.getCall(0).args[1]).to.deep.equals(newUser);
      stub.restore();
    });
  });
});

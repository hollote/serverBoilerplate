import {expect} from 'chai';
import * as Chance from 'chance';

import {IUserCreateAttr, User} from '../../../src/models/user';

let userAttr: IUserCreateAttr;
const chance = new Chance();

const userData = () => {
  return {
    email: chance.email(),
    username: chance.word({syllables: 3}),
    password: chance.word({syllables: 3}),
  };
};


describe('/api route', () => {
  beforeEach((done) => {
    userAttr = userData();
    // clear all db data
    User.deleteMany({}, done);
  });
});

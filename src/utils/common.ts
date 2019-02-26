'use strict';

import * as bcrypt from 'bcrypt';

export const SALT_ROUNDS = 10;

export const normalizePort = (val: string): string | number | boolean => {
  const port = parseInt(val, 10);

  if (port >= 0) {
    return port;
  }

  return false;
};

export const generateHash = (password: string, salt = bcrypt.genSaltSync(SALT_ROUNDS)) => {
  return bcrypt.hashSync(password, salt);
};

export const validatePassword = (password: string, existingHash: string): boolean => {
  return bcrypt.compareSync(password, existingHash);
};


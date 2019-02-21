"use strict";

/**
 * Normalize a port into a number, string, or false.
 * @param val
 * @returns {*}
 */
function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

export {normalizePort};

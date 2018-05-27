"use strict";
/**
 * Normalize a port into a number, string, or false.
 * @param val
 * @returns {*}
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = {normalizePort};

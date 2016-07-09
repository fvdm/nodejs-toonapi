var app;


/**
 * Get agreements list
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function list (callback) {
  var options = {
    method: 'GET',
    path: '/toon/api/v1/agreements'
  };

  app.httpRequest (options, callback);
}


/**
 * Set up lib
 *
 * @param parent {object} - Main module utils
 * @returns {object} - Interface methods
 */

function setup (parent) {
  app = parent;

  return {
    list
  };
}

module.exports = setup;

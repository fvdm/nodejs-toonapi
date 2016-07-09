var app;


/**
 * Get Toon status
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function status (callback) {
  var options = {
    method: 'GET',
    path: '/toon/api/v1/status'
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
    status
  };
}

module.exports = setup;

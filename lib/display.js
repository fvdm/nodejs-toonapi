var app;


/**
 * Get Toon status
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function displayStatus (callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/status'
  };

  app.httpRequest (options, callback);
}


/**
 * Set up lib
 *
 * @param parent {object} - Main module utils
 * @returns {object} - Interface methods
 */

function displaySetup (parent) {
  app = parent;

  return {
    status: displayStatus
  };
}

module.exports = displaySetup;

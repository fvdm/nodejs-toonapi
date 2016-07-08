var app;


/**
 * Get or set agreements
 *
 * @callback callback
 * @param [agreementId] {string} - agreement ID to add to account
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function agreements (agreementId, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/agreements',
    params: {}
  };

  if (typeof agreementId === 'function') {
    callback = agreementId;
    agreementId = null;
  } else {
    options.method = 'POST';
    options.params.agreementId = agreementId;
  }

  app.httpRequest (options, callback);
}


/**
 * Set up lib
 *
 * @param parent {object} - Main module utils
 * @returns {object} - Interface methods
 */

function agreementsSetup (parent) {
  app = parent;

  return agreements;
}

module.exports = agreementsSetup;
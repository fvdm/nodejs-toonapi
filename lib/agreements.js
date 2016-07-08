var app;


/**
 * Get agreements list
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function agreementsList (callback) {
  var options = {
    method: 'GET',
    path: '/toon/api/v1/agreements'
  };

  app.httpRequest (options, callback);
}


/**
 * Update agreements
 *
 * @callback callback
 * @param agreementId {string} - agreement ID to add to account
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function agreementsUpdate (agreementId, callback) {
  var options = {
    method: 'POST',
    path: '/toon/api/v1/agreements',
    params: {
      agreementId
    }
  };

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

  return {
    list: agreementsList,
    update: agreementsUpdate
  };
}

module.exports = agreementsSetup;

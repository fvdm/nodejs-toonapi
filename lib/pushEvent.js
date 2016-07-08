var app;


/**
 * Subscribe a push event request
 *
 * @callback callback
 * @param callbackUri {string} - Callback URL
 * @param applicationId {string} - Application ID
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function pushEventSubscribe (applicationId, callbackUrl, callback) {
  var options = {
    method: 'POST',
    path: '/api/toon/v1/pushEvent',
    json: {
      applicationId: applicationId,
      callbackUrl: callbackUrl
    }
  };

  app.httpRequest (options, callback);
}


/**
 * Unsubscribe a push event request
 *
 * @callback callback
 * @param applicationId {string} - Application ID
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function pushEventUnsubscribe (applicationId, callback) {
  var options = {
    method: 'DELETE',
    path: '/api/toon/v1/pushEvent',
    params: {
      applicationId: applicationId
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

function pushEventSetup (parent) {
  app = parent;

  return {
    subscribe: pushEventSubscribe,
    unsubscribe: pushEventUnsubscribe
  };
}

module.exports = pushEventSetup;

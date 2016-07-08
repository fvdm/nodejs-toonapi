var httpreq = require ('httpreq');

var app = {
  root: __dirname,
  config: {
    accessToken: null,
    clientId: null,
    clientSecret: null,
    endpoint: 'https://api.toonapi.com',
    redirectUrl: null,
    timeout: 5000
  }
};


/**
 * Callback an error
 *
 * @callback callback
 * @param message {string} - Error.message
 * @param err {Error, mixed} - Error.error
 * @param code {number} - Error.statusCode
 * @param callback {function} - `function (err) {}`
 * @returns {void}
 */

app.doError = function doError (message, err, code, callback) {
  var error = new Error (message);

  error.error = err;
  error.statusCode = code;
  callback (error);
};


/**
 * Process HTTP response for callback
 *
 * @callback callback
 * @param err {Error, null} - httpreq error
 * @param res {object} - httpreq response details
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function httpResponse (err, res, callback) {
  var data = res && res.body || '';

  if (err) {
    return callback (err);
  }

  // Parse response
  try {
    data = JSON.parse (data);
  } catch (e) {
    e.body = data;
    return app.doError ('invalid response', e, res.statusCode, callback);
  }

  // Catch JSON API error
  if (res.statusCode >= 300) {
    return app.doError ('API error', data, res.statusCode, callback);
  }

  return callback (null, data);
}


/**
  * Send HTTP request to the remote API
  *
  * @callback callback
  * @param props {object} - Request details
  * @param props.path {string} - Request path after `endpoint`
  * @param [props.method = GET] {string} - GET, POST, etc
  * @param [props.params] {object} - GET or POST fields to send
  * @param callback {function} - `function (err, data) {}`
  * @returns {void}
  */

app.httpRequest = function httpRequest (props, callback) {
  var options = {
    method: props.method || 'GET',
    url: app.config.endpoint + props.path,
    parameters: props.params || null,
    json: props.json || null,
    timeout: props.timeout || app.config.timeout,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'node/toonapi (https://github.com/fvdm/nodejs-toonapi)'
    }
  };

  if (app.config.accessToken) {
    options.headers.Authorization = 'Bearer ' + app.config.accessToken;
  }

  function doResponse (err, res) {
    httpResponse (err, res, callback);
  }

  httpreq.doRequest (options, doResponse);
};


/**
 * Module config and interface
 *
 * @param set {object} - Configuration settings
 * @param set.clientId {string} - API client_id
 * @param set.clientSecret {string} - API client_secret
 * @param set.redirectUrl {string} - API redirect URL
 * @returns {object} - Interface methods
 */

function setup (set) {
  app.config.accessToken = set.accessToken || null;
  app.config.clientId = set.clientId || null;
  app.config.clientSecret = set.clientSecret || null;
  app.config.endpoint = set.endpoint || app.config.endpoint;
  app.config.redirectUri = set.redirectUri || null;
  app.config.timeout = set.timeout || app.config.timeout;

  return {
    oauth: require (app.root + '/lib/oauth.js') (app),
    agreements: require (app.root + '/lib/agreements.js') (app),
    consumption: require (app.root + '/lib/consumption.js') (app),
    devices: require (app.root + '/lib/devices.js') (app),
    display: require (app.root + '/lib/display.js') (app),
    pushEvent: require (app.root + '/lib/pushEvent.js') (app),
    temperature: require (app.root + '/lib/temperature.js') (app)
  };
}

module.exports = setup;

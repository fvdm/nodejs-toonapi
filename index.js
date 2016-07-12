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

// Load methods
app.oauth = require (app.root + '/lib/oauth.js') (app);
app.agreements = require (app.root + '/lib/agreements.js') (app);
app.consumption = require (app.root + '/lib/consumption.js') (app);
app.devices = require (app.root + '/lib/devices.js') (app);
app.display = require (app.root + '/lib/display.js') (app);
app.pushEvent = require (app.root + '/lib/pushEvent.js') (app);
app.temperature = require (app.root + '/lib/temperature.js') (app);


/**
 * Callback an error
 *
 * @callback callback
 * @param msg {string} - Error.message
 * @param err {Error, mixed} - Error.error
 * @param code {number} - Error.statusCode
 * @param callback {function} - `function (err) {}`
 * @returns {void}
 */

app.doError = function doError (msg, err, res, callback) {
  var error = new Error (msg);
  var body = res && res.body || '';

  function doCallback () {
    callback && callback (error);
  }

  // HTTP response error
  if (msg === 'invalid response' || msg === 'API error') {
    error.statusCode = res.statusCode;
    error.headers = res.headers;

    // API error - json
    if (!(err instanceof Error)) {
      error.error = err;
      doCallback ();
      return;
    }

    // API error - xml <fault>
    if (body.match (/^<fault/)) {
      error.message = 'API error';

      body.replace (/<(amt:|ams:)?fault [^>]+>(<\1code>([^<]+)<\/\1code>)?(<\1message>([^<]+)<\/\1message>)?(<\1description>([^<]+)<\/\1description>)?<\/\1fault>$/, function (str0, str1, str2, code, str4, message, str6, description) {
        error.error = {
          code,
          message,
          description
        };
      });

      doCallback ();
      return;
    }

    error.body = body;
    doCallback ();
    return;
  }

  // Normal error
  error.error = err;
  doCallback ();
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
  if (!data && res.statusCode === 200) {
    data = '{ "success": true }';
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    e.body = data;
    return app.doError ('invalid response', e, res, callback);
  }

  // Catch JSON API error
  if (res.statusCode >= 300) {
    return app.doError ('API error', data, res, callback);
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
    parameters: props.params,
    json: props.json,
    timeout: props.timeout || app.config.timeout,
    headers: props.headers || {}
  };

  if (!app.config.endpoint || !app.config.endpoint.match (/^https?:\/\/[\w\d\.]+/)) {
    return app.doError ('endpoint missing', null, null, callback);
  }

  // we need but don't have an accessToken
  if (!props.noauth && !app.config.accessToken) {
    app.oauth.getTokenFromPassword (function (err, token) {
      if (err) {
        return callback (err);
      }

      app.config.accessToken = token.access_token;
      app.config.refreshToken = token.refresh_token;

      app.httpRequest (props, callback);
    });

    return;
  }

  // we need and have an accessToken
  if (!props.noauth && app.config.accessToken) {
    options.headers.Authorization = 'Bearer ' + app.config.accessToken;
  }

  function doResponse (err, res) {
    if (props.path === '/revoke') {
      if (res.statusCode === 200) {
        callback (null, {
          revokedaccesstoken: res.headers.revokedaccesstoken,
          revokedrefreshtoken: res.headers.revokedrefreshtoken
        });

        return;
      }
    }

    httpResponse (err, res, callback);
  }

  options.headers.Accept = 'application/json';
  options.headers ['User-Agent'] = 'node/toonapi (https://github.com/fvdm/nodejs-toonapi)';
  httpreq.doRequest (options, doResponse);

  return null;
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
  if (set && set instanceof Object) {
    app.config.accessToken = set.accessToken;
    app.config.clientId = set.clientId;
    app.config.clientSecret = set.clientSecret;
    app.config.endpoint = set.endpoint || app.config.endpoint;
    app.config.password = set.password;
    app.config.redirectUri = set.redirectUri;
    app.config.refreshToken = set.refreshToken;
    app.config.timeout = set.timeout || app.config.timeout;
    app.config.username = set.username;
  }

  return app;
}

module.exports = setup;

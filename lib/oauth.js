var app;


/**
 * Get an access token from username and password
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function getTokenFromPassword (callback) {
  var options = {
    method: 'POST',
    path: '/token',
    params: {
      grant_type: 'password',
      client_id: app.config.clientId,
      client_secret: app.config.clientSecret,
      username: app.config.username,
      password: app.config.password
    }
  };

  app.httpRequest (options, callback);
}


/**
 * Refresh access token
 *
 * @callback callback
 * @param [token = config.token] - Access token to refresh
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function refreshToken (token, callback) {
  var options = {
    method: 'POST',
    path: '/token',
    params: {
      client_id: app.config.clientId,
      client_secret: app.config.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: token
    }
  };

  if (typeof token === 'function') {
    callback = token;
    options.params.refresh_token = app.config.accessToken;
  }

  app.httpRequest (options, callback);
}


/**
 * Revoke access token
 *
 * @callback callback
 * @param [token = config.token] - Access token to revoke
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function revokeToken (token, callback) {
  var options = {
    method: 'POST',
    path: '/revoke',
    params: {
      token: token,
      client_id: app.config.clientId,
      client_secret: app.config.clientSecret
    }
  };

  if (typeof token === 'function') {
    callback = token;
    options.params.token = app.config.accessToken;
  }

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
    getTokenFromPassword,
    refreshToken,
    revokeToken
  };
}

module.exports = setup;

var app;


/**
 * Get an access token from a code
 *
 * @callback callback
 * @param code {string} - The code to send
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function oauthGetTokenFromCode (code, callback) {
  var options = {
    method: 'POST',
    path: '/token',
    params: {
      client_id: app.config.clientId,
      client_secret: app.config.clientSecret,
      grant_type: 'authorization_code',
      code: code
    }
  };

  app.httpRequest (options, callback);
}


/**
 * Get access token
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function oauthGetToken (callback) {
  var options = {
    method: 'GET',
    path: '/authorize',
    params: {
      response_type: 'code',
      client_id: app.config.clientId,
      redirect_uri: app.config.redirectUri
    }
  };

  // Normal authorization
  if (app.config.clientSecret) {
    options.params.client_secret = app.config.clientSecret;
    app.httpRequest (options, callback);

    return;
  }

  // Implicit authorization
  options.params.response_type = 'token';
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

function oauthRefreshToken (token, callback) {
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

function oauthRevokeToken (token, callback) {
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

function oauthSetup (parent) {
  app = parent;

  return {
    getTokenFromCode: oauthGetTokenFromCode,
    getToken: oauthGetToken,
    refreshToken: oauthRefreshToken,
    revokeToken: oauthRevokeToken
  };
}

module.exports = oauthSetup;

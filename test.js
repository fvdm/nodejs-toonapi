var dotest = require ('dotest');
var cache = {};

var config = {
  accessToken: process.env.ACCESSTOKEN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  password: process.env.CLIENT_PASSWORD,
  redirectUri: process.env.REDIRECT_URI,
  refreshToken: process.env.REFRESHTOKEN,
  timeout: process.env.TIMEOUT,
  username: process.env.CLIENT_USERNAME
};

var app = require ('./');
var toonapi = app (config);


dotest.add ('Module interface', function (test) {
  var agreements = toonapi && toonapi.agreements;

  var consumption = toonapi && toonapi.consumption;
  var electricity = consumption && consumption.electricity;
  var districtheat = consumption && consumption.districtheat;
  var gas = consumption && consumption.gas;

  var devices = toonapi && toonapi.devices;
  var device = devices && devices.device;

  var display = toonapi && toonapi.display;
  var oauth = toonapi && toonapi.oauth;
  var pushEvent = toonapi && toonapi.pushEvent;

  var temperature = toonapi && toonapi.temperature;
  var states = temperature && temperature.states;

  test ()
    .isFunction ('fail', 'exports', app)
    .isObject ('fail', 'interface', toonapi)

    .isObject ('fail', '.agreements', agreements)
    .isFunction ('fail', '.agreements.list', agreements && agreements.list)

    .isObject ('fail', '.consumption', consumption)
    .isObject ('fail', '.consumption.electricity', electricity)
    .isFunction ('fail', '.consumption.electricity.data', electricity && electricity.data)
    .isFunction ('fail', '.consumption.electricity.flows', electricity && electricity.flows)
    .isObject ('fail', '.consumption.districtheat', districtheat)
    .isFunction ('fail', '.consumption.districtheat.data', districtheat && districtheat.data)
    .isObject ('fail', '.consumption.gas', gas)
    .isFunction ('fail', '.consumption.gas.data', gas && gas.data)
    .isFunction ('fail', '.consumption.gas.flows', gas && gas.flows)

    .isObject ('fail', '.devices', devices)
    .isObject ('fail', '.devices.device', device)
    .isFunction ('fail', '.devices.device.get', device && device.get)
    .isFunction ('fail', '.devices.device.update', device && device.update)
    .isFunction ('fail', '.devices.device.data', device && device.data)
    .isFunction ('fail', '.devices.device.flows', device && device.flows)
    .isFunction ('fail', '.devices.list', devices && devices.list)
    .isFunction ('fail', '.devices.update', devices && devices.update)

    .isObject ('fail', '.display', display)
    .isFunction ('fail', '.display.status', display && display.status)

    .isObject ('fail', '.oauth', oauth)
    .isFunction ('fail', '.oauth.getTokenFromPassword', oauth && oauth.getTokenFromPassword)
    .isFunction ('fail', '.oauth.refreshToken', oauth && oauth.refreshToken)
    .isFunction ('fail', '.oauth.revokeToken', oauth && oauth.revokeToken)

    .isObject ('fail', '.pushEvent', pushEvent)
    .isFunction ('fail', '.pushEvent.subscribe', pushEvent && pushEvent.subscribe)
    .isFunction ('fail', '.pushEvent.unsubscribe', pushEvent && pushEvent.unsubscribe)

    .isObject ('fail', '.temperature', temperature)
    .isObject ('fail', '.temperature.states', states)
    .isFunction ('fail', '.temperature.states.list', states && states.list)
    .isFunction ('fail', '.temperature.states.update', states && states.update)
    .done ();
});


dotest.add ('Method agreements.list', function (test) {
  toonapi.agreements.list (function (err, data) {
    var item = data && data[0];

    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', item)
      .isExactly ('fail', 'data[0].city', item && item.city, 'AMSTERDAM')
      .done ();
  });
});


dotest.add ('Method agreements.update', function (test) {
  test ()
    .warn ('Not implemented')
    .done ();
});


dotest.add ('Method display.status', function (test) {
  toonapi.display.status (function (err, data) {
    var thermos = data && data.thermostatInfo;

    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isObject ('fail', 'data.thermostatInfo', thermos)
      .isNumber ('warn', 'data.thermostatInfo.currentTemp', thermos && thermos.currentTemp)
      .done ();
  });
});


dotest.add ('Method devices.list', function (test) {
  toonapi.devices.list (function (err, data) {
    var item = data && data[0];

    cache.devices = data;

    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', item)
      .isNotEmpty ('fail', 'data[0]', item)
      .isString ('fail', 'data[0].uuid', item && item.uuid)
      .done ();
  });
});


dotest.add ('Method devices.device.get', function (test) {
  var item = cache.devices && cache.devices[0];

  toonapi.devices.device.get (item && item.uuid, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.uuid', data && data.uuid, item && item.uuid)
      .done ();
  });
});


dotest.add ('Method temperature.update - without scale', function (test) {
  test ()
    .warn ('Not implemented')
    .done ();
});


dotest.add ('Method oauth.getTokenFromPassword', function (test) {
  toonapi.oauth.getTokenFromPassword (function (err, data) {
    config.accessToken = data && data.access_token;
    config.refreshToken = data && data.refresh_token;
    toonapi = app (config);

    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.token_type', data && data.token_type, 'bearer')
      .done ();
  });
});


dotest.add ('Method oauth.refreshToken', function (test) {
  toonapi.oauth.refreshToken (config.refreshToken, function (err, data) {
    config.accessToken = data && data.access_token;
    config.refreshToken = data && data.refresh_token;

    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.token_type', data && data.token_type, 'bearer')
      .done ();
  });
});


dotest.add ('Method oauth.revokeToken', function (test) {
  toonapi.oauth.revokeToken (config.accessToken, function (err, data) {
    var revRefresh = data && data.revokedrefreshtoken;
    var revAccess = data && data.revokedaccesstoken;

    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.revokedrefreshtoken', revRefresh, config.refreshToken)
      .isExactly ('fail', 'data.revokedaccesstoken', revAccess, config.accessToken)
      .done ();
  });
});


dotest.add ('Method oauth.getTokenFromCode', function (test) {
  test ()
    .warn ('Not implemented')
    .done ();
});


dotest.add ('Method oauth.getTokenImplicit', function (test) {
  test ()
    .warn ('Not implemented')
    .done ();
});


dotest.add ('Error: API error - xml <fault>', function (test) {
  config.endpoint = 'https://api.toonapi.com/api';
  toonapi = app (config);

  toonapi.agreements.list (function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isNumber ('fail', 'err.statusCode', err && err.statusCode)
      .isObject ('fail', 'err.error', err && err.error)
      .isNotEmpty ('fail', 'err.error', err && err.error)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Error: timeout', function (test) {
  config.endpoint = 'https://api.toonapi.com';
  config.timeout = 1;
  toonapi = app (config);

  toonapi.agreements.list (function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.code', err && err.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Error: endpoint missing', function (test) {
  config.endpoint = '-';
  config.timeout = 5000;
  toonapi = app (config);

  toonapi.agreements.list (function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'endpoint missing')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.run ();

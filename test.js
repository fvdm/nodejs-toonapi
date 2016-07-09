var dotest = require ('dotest');

var config = {
  accessToken: process.env.ACCESSTOKEN || null,
  clientId: process.env.CLIENT_ID || null,
  clientSecret: process.env.CLIENT_SECRET || null,
  password: process.env.CLIENT_PASSWORD || null,
  redirectUri: process.env.REDIRECT_URI || null,
  timeout: process.env.TIMEOUT || null,
  username: process.env.CLIENT_USERNAME || null
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
    .isFunction ('fail', '.agreements.update', agreements && agreements.update)

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
    .isFunction ('fail', '.display', display && display.status)

    .isObject ('fail', '.oauth', oauth)
    .isFunction ('fail', '.oauth.getTokenFromCode', oauth && oauth.getTokenFromCode)
    .isFunction ('fail', '.oauth.getTokenFromPassword', oauth && oauth.getTokenFromPassword)
    .isFunction ('fail', '.oauth.getToken', oauth && oauth.getToken)
    .isFunction ('fail', '.oauth.refreshToken', oauth && oauth.refreshToken)
    .isFunction ('fail', '.oauth.revokeToken', oauth && oauth.revokeToken)

    .isObject ('fail', '.pushEvent', pushEvent)
    .isFunction ('fail', '.pushEvent.subscribe', pushEvent && pushEvent.subscribe)
    .isFunction ('fail', '.pushEvent.unsubscribe', pushEvent && pushEvent.unsubscribe)

    .isObject ('fail', '.temperature', temperature)
    .isObject ('fail', '.temperature.states', states)
    .isFunction ('fail', '.temperature.states.list', states && states.list)
    .isFunction ('fail', '.temperature.states.update', states && states.update)
    .isFunction ('fail', '.temperature.update', temperature && temperature.update)
    .done ();
});


dotest.add ('Method oauth.getTokenFromPassword', function (test) {
  toonapi.oauth.getTokenFromPassword (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.token_type', data && data.token_type, 'bearer')
      .done ();
  });
});


dotest.add ('Error: API error - xml <ams:fault>', function (test) {
  toonapi.agreements.update ('-', function (err, data) {
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


dotest.run ();

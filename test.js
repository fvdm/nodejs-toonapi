var dotest = require ('dotest');

var config = {
  timeout: process.env.APP_TIMEOUT
};

var app = require ('./');
var toonapi = app (config);


dotest.add ('Module interface', function (test) {
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
    .isFunction ('fail', '.agreements', toonapi && toonapi.agreements)

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


dotest.add ('Error: API error', function (test) {
  toonapi.agreements (function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isNumber ('fail', 'err.statusCode', err && err.statusCode)
      .isNotEmpty ('fail', 'err.error', err && err.error)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.run ();

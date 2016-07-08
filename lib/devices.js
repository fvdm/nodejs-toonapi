var app;


/**
 * Get device details
 *
 * @callback callback
 * @param deviceId {string} - Device UUID
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function deviceGet (deviceId, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/devices/' + deviceId
  };

  app.httpRequest (options, callback);
}


/**
 * Update device details
 *
 * @callback callback
 * @param deviceId {string} - Device UUID
 * @param obj {object} - Use and alter full object from `deviceGet()`
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function deviceUpdate (deviceId, obj, callback) {
  var options = {
    method: 'PUT',
    path: '/api/toon/v1/devices/' + deviceId,
    json: obj
  };

  app.httpRequest (options, callback);
}


/**
 * Get device data
 *
 * @callback callback
 * @param deviceId {string} - Device UUID
 * @param [params] {object} - Filter data
 * @param [params.fromTime] {number} - Timestamp in ms
 * @param [params.toTime] {number} - Timestamp in ms
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function deviceData (deviceId, params, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1'
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  app.httpRequest (options, callback);
}


/**
 * Get device flows data
 *
 * @callback callback
 * @param deviceId {string} - Device UUID
 * @param [params] {object} - Filter data
 * @param [params.fromTime] {number} - Timestamp in ms
 * @param [params.toTime] {number} - Timestamp in ms
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function deviceFlows (deviceId, params, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1'
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  app.httpRequest (options, callback);
}


/**
 * Get all devices array and their details
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function listAll (callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/devices'
  };

  app.httpRequest (options, callback);
}


/**
 * Update all devices at once
 *
 * @callback callback
 * @param arr {array} - Use and alter full array from `list()`
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function updateAll (arr, callback) {
  var options = {
    method: 'PUT',
    path: '/api/toon/v1/devices',
    json: arr
  };

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
    device: {
      get: deviceGet,
      update: deviceUpdate,
      data: deviceData,
      flows: deviceFlows
    },
    list: listAll,
    update: updateAll
  };
}

module.exports = setup;

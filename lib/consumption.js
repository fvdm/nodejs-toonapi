var app;


/**
 * Get electricity data
 *
 * @callback callback
 * @param [params] {object} - Filter options
 * @param [params.fromTime] {number} - Timestamp in ms
 * @param [params.toTime] {number} - Timestamp in ms
 * @param [params.interval] {string} - Hours, Days, Weeks, Months, Years
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function consumptionElectricityData (params, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/consumption/electricity/data'
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  app.httpRequest (options, callback);
}


/**
 * Get electricity flows data
 *
 * @callback callback
 * @param [params] {object} - Filter options
 * @param [params.fromTime] {number} - Timestamp in ms
 * @param [params.toTime] {number} - Timestamp in ms
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function consumptionElectricityFlows (params, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/consumption/electricity/flows'
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  app.httpRequest (options, callback);
}


/**
 * Get districtheat data
 *
 * @callback callback
 * @param [params] {object} - Filter options
 * @param [params.fromTime] {number} - Timestamp in ms
 * @param [params.toTime] {number} - Timestamp in ms
 * @param [params.interval] {string} - Hours, Days, Weeks, Months, Years
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function consumptionDistrictheatData (params, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/consumption/districtheat/data'
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  app.httpRequest (options, callback);
}


/**
 * Get gas data
 *
 * @callback callback
 * @param [params] {object} - Filter options
 * @param [params.fromTime] {number} - Timestamp in ms
 * @param [params.toTime] {number} - Timestamp in ms
 * @param [params.interval] {string} - Hours, Days, Weeks, Months, Years
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function consumptionGasData (params, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/consumption/gas/data'
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  app.httpRequest (options, callback);
}


/**
 * Get gas flows data
 *
 * @callback callback
 * @param [params] {object} - Filter options
 * @param [params.fromTime] {number} - Timestamp in ms
 * @param [params.toTime] {number} - Timestamp in ms
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function consumptionGasFlows (params, callback) {
  var options = {
    method: 'GET',
    path: '/api/toon/v1/consumption/gas/flows'
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  app.httpRequest (options, callback);
}


/**
 * Set up lib
 *
 * @param parent {object} - Main module utils
 * @returns {object} - Interface methods
 */

function consumptionSetup (parent) {
  app = parent;

  return {
    electricity: {
      data: consumptionElectricityData,
      flows: consumptionElectricityFlows
    },
    districtheat: {
      data: consumptionDistrictheatData
    },
    gas: {
      data: consumptionGasData,
      flows: consumptionGasFlows
    }
  };
}

module.exports = consumptionSetup;

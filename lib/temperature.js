var app;


/**
 * Get temperature states array from Toon
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function statesList (callback) {
  var options = {
    method: 'GET',
    path: '/toon/api/v1/states'
  };

  app.httpRequest (options, callback);
}


/**
 * Change temperature state on Toon
 *
 * @callback callback
 * @param temperatureState {number} - manual (0), program (1)
 * @param state {number, string} - comfort (0), home (1), sleep (2), away (3)
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function statesUpdate (temperatureState, state, callback) {
  var tempStates = {
    manual: 0,
    program: 1
  };

  var states = {
    comfort: 0,
    home: 1,
    sleep: 2,
    away: 3
  };

  var options = {
    method: 'PUT',
    path: '/toon/api/v1/states',
    json: {
      temperatureState: tempStates [temperatureState] || temperatureState,
      state: states [state] || state
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

function setup (parent) {
  app = parent;

  return {
    states: {
      list: statesList,
      update: statesUpdate
    }
  };
}

module.exports = setup;

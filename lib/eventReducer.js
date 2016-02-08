"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var eventReducer = function eventReducer(initialState) {
  var listeners = {};
  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    return reducer.emit(action && action.type, state, action);
  };

  reducer.on = function (event, fn) {
    (listeners[event] || (listeners[event] = [])).push(fn);
    return reducer;
  };

  reducer.removeListener = function (event, fn) {
    var index = listeners[event] && listeners[event].indexOf(fn);
    if (index > -1) {
      listeners[event].splice(index, 1);
    }
  };

  reducer.emit = function (event, state, action) {
    return (event && listeners[event] || []).reduce(function (nextstate, listener) {
      return listener(nextstate, action);
    }, state);
  };

  reducer.listeners = listeners;

  return reducer;
};

exports.default = eventReducer;
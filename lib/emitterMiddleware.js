"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var emitterMiddleware = function emitterMiddleware() {
  return function (next) {
    return function (event, data) {
      return data ? next(_extends({ type: event }, data)) : next(event);
    };
  };
};

exports.default = emitterMiddleware;
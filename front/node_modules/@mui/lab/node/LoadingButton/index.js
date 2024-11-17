"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  loadingButtonClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _LoadingButton.default;
  }
});
Object.defineProperty(exports, "loadingButtonClasses", {
  enumerable: true,
  get: function () {
    return _loadingButtonClasses.default;
  }
});
var _LoadingButton = _interopRequireDefault(require("./LoadingButton"));
var _loadingButtonClasses = _interopRequireWildcard(require("./loadingButtonClasses"));
Object.keys(_loadingButtonClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _loadingButtonClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _loadingButtonClasses[key];
    }
  });
});
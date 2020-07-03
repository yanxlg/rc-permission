"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Permission = Permission;
exports.RouterPermissionWrap = exports.ComponentPermissionWrap = void 0;

var _react = _interopRequireDefault(require("react"));

var _ComponentPermission = _interopRequireDefault(require("./ComponentPermission"));

var _RouterPermission = _interopRequireDefault(require("./RouterPermission"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * decorator + wrap support
 * 支持同一类组件中权限控制
 **/
var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var ComponentPermissionWrap = function ComponentPermissionWrap(children, props) {
  return _react["default"].createElement(_ComponentPermission["default"], __assign({}, props, {
    children: children
  }));
};

exports.ComponentPermissionWrap = ComponentPermissionWrap;

var RouterPermissionWrap = function RouterPermissionWrap(children, props) {
  return _react["default"].createElement(_RouterPermission["default"], __assign({}, props, {
    children: children
  }));
};
/**
 * Class Decorator
 * @param config
 * @constructor
 */


exports.RouterPermissionWrap = RouterPermissionWrap;

function Permission(config) {
  var router = config.router,
      _config = __rest(config, ["router"]);

  if (router) {
    return function wrapWithConnect(WrappedComponent) {
      return function (props) {
        return RouterPermissionWrap(_react["default"].createElement(WrappedComponent, __assign({}, props)), _config);
      };
    };
  } else {
    return function wrapWithConnect(WrappedComponent) {
      return function (props) {
        return ComponentPermissionWrap(_react["default"].createElement(WrappedComponent, __assign({}, props)), _config);
      };
    };
  }
}
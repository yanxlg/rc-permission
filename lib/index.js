"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Permission", {
  enumerable: true,
  get: function get() {
    return _decorator.Permission;
  }
});
Object.defineProperty(exports, "PermissionContext", {
  enumerable: true,
  get: function get() {
    return _Provider.Context;
  }
});
Object.defineProperty(exports, "PermissionProvider", {
  enumerable: true,
  get: function get() {
    return _Provider["default"];
  }
});
Object.defineProperty(exports, "PermissionRouter", {
  enumerable: true,
  get: function get() {
    return _RouterPermission["default"];
  }
});
Object.defineProperty(exports, "PermissionComponent", {
  enumerable: true,
  get: function get() {
    return _ComponentPermission["default"];
  }
});
Object.defineProperty(exports, "usePermissionFilter", {
  enumerable: true,
  get: function get() {
    return _ComponentPermission.usePermissionFilter;
  }
});
Object.defineProperty(exports, "useDataPermission", {
  enumerable: true,
  get: function get() {
    return _DataPermission.useDataPermission;
  }
});
exports.PermissionComponentWrap = exports.PermissionRouterWrap = void 0;

var _react = _interopRequireDefault(require("react"));

var _decorator = require("./decorator");

var _Provider = _interopRequireWildcard(require("./Provider"));

var _RouterPermission = _interopRequireDefault(require("./RouterPermission"));

var _ComponentPermission = _interopRequireWildcard(require("./ComponentPermission"));

var _DataPermission = require("./DataPermission");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var PermissionRouterWrap = function PermissionRouterWrap(Component, config) {
  return function (props) {
    return _react["default"].createElement(_RouterPermission["default"], __assign({}, config), _react["default"].createElement(Component, __assign({}, props)));
  };
};

exports.PermissionRouterWrap = PermissionRouterWrap;

var PermissionComponentWrap = function PermissionComponentWrap(Component, config) {
  return function (props) {
    return _react["default"].createElement(_ComponentPermission["default"], __assign({}, config), _react["default"].createElement(Component, __assign({}, props)));
  };
};

exports.PermissionComponentWrap = PermissionComponentWrap;
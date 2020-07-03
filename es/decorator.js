/**
 * decorator + wrap support
 * 支持同一类组件中权限控制
 **/
var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React from "react";
import ComponentPermission from "./ComponentPermission";
import RouterPermission from "./RouterPermission";

var ComponentPermissionWrap = function ComponentPermissionWrap(children, props) {
  return React.createElement(ComponentPermission, __assign({}, props, {
    children: children
  }));
};

var RouterPermissionWrap = function RouterPermissionWrap(children, props) {
  return React.createElement(RouterPermission, __assign({}, props, {
    children: children
  }));
};
/**
 * Class Decorator
 * @param config
 * @constructor
 */


function Permission(config) {
  var router = config.router,
      _config = __rest(config, ["router"]);

  if (router) {
    return function wrapWithConnect(WrappedComponent) {
      return function (props) {
        return RouterPermissionWrap(React.createElement(WrappedComponent, __assign({}, props)), _config);
      };
    };
  } else {
    return function wrapWithConnect(WrappedComponent) {
      return function (props) {
        return ComponentPermissionWrap(React.createElement(WrappedComponent, __assign({}, props)), _config);
      };
    };
  }
}

export { ComponentPermissionWrap, RouterPermissionWrap, Permission };
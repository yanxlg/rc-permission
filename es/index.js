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

import React from "react";
export { Permission } from "./decorator";
export { Context as PermissionContext, default as PermissionProvider } from "./Provider";
import { default as PermissionRouter } from "./RouterPermission";
import { default as PermissionComponent, usePermissionFilter } from "./ComponentPermission";
export { useDataPermission } from "./DataPermission";

var PermissionRouterWrap = function PermissionRouterWrap(Component, config) {
  return function (props) {
    return React.createElement(PermissionRouter, __assign({}, config), React.createElement(Component, __assign({}, props)));
  };
};

var PermissionComponentWrap = function PermissionComponentWrap(Component, config) {
  return function (props) {
    return React.createElement(PermissionComponent, __assign({}, config), React.createElement(Component, __assign({}, props)));
  };
};

export { PermissionRouterWrap, PermissionRouter, PermissionComponent, usePermissionFilter, PermissionComponentWrap };
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 返回拥有的权限树，对于未拥有的权限树进行隐藏，确保一定安全性；====>加密，每天生层一种秘钥，客户端解密，服务端加密，进一步确保安全
 * router权限  路由权限如果没有则重定向到登录页面，是否是页面由权限组件决定，不由权限数据决定
 * 提供权限控制组件及装饰器，服务端渲染需要优先获取权限，客户端渲染依靠登录后获取的权限列表 （TODO 部分场景存在临时用户，客户端权限也需要伪实时更新）
 * 无权限时api返回特定标识，返回后客户端主动获取最新权限并更新视图
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

var Context = _react["default"].createContext(null);

exports.Context = Context;

var Provider = function Provider(_a) {
  var pTree = _a.pTree,
      children = _a.children,
      props = __rest(_a, ["pTree", "children"]);

  var _b = (0, _react.useState)(pTree || {}),
      tree = _b[0],
      updateTree = _b[1];

  return _react["default"].createElement(Context.Provider, {
    value: __assign(__assign({
      pTree: tree,
      updateTree: updateTree
    }, props), {
      dataPermission: props.dataPermission || []
    })
  }, children);
};

var _default = _react["default"].memo(Provider);

exports["default"] = _default;
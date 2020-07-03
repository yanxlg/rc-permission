"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Provider = require("./Provider");

var _assert = _interopRequireDefault(require("assert"));

var _ReactInstanceMap = require("./ReactInstanceMap");

var _ComponentPermission = require("./ComponentPermission");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// router权限校验
var RouterPermission = function RouterPermission(_a) {
  var login = _a.login,
      pid = _a.pid,
      history = _a.history,
      children = _a.children;

  var _b, _c; // 是否登录，是否拥有该页面权限，可能是子页面


  var context = (0, _react.useContext)(_Provider.Context);
  var checkLogin = context.checkLogin,
      format = context.format,
      pTree = context.pTree,
      Page_403 = context.Page_403;

  if (login) {
    (0, _assert["default"])(checkLogin, "login check require checkLogin function.");
    var isLogin = (_b = checkLogin) === null || _b === void 0 ? void 0 : _b();

    if (!isLogin) {
      (0, _assert["default"])(history || context.history, "redirect must have history property."); // 未登录

      (_c = history || context.history) === null || _c === void 0 ? void 0 : _c.replace("/login"); // 跳转登录，登录页面支持重定向

      return null;
    }
  } // 判断路由权限


  var owner = (0, _ReactInstanceMap.getOwner)();
  var pidList = (0, _react.useMemo)(function () {
    return (0, _ComponentPermission.getPidList)(owner, format, pid);
  }, []);
  var check = (0, _react.useMemo)(function () {
    return (0, _ComponentPermission.checkPermission)(pidList, pTree);
  }, [pTree]);
  var goHome = (0, _react.useCallback)(function () {
    var _a;

    (_a = history || context.history) === null || _a === void 0 ? void 0 : _a.replace("/");
  }, []);

  if (check === true || typeof check === "object" && check.access !== false) {
    return _react["default"].createElement(_react["default"].Fragment, null, children);
  } else {
    return Page_403 ? _react["default"].createElement(_react["default"].Fragment, null, Page_403) : _react["default"].createElement("div", null, _react["default"].createElement("div", {
      style: {
        textAlign: "center",
        color: "rgba(0,0,0,.85)",
        fontSize: 24,
        lineHeight: 1.8
      }
    }, "403"), _react["default"].createElement("div", {
      style: {
        color: "rgba(0,0,0,.45)",
        fontSize: 14,
        lineHeight: 1.6,
        textAlign: "center"
      }
    }, "Sorry, you don't have access to this page."), _react["default"].createElement("div", {
      style: {
        textAlign: "center"
      }
    }, _react["default"].createElement("button", {
      onClick: goHome,
      style: {
        color: "#fff",
        background: "#1890ff",
        borderColor: "#1890ff",
        textShadow: "0 -1px 0 rgba(0,0,0,.12)",
        boxShadow: "0 2px 0 rgba(0,0,0,.045)",
        textAlign: "center",
        cursor: "pointer",
        height: 32,
        padding: "4px 15px",
        fontSize: 14,
        borderRadius: 2,
        border: "1px solid #d9d9d9",
        outline: "none"
      }
    }, "Back to home")));
  }
};

var _default = _react["default"].memo(RouterPermission);

exports["default"] = _default;
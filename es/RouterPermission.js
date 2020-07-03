// router权限校验
import React, { useCallback, useContext, useMemo } from "react";
import { Context } from "./Provider";
import assert from "assert";
import { getOwner } from "./ReactInstanceMap";
import { checkPermission, getPidList } from "./ComponentPermission";

var RouterPermission = function RouterPermission(_a) {
  var login = _a.login,
      pid = _a.pid,
      history = _a.history,
      children = _a.children;

  var _b, _c; // 是否登录，是否拥有该页面权限，可能是子页面


  var context = useContext(Context);
  var checkLogin = context.checkLogin,
      format = context.format,
      pTree = context.pTree,
      Page_403 = context.Page_403;

  if (login) {
    assert(checkLogin, "login check require checkLogin function.");
    var isLogin = (_b = checkLogin) === null || _b === void 0 ? void 0 : _b();

    if (!isLogin) {
      assert(history || context.history, "redirect must have history property."); // 未登录

      (_c = history || context.history) === null || _c === void 0 ? void 0 : _c.replace("/login"); // 跳转登录，登录页面支持重定向

      return null;
    }
  } // 判断路由权限


  var owner = getOwner();
  var pidList = useMemo(function () {
    return getPidList(owner, format, pid);
  }, []);
  var check = useMemo(function () {
    return checkPermission(pidList, pTree);
  }, [pTree]);
  var goHome = useCallback(function () {
    var _a;

    (_a = history || context.history) === null || _a === void 0 ? void 0 : _a.replace("/");
  }, []);

  if (check === true || typeof check === "object" && check.access !== false) {
    return React.createElement(React.Fragment, null, children);
  } else {
    return Page_403 ? React.createElement(React.Fragment, null, Page_403) : React.createElement("div", null, React.createElement("div", {
      style: {
        textAlign: "center",
        color: "rgba(0,0,0,.85)",
        fontSize: 24,
        lineHeight: 1.8
      }
    }, "403"), React.createElement("div", {
      style: {
        color: "rgba(0,0,0,.45)",
        fontSize: 14,
        lineHeight: 1.6,
        textAlign: "center"
      }
    }, "Sorry, you don't have access to this page."), React.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, React.createElement("button", {
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

export default React.memo(RouterPermission);
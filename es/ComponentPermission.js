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

import React, { useContext, useMemo } from "react";
import { Context } from "./Provider";
import * as assert from "assert";
import classNames from "classnames";
import { getOwner } from "./ReactInstanceMap"; // 需要缓存及局部缓存

var getChildren = function getChildren(pItem, children, defaultControl, customStyles, customClassNames, fallback, toolTipWrap, defaultToolTip, toolTip) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o; // 设置children属性


  if (pItem === true) {
    return children; // 废弃
  }

  var item = typeof pItem === "boolean" ? {
    control: defaultControl,
    access: pItem
  } : pItem;
  var _p = item.access,
      access = _p === void 0 ? true : _p,
      styles = item.styles,
      classes = item.classNames,
      control = item.control;
  var style = access ? (_a = styles) === null || _a === void 0 ? void 0 : _a.active : (_b = styles) === null || _b === void 0 ? void 0 : _b.inActive;
  var customStyle = access ? (_c = customStyles) === null || _c === void 0 ? void 0 : _c.active : (_d = customStyles) === null || _d === void 0 ? void 0 : _d.inActive;
  var customClassName = access ? (_e = customClassNames) === null || _e === void 0 ? void 0 : _e.active : (_f = customClassNames) === null || _f === void 0 ? void 0 : _f.inActive;
  var mergeClassName = classNames((_g = children.props) === null || _g === void 0 ? void 0 : _g.className, access ? (_h = classes) === null || _h === void 0 ? void 0 : _h.active : (_j = classes) === null || _j === void 0 ? void 0 : _j.inActive, customClassName);

  var mergeStyle = __assign(__assign(__assign(__assign({}, (_k = children.props) === null || _k === void 0 ? void 0 : _k.style), control === "display" && !access ? {
    display: "none"
  } : control === "visibility" && !access ? {
    visibility: "hidden"
  } : {}), style), customStyle);

  var mergeProps = __assign(__assign(__assign({}, children.props), {
    style: mergeStyle,
    className: mergeClassName
  }), control === "disabled" && !access ? {
    disabled: true
  } : {}); // fallback优先级最高


  if (!access && fallback) {
    return fallback();
  }

  var _toolTip = item.toolTip || toolTip || defaultToolTip;

  if (control === "tooltip" || toolTip) {
    // 组件props上tooltip强制覆盖
    assert(_toolTip, "Permission ToolTip control must have tooltip property.");
    assert(toolTipWrap, "Permission ToolTip control must have toolTipWrap component."); // fix Popconfirm

    if ("onConfirm" in mergeProps) {
      mergeProps.disabled = true;
    } else if (mergeProps.popConfirmProps && "onConfirm" in mergeProps.popConfirmProps) {
      mergeProps.popConfirmProps.disabled = true;
    }

    if (_toolTip && toolTipWrap && !access) {
      // children 为disabled状态
      var child = React.cloneElement(children, __assign(__assign({}, mergeProps), {
        onClick: undefined,
        _privateClick: true
      }), (_l = children.props) === null || _l === void 0 ? void 0 : _l.children); // onClick去掉

      if ((_m = children.props) === null || _m === void 0 ? void 0 : _m.disabled) {
        return child;
      }

      return React.cloneElement(toolTipWrap, {
        title: _toolTip
      }, child);
    }
  }

  if (control === "render" && !access) {
    return null;
  } else {
    return React.cloneElement(children, mergeProps, (_o = children.props) === null || _o === void 0 ? void 0 : _o.children);
  }
};

export var getPidList = function getPidList(instance, format, pid) {
  var _a;

  if (format === "flat") {
    return [pid]; // 扁平化，根键值对
  } else {
    var permissions = [];
    var parent_1 = instance;

    while (parent_1) {
      if (parent_1.elementType === PermissionComponent || ((_a = parent_1.elementType) === null || _a === void 0 ? void 0 : _a.type) === PermissionComponent) {
        permissions.unshift(parent_1.pendingProps.pid);
      }

      parent_1 = parent_1["return"];
    }

    return permissions;
  }
};
/**
 * 判断是否有权限
 * @param pidList
 * @param pidMap
 * @return boolean|PermissionItem  true:废弃，不做处理，false：无权限，PermissionItem：权限控制Item
 */

export var checkPermission = function checkPermission(pidList, pidMap) {
  var length = pidList.length;
  var access = false,
      i = 0,
      next = pidMap,
      cur = next[pidList[i]];

  while (!access && cur && i < length) {
    if (cur.deprecated) {
      // 废弃
      access = true; // 对于废弃的不做权限处理
    } else {
      i++;

      if (i < length) {
        next = cur.children;

        if (!next) {
          cur = undefined;
          i = length; //退出循环
        } else {
          cur = next[pidList[i]];
        }

        if (i === length && cur) {
          access = cur.deprecated ? true : cur;
        }
      } else {
        access = cur.deprecated ? true : cur;
      }
    }
  }

  return access;
};

var PermissionComponent = function PermissionComponent(props) {
  var context = useContext(Context);
  assert(context !== null, "Permission Component must be used by wrapped with PermissionProvider");
  assert(props.pid, "Permission Component must have pid");
  assert(props.children, "Permission Component must have children");
  var format = context.format,
      pTree = context.pTree;
  var children = props.children,
      pid = props.pid,
      styles = props.styles,
      classNames = props.classNames,
      fallback = props.fallback;
  var owner = getOwner();
  var pidList = useMemo(function () {
    return getPidList(owner, format, pid);
  }, []);
  var check = useMemo(function () {
    return checkPermission(pidList, pTree);
  }, [pTree]);
  var toolTipWrap = props.toolTipWrap || context.toolTipWrap; // 缓存创建节点

  return useMemo(function () {
    return getChildren(check, children, props.control || context.defaultControl || "render", styles, classNames, fallback, toolTipWrap, context.defaultToolTip, props.toolTip);
  }, [children, pTree]);
};

var usePermissionFilter = function usePermissionFilter(items) {
  var context = useContext(Context);
  var format = context.format,
      pTree = context.pTree;
  var owner = getOwner();
  return useMemo(function () {
    return items.filter(function (item) {
      var pidList = getPidList(owner, format, item.pid);
      var check = checkPermission(pidList, pTree);
      return check === true || typeof check === "object" && (check.access === void 0 || check.access === true);
    });
  }, [items, pTree]);
};

export default React.memo(PermissionComponent);
export { usePermissionFilter };
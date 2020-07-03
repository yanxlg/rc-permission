"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataPermission = void 0;

var _react = require("react");

var _Provider = require("./Provider");

/**
 * 数据权限，前端数据权限仅涉及字典列表
 * @constructor
 */
var useDataPermission = function useDataPermission(items) {
  var dataPermission = (0, _react.useContext)(_Provider.Context).dataPermission; // 根据结构判断需不需要进行处理

  return (0, _react.useMemo)(function () {
    var list = items.filter(function (item) {
      var _a;

      return item.pTag === void 0 || ((_a = dataPermission) === null || _a === void 0 ? void 0 : _a.indexOf(item.pTag)) > -1;
    });
    var map = {}; // 用getter 动态判断获取数据

    list.forEach(function (_a) {
      var name = _a.name,
          value = _a.value;
      map[name] = value;
    });
    return [list, map];
  }, [dataPermission]);
};

exports.useDataPermission = useDataPermission;
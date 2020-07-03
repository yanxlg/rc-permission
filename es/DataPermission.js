/**
 * 数据权限，前端数据权限仅涉及字典列表
 * @constructor
 */
import { useContext, useMemo } from "react";
import { Context } from "./Provider";

var useDataPermission = function useDataPermission(items) {
  var dataPermission = useContext(Context).dataPermission; // 根据结构判断需不需要进行处理

  return useMemo(function () {
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

export { useDataPermission };
/**
 * 数据权限，前端数据权限仅涉及字典列表
 * @constructor
 */
import { useContext, useMemo } from "react";
import { Context } from "./Provider";

declare interface DataItem<T = string> {
    name: string | number;
    value: T;
    pTag?: string;
}

const useDataPermission = <T,>(items: DataItem<T>[]) => {
    const { dataPermission } = useContext(Context); // 根据结构判断需不需要进行处理
    return useMemo(() => {
        const list = items.filter(item => {
            return item.pTag === void 0 || dataPermission?.indexOf(item.pTag) > -1;
        });
        const map: { [key: string]: T } = {};
        // 用getter 动态判断获取数据
        list.forEach(({ name, value }) => {
            map[name] = value;
        });
        return [list, map];
    }, [dataPermission]);
};

export { useDataPermission };

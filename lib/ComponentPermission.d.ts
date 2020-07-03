import React, { ReactElement } from "react";
import { IPermissionContext, ControlType, IPermissionTree, PermissionItem } from "./Provider";
export declare interface IPermissionChildProps {
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
export declare interface PermissionProps {
    pid: string;
    fallback?: () => React.ReactElement;
    children?: ReactElement<IPermissionChildProps>;
    control?: ControlType;
    styles?: {
        active?: React.CSSProperties;
        inActive?: React.CSSProperties;
    };
    classNames?: {
        active?: string[];
        inActive?: string[];
    };
    toolTipWrap?: IPermissionContext["toolTipWrap"];
    toolTip?: string;
}
export declare const getPidList: (instance: any, format: "tree" | "flat", pid: string) => any[];
/**
 * 判断是否有权限
 * @param pidList
 * @param pidMap
 * @return boolean|PermissionItem  true:废弃，不做处理，false：无权限，PermissionItem：权限控制Item
 */
export declare const checkPermission: (pidList: string[], pidMap: IPermissionTree) => boolean | PermissionItem;
declare const usePermissionFilter: (
    items: {
        [key: string]: any;
        pid: string;
    }[]
) => {
    [key: string]: any;
    pid: string;
}[];
declare const _default: React.NamedExoticComponent<PermissionProps>;
export default _default;
export { usePermissionFilter };

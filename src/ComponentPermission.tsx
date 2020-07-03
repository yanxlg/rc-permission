import React, { ReactElement, useContext, useMemo } from "react";
import { IPermissionContext, ControlType, Context, IPermissionTree, PermissionItem } from "./Provider";
import * as assert from "assert";
import classNames from "classnames";
import { getOwner } from "./ReactInstanceMap";

export declare interface IPermissionChildProps {
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export declare interface PermissionProps {
    pid: string;
    fallback?: () => React.ReactElement; // 无权限时替代组件
    // toolTip?:string;
    children?: ReactElement<IPermissionChildProps>;
    control?: ControlType; // 默认control
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

// 需要缓存及局部缓存
const getChildren = (
    pItem: PermissionItem | boolean,
    children: ReactElement,
    defaultControl: ControlType,
    customStyles?: PermissionItem["styles"],
    customClassNames?: PermissionItem["classNames"],
    fallback?: PermissionProps["fallback"],
    toolTipWrap?: PermissionProps["toolTipWrap"],
    defaultToolTip?: string,
    toolTip?: string
) => {
    // 设置children属性
    if (pItem === true) {
        return children; // 废弃
    }

    const item: PermissionItem =
        typeof pItem === "boolean"
            ? {
                  control: defaultControl,
                  access: pItem
              }
            : pItem;

    const { access = true, styles, classNames: classes, control } = item;

    const style = access ? styles?.active : styles?.inActive;

    const customStyle = access ? customStyles?.active : customStyles?.inActive;
    const customClassName = access ? customClassNames?.active : customClassNames?.inActive;
    const mergeClassName = classNames(children.props?.className, access ? classes?.active : classes?.inActive, customClassName);

    const mergeStyle = {
        ...children.props?.style,
        ...(control === "display" && !access ? { display: "none" } : control === "visibility" && !access ? { visibility: "hidden" } : {}),
        ...style,
        ...customStyle
    };

    const mergeProps = {
        ...children.props,
        style: mergeStyle,
        className: mergeClassName,
        ...(control === "disabled" && !access ? { disabled: true } : {})
    };
    // fallback优先级最高
    if (!access && fallback) {
        return fallback();
    }
    const _toolTip = item.toolTip || toolTip || defaultToolTip;
    if (control === "tooltip" || toolTip) {
        // 组件props上tooltip强制覆盖
        assert(_toolTip, "Permission ToolTip control must have tooltip property.");
        assert(toolTipWrap, "Permission ToolTip control must have toolTipWrap component.");

        // fix Popconfirm
        if ("onConfirm" in mergeProps) {
            mergeProps.disabled = true;
        } else if (mergeProps.popConfirmProps && "onConfirm" in mergeProps.popConfirmProps) {
            mergeProps.popConfirmProps.disabled = true;
        }

        if (_toolTip && toolTipWrap && !access) {
            // children 为disabled状态
            const child = React.cloneElement(children, { ...mergeProps, onClick: undefined, _privateClick: true }, children.props?.children); // onClick去掉
            if (children.props?.disabled) {
                return child;
            }
            return React.cloneElement(
                toolTipWrap,
                {
                    title: _toolTip
                },
                child
            );
        }
    }
    if (control === "render" && !access) {
        return null;
    } else {
        return React.cloneElement(children, mergeProps, children.props?.children);
    }
};

export const getPidList = (instance: any, format: IPermissionContext["format"], pid: string) => {
    if (format === "flat") {
        return [pid]; // 扁平化，根键值对
    } else {
        let permissions = [];
        let parent = instance;
        while (parent) {
            if (parent.elementType === PermissionComponent || parent.elementType?.type === PermissionComponent) {
                permissions.unshift(parent.pendingProps.pid);
            }
            parent = parent.return;
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
export const checkPermission = (pidList: string[], pidMap: IPermissionTree) => {
    const length = pidList.length;
    let access: boolean | PermissionItem = false,
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

const PermissionComponent = (props: PermissionProps) => {
    const context = useContext(Context);
    assert(context !== null, "Permission Component must be used by wrapped with PermissionProvider");
    assert(props.pid, "Permission Component must have pid");
    assert(props.children, "Permission Component must have children");
    const { format, pTree } = context;

    const { children, pid, styles, classNames, fallback } = props;
    const owner = getOwner();
    const pidList = useMemo(() => getPidList(owner, format, pid), []);
    const check = useMemo(() => checkPermission(pidList, pTree), [pTree]);
    const toolTipWrap = props.toolTipWrap || context.toolTipWrap;
    // 缓存创建节点
    return useMemo(() => {
        return getChildren(check, children, props.control || context.defaultControl || "render", styles, classNames, fallback, toolTipWrap, context.defaultToolTip, props.toolTip);
    }, [children, pTree]);
};

const usePermissionFilter = (
    items: Array<{
        pid: string;
        [key: string]: any;
    }>
) => {
    const context = useContext(Context);
    const { format, pTree } = context;
    const owner = getOwner();

    return useMemo(() => {
        return items.filter(item => {
            const pidList = getPidList(owner, format, item.pid);
            const check = checkPermission(pidList, pTree);
            return check === true || (typeof check === "object" && (check.access === void 0 || check.access === true));
        });
    }, [items, pTree]);
};

export default React.memo<PermissionProps>(PermissionComponent);

export { usePermissionFilter };

/**
 * 返回拥有的权限树，对于未拥有的权限树进行隐藏，确保一定安全性；====>加密，每天生层一种秘钥，客户端解密，服务端加密，进一步确保安全
 * router权限  路由权限如果没有则重定向到登录页面，是否是页面由权限组件决定，不由权限数据决定
 * 提供权限控制组件及装饰器，服务端渲染需要优先获取权限，客户端渲染依靠登录后获取的权限列表 （TODO 部分场景存在临时用户，客户端权限也需要伪实时更新）
 * 无权限时api返回特定标识，返回后客户端主动获取最新权限并更新视图
 **/
import React from "react";
import * as H from "history";
/**
 * 控制类型，权限组件支持多样化控制方式，可权限数据中配置，可组件属性中配置，权限数据优先级>组件属性
 * render 组件级控制，不实例化组件实例
 * display 元素级控制，实例化组件实例，但不渲染元素，与render的区别在于是否执行组件的初始化及部分生命周期；部分场景可能需要使用，例如埋点等，虽然不可见但是会触发某些操作
 * visibility 元素级控制，隐藏元素
 * disabled 元素级控制，不可点击
 **/
export declare type ControlType = "render" | "display" | "visibility" | "disabled" | "tooltip";
/**
 * 权限数据元素
 * access：是否拥有该权限，默认值为true，当为false时等同于没有改权限，但是需要支持自定义属性及样式，因此需要该属性来实现控制
 * control：控制类型，`页面级别不生效`
 * styles：权限有无时额外样式属性，在一定程度上可以覆盖control的行为，需要受控组件支持style属性传入，`页面级别不生效`
 *   active：有权限时自定义样式
 *   inActive：无权限时自定义样式
 * classNames：权限有无时额外样式表，在一定程度上可以覆盖control的行为，需要受控组件支持className属性传入，`页面级别不生效`
 *   active：有权限时自定义样式表
 *   inActive：无权限时自定义样式表
 * deprecated：该权限是否被废弃
 * children：子权限列表
 * ==============================================
 * 无权限数据两种方式：
 * 一：没有该item=>从组件及Provider读取control属性，默认值为render
 * 二：item的access设置为false，从该item读取control属性及自定义属性
 * ==============================================
 */
export declare type PermissionItem = {
    access?: boolean;
    control?: ControlType;
    styles?: {
        active?: React.CSSProperties;
        inActive?: React.CSSProperties;
    };
    classNames?: {
        active?: string[];
        inActive?: string[];
    };
    deprecated?: boolean;
    children?: {
        [key: string]: PermissionItem;
    };
    toolTip?: string;
};
export declare type IPermissionTree = {
    [key: string]: PermissionItem;
};
declare type IToolTipWrap = React.ReactElement<{
    title: string;
}>;
declare interface IPermissionProviderProps {
    pTree?: IPermissionTree;
    format?: "tree" | "flat";
    defaultControl?: ControlType;
    toolTipWrap?: IToolTipWrap;
    defaultToolTip?: string;
    checkLogin?: () => boolean;
    history?: H.History;
    Page_403?: React.ReactNode;
    dataPermission?: string[];
}
export declare interface IPermissionContext extends IPermissionProviderProps {
    updateTree: (tree: IPermissionTree) => void;
}
declare const Context: React.Context<IPermissionContext>;
declare const _default: React.NamedExoticComponent<React.PropsWithChildren<IPermissionProviderProps>>;
export default _default;
export { Context };

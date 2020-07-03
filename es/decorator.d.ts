/**
 * decorator + wrap support
 * 支持同一类组件中权限控制
 **/
import React from "react";
import { IPermissionChildProps, PermissionProps } from "./ComponentPermission";
import { IRouterPermission } from "./RouterPermission";
declare const ComponentPermissionWrap: (
    children: React.ReactElement<
        IPermissionChildProps,
        string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)
    >,
    props: Pick<PermissionProps, "toolTipWrap" | "styles" | "classNames" | "fallback" | "pid" | "control" | "toolTip">
) => JSX.Element;
declare const RouterPermissionWrap: (children: React.ReactNode, props: IRouterPermission) => JSX.Element;
declare type RouterPermissionProps = {
    router: true;
} & IRouterPermission;
declare type ComponentPermissionProps = {
    router?: false;
} & Omit<PermissionProps, "children">;
declare type IPProps = RouterPermissionProps | ComponentPermissionProps;
declare type ComponentClass<T extends IPermissionChildProps> = React.ComponentClass<T>;
declare type IIPermissionChildProps = IPermissionChildProps & {
    [key: string]: any;
};
/**
 * Class Decorator
 * @param config
 * @constructor
 */
declare function Permission<T>(config: IPProps): <T_1 extends IIPermissionChildProps>(WrappedComponent: ComponentClass<T_1>) => any;
export { ComponentPermissionWrap, RouterPermissionWrap, Permission };

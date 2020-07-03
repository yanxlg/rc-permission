import React from "react";
export { Permission } from "./decorator";
export { Context as PermissionContext, default as PermissionProvider } from "./Provider";
import { default as PermissionRouter, IRouterPermission } from "./RouterPermission";
import { default as PermissionComponent, PermissionProps, usePermissionFilter } from "./ComponentPermission";
export { useDataPermission } from "./DataPermission";
declare const PermissionRouterWrap: (Component: React.ComponentClass<any, any> | React.FC<any>, config: IRouterPermission) => (props: any) => JSX.Element;
declare const PermissionComponentWrap: <T>(
    Component: React.ComponentClass<T, any> | React.FC<T>,
    config: Pick<PermissionProps, "toolTipWrap" | "styles" | "classNames" | "fallback" | "pid" | "control" | "toolTip">
) => (props: T) => JSX.Element;
export { PermissionRouterWrap, PermissionRouter, PermissionComponent, usePermissionFilter, PermissionComponentWrap };

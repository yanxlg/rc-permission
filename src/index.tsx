import React from "react";

export { Permission } from "./decorator";
export { Context as PermissionContext, default as PermissionProvider } from "./Provider";
import { default as PermissionRouter, IRouterPermission } from "./RouterPermission";

import { default as PermissionComponent, PermissionProps, usePermissionFilter } from "./ComponentPermission";

const PermissionRouterWrap = (Component: React.ComponentClass<any, any> | React.FC<any>, config: IRouterPermission) => {
    return (props: any) => {
        return (
            <PermissionRouter {...config}>
                <Component {...props} />
            </PermissionRouter>
        );
    };
};

const PermissionComponentWrap = <T,>(Component: React.ComponentClass<T, any> | React.FC<T>, config: Omit<PermissionProps, "children">) => {
    return (props: T) => {
        return (
            <PermissionComponent {...config}>
                <Component {...props} />
            </PermissionComponent>
        );
    };
};

export { PermissionRouterWrap, PermissionRouter, PermissionComponent, usePermissionFilter, PermissionComponentWrap };

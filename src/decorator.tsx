/**
 * decorator + wrap support
 * 支持同一类组件中权限控制
 **/

import React from "react";

import { ReactElement } from "react";
import ComponentPermission, { IPermissionChildProps, PermissionProps } from "./ComponentPermission";
import RouterPermission, { IRouterPermission } from "./RouterPermission";

const ComponentPermissionWrap = (children: ReactElement<IPermissionChildProps>, props: Omit<PermissionProps, "children">) => {
    return <ComponentPermission {...props} children={children} />;
};

const RouterPermissionWrap = (children: React.ReactNode, props: IRouterPermission) => {
    return <RouterPermission {...props} children={children} />;
};

type RouterPermissionProps = {
    router: true;
} & IRouterPermission;

type ComponentPermissionProps = {
    router?: false;
} & Omit<PermissionProps, "children">;

type IPProps = RouterPermissionProps | ComponentPermissionProps;

// type RouterClass = React.ComponentClass<any, any>;

type ComponentClass<T extends IPermissionChildProps> = React.ComponentClass<T>;

type IIPermissionChildProps = IPermissionChildProps & {
    [key: string]: any;
};

/**
 * Class Decorator
 * @param config
 * @constructor
 */
function Permission<T>(config: IPProps) {
    const { router, ..._config } = config;
    if (router) {
        return function wrapWithConnect<T extends any>(WrappedComponent: ComponentClass<T>) {
            return (function(props: any) {
                return RouterPermissionWrap(<WrappedComponent {...props} />, _config);
            } as unknown) as any;
        };
    } else {
        return function wrapWithConnect<T extends IIPermissionChildProps>(WrappedComponent: ComponentClass<T>) {
            return (function(props: any) {
                return ComponentPermissionWrap(<WrappedComponent {...props} />, _config);
            } as unknown) as any;
        };
    }
}

export { ComponentPermissionWrap, RouterPermissionWrap, Permission };

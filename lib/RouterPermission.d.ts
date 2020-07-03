import React from "react";
import * as H from "history";
export declare interface IRouterPermission {
    login?: boolean;
    history?: H.History;
    pid: string;
}
declare const _default: React.NamedExoticComponent<React.PropsWithChildren<IRouterPermission>>;
export default _default;

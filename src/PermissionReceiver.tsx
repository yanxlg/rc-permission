import React from "react";
import {PermissionContext, IPermissionContextData} from "./PermissionProvider";

declare interface IPermissionReceiverProps {
    children: (permissionContext:IPermissionContextData) => React.ReactNode;
}

class PermissionReceiver extends React.Component<IPermissionReceiverProps>{
    static contextType = PermissionContext;
    public context:IPermissionContextData;
    render(){
        return this.props.children(this.context);
    }
}

export default PermissionReceiver;

import React, {useContext} from "react";
import {PermissionContext, PermissionContextData} from "./PermissionProvider";

declare interface PermissionReceiverProps {
    children: (permissionContext:PermissionContextData) => React.ReactElement;
}

const PermissionReceiver:React.FC<PermissionReceiverProps> = ({children})=>{
    const context = useContext(PermissionContext);
    return children(context);
};

export default PermissionReceiver;

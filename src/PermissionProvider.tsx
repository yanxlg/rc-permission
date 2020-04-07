import React from 'react';

export type ControlType = "render"|"display"|"visibility"|"disabled"|"none";


export type PermissionItem = {
    type?:ControlType;
    style?:React.CSSProperties;
    active?:boolean;
    children?:{
        [key:string]: PermissionItem;
    };
};


export type PermissionBannedMap = {
    [key:string]:PermissionItem
}

export declare interface PermissionContextData {
    bannedMap?:PermissionBannedMap;// 无权限列表
}

const PermissionContext:React.Context<PermissionContextData> = React.createContext(null);


const PermissionProvider:React.FC<PermissionContextData>=({bannedMap,children})=>{
    return (
        <PermissionContext.Provider value={{bannedMap}}>
            {
                children
            }
        </PermissionContext.Provider>
    );
};

export default PermissionProvider;

export {PermissionContext};

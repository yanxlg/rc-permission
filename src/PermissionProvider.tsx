import React from 'react';

type Prop = "visibility"|"disable"|"display";

type CheckType = "level"|"flat";

type IPermissionChildren = {
    prop?:Prop;
    children?:{
        [key:string]: IPermissionJSONItem;
    }
}

type BooleanTrue = Extract<boolean,true>;

export type IPermissionJSONItem = BooleanTrue|IPermissionChildren;


export type IPermissionJSON = {
    [key:string]:IPermissionJSONItem
}

export declare interface IPermissionContextData {
    json?:IPermissionJSON;
    checkType?:CheckType; // default level
}

const PermissionContext:React.Context<IPermissionContextData> = React.createContext(null);

export default class PermissionProvider extends React.PureComponent<IPermissionContextData>{
    render() {
        const {json,checkType,children} = this.props;
        return (
            <PermissionContext.Provider value={{json,checkType}}>
                {
                    children
                }
            </PermissionContext.Provider>
        );
    }
}

export {PermissionContext};

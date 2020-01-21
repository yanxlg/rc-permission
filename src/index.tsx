import React from "react";
import {get as getInstance} from "./ReactInstanceMap";
import PermissionReceiver from "./PermissionReceiver";
import {IPermissionContextData} from "./PermissionProvider";
import * as assert from "assert";


/**
 * 优先级：
 *  成功：success > children
 *  失败：fall > children
 */

declare interface IPermissionProps {
    pid: string;
    success?:()=>React.ReactNode;
    fallback?:()=>React.ReactNode;
}

class Permission extends React.PureComponent<IPermissionProps> {
    private $$c_type = "permission";
    private $$p_context: IPermissionContextData;
    private $$p_list: string[];

    private getPermissionList(context:IPermissionContextData) {
        assert(context!==null,"Permission Component must be used by wrapped with PermissionProvider");
        if(context !== this.$$p_context){
            this.$$p_list = undefined;
        }
        if (this.$$p_list) {
            return this.$$p_list;
        }
        let permissions = [this.props.pid];
        const {checkType="level"} = context;
        if(checkType === "level"){
            let parent = getInstance(this)!.return;
            while (parent) {
                if (parent.stateNode instanceof Permission && parent.stateNode.$$c_type === "permission") {
                    permissions.unshift(parent.stateNode.props.pid);
                }
                parent = parent.return;
            }
        }
        this.$$p_list = permissions;
        return permissions;
    }

    private getPermissionItem(context:IPermissionContextData){
        const permissions = this.getPermissionList(context);
        const {json={},checkType="level"} = context;
        if(checkType === "level"){
            const length = permissions.length;
            let i=1;
            let next = json;
            let cur = next[permissions[0]];// 游标
            while (cur && typeof cur!=="boolean" && i<length){
                next = cur.children;
                cur = next[permissions[i]];
                i++;
            }
            if(i<length){
                return null;
            }
            return cur;
        }else{
            return json[permissions[0]];
        }
    };
    private getChildren(disabled:boolean,dened:boolean){
        const {children} = this.props;
        return React.Children.map(children,((child)=>{
            if(React.isValidElement(child)){
                return React.cloneElement(child,{
                    ...child.props,
                    disabled,
                },child.props?.children);
            }else{
                return dened?null:children;
            }
        }));
    }
    render() {
        const {children,success,fallback} = this.props;
        return (
            <PermissionReceiver>
                {
                    (context) => {
                        const config = this.getPermissionItem(context);
                        if(config){
                            if(config === true||!config.children||config.prop==="display"){
                                // default 不显示
                                return fallback?fallback():null;
                            }
                            const {prop} = config;
                            if(prop){
                                if(fallback){
                                    return fallback();
                                }
                                const childs = this.getChildren(prop==="disable",prop==="visibility");
                                return childs||null;
                            }else{
                                return success?success():children;
                            }
                        }
                        return success?success():children;
                    }
                }
            </PermissionReceiver>
        )
    }
}

export {Permission};

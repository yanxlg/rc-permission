import React, {ReactElement} from "react";
import {get as getInstance} from "./ReactInstanceMap";
import PermissionReceiver from "./PermissionReceiver";
import {PermissionContextData, ControlType} from "./PermissionProvider";
import * as assert from "assert";


declare interface PermissionProps {
    pid: string;
    fallback?:()=>React.ReactElement;
    style?:React.CSSProperties;
    checkedLevel?:"root";
    children?:ReactElement;
}



class Permission extends React.PureComponent<PermissionProps> {
    private $$c_type = "permission";
    private $$p_context: PermissionContextData;
    private $$p_list: string[];

    private getPermissionList(context:PermissionContextData) {
        assert(context!==null,"Permission Component must be used by wrapped with PermissionProvider");
        if(context !== this.$$p_context){
            this.$$p_list = undefined;
            this.$$p_context=context;
        }
        if (this.$$p_list) {
            return this.$$p_list;
        }
        let permissions = [this.props.pid];
        const {checkedLevel} = this.props;
        if(checkedLevel !== "root"){
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

    private getPermissionItem(context:PermissionContextData){
        const permissions = this.getPermissionList(context);
        const {bannedMap={}} = context;
        const {checkedLevel} = this.props;
        if(checkedLevel !== "root"){
            const length = permissions.length;
            let i=1;
            let next = bannedMap;
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
            return bannedMap[permissions[0]];
        }
    };
    private getChildren(type:ControlType,style:React.CSSProperties){
        const {children} = this.props;
        return React.Children.map(children,((child)=>{
            if(React.isValidElement(child)){
                const disabled = type==="disabled";
                return React.cloneElement(child,{
                    ...child.props,
                    disabled,
                    style:{
                        ...child.props?.style,
                        ...style
                    }
                },child.props?.children);
            }else{
                return <span style={style}>{child}</span>;
            }
        })) as unknown as ReactElement;
    }
    render() {
        const {children,fallback,style:extraStyle} = this.props;
        return (
            <PermissionReceiver>
                {
                    (context) => {
                        const config = this.getPermissionItem(context);
                        if(config){
                            const {active = true,style,type = "render",children:childrenList} = config;// 是否有children,如果有则表示表示是过渡节点，拥有权限权限
                            if(active === true && !childrenList){
                                if(fallback){
                                    return fallback();
                                }
                                switch (type) {
                                    case "render":
                                        return null;
                                    case "display":
                                        return this.getChildren(type,{...style,...extraStyle,display:"none"})||null;
                                    case "visibility":
                                        return this.getChildren(type,{...style,...extraStyle,visibility:"hidden"})||null;
                                    case "disabled":
                                    case "none":
                                    default:
                                        return this.getChildren(type,{...style,...extraStyle})||null;
                                }
                            }
                        }
                        return children;
                    }
                }
            </PermissionReceiver>
        )
    }
}

export {Permission};

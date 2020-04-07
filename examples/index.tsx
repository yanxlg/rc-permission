/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import {Permission} from "../src";
import PermissionProvider, {PermissionBannedMap} from "../src/PermissionProvider";


class Test extends React.Component<{},{}>{
    render(){
        return (
            <PermissionProvider bannedMap={{
                "pageName1": {
                    children:{
                        "container1": {
                            type:"none",
                            style:{
                                backgroundColor:"red"
                            }
                        },
                        "container2": {
                        }
                    }
                },
                "pageName2": {
                },
                "pageName3": {
                    children:{
                        "action1": {
                            "type": "visibility",
                        }
                    }
                }
            } as PermissionBannedMap}>
                <div>
                    dsads
                    <Permission pid="pageName1">
                        <div>
                            111
                            <div>
                                2222
                            </div>
                            <Permission pid="container1">
                                <div>
                                    3333
                                </div>
                            </Permission>
                        </div>
                    </Permission>
                </div>
            </PermissionProvider>
        )
    }
}

ReactDOM.render(
    <div>
        <Test/>
    </div>,
    document.getElementById('__react-content'),
);

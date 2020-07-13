/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import PermissionComponent from "../src/ComponentPermission";
import PermissionProvider, { IPermissionTree } from "../src/Provider";
import { Tooltip } from "antd";
import "antd/es/tooltip/style/index.css";
import RouterPermission from "../src/RouterPermission";
import { Permission } from "../src/decorator";
const toolTip = <Tooltip title="" />;

@Permission({ pid: "2222" })
class B extends React.PureComponent<{ text: string }, any> {
    render() {
        return <div style={this.props.style}>{this.props.text}sadasdsa</div>;
    }
}

class Test extends React.Component<{}, {}> {
    componentDidMount() {
        // @ts-ignore
    }

    render() {
        return (
            <PermissionProvider
                pTree={
                    {
                        "111": {
                            children: {
                                "2222": {
                                    access: false,
                                    styles: {
                                        active: {
                                            backgroundColor: "red"
                                        },
                                        inActive: {
                                            backgroundColor: "green"
                                        }
                                    }
                                }
                            }
                        }
                    } as IPermissionTree
                }
            >
                <div>
                    dsads
                    <PermissionComponent pid={"111"}>
                        <div>
                            <PermissionComponent pid={"2222"} toolTipWrap={toolTip} toolTip={"我是提示信息"}>
                                <div>122</div>
                            </PermissionComponent>
                            <B text="yyyyyyy" />
                        </div>
                    </PermissionComponent>
                </div>
            </PermissionProvider>
        );
    }
}

ReactDOM.render(
    <div>
        <Test />
    </div>,
    document.getElementById("__react-content")
);

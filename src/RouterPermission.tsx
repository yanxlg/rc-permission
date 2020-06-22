// router权限校验
import React, { PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { Context } from "./Provider";
import assert from "assert";
import * as H from "history";
import { getOwner } from "./ReactInstanceMap";
import { checkPermission, getPidList } from "./ComponentPermission";

export declare interface IRouterPermission {
    login?: boolean; // 是否需要登录
    history?: H.History;
    pid: string;
}

const RouterPermission: React.FC<IRouterPermission> = ({ login, pid, history, children }) => {
    // 是否登录，是否拥有该页面权限，可能是子页面
    const context = useContext(Context);
    const { checkLogin, format, pTree, Page_403 } = context;
    if (login) {
        assert(checkLogin, "login check require checkLogin function.");
        const isLogin = checkLogin?.();
        if (!isLogin) {
            assert(history || context.history, "redirect must have history property.");
            // 未登录
            (history || context.history)?.replace("/login"); // 跳转登录，登录页面支持重定向
            return null;
        }
    }
    // 判断路由权限
    const owner = getOwner();
    const pidList = useMemo(() => getPidList(owner, format, pid), []);
    const check = useMemo(() => checkPermission(pidList, pTree), [pTree]);

    const goHome = useCallback(() => {
        (history || context.history)?.replace("/");
    }, []);

    if (check === true || (typeof check === "object" && check.access !== false)) {
        return <>{children}</>;
    } else {
        return Page_403 ? (
            <>{Page_403}</>
        ) : (
            <div>
                <div style={{ textAlign: "center", color: "rgba(0,0,0,.85)", fontSize: 24, lineHeight: 1.8 }}>403</div>
                <div
                    style={{
                        color: "rgba(0,0,0,.45)",
                        fontSize: 14,
                        lineHeight: 1.6,
                        textAlign: "center"
                    }}
                >
                    Sorry, you don't have access to this page.
                </div>
                <div style={{ textAlign: "center" }}>
                    <button
                        onClick={goHome}
                        style={{
                            color: "#fff",
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            textShadow: "0 -1px 0 rgba(0,0,0,.12)",
                            boxShadow: "0 2px 0 rgba(0,0,0,.045)",
                            textAlign: "center",
                            cursor: "pointer",
                            height: 32,
                            padding: "4px 15px",
                            fontSize: 14,
                            borderRadius: 2,
                            border: "1px solid #d9d9d9",
                            outline: "none"
                        }}
                    >
                        Back to home
                    </button>
                </div>
            </div>
        );
    }
};

export default React.memo<PropsWithChildren<IRouterPermission>>(RouterPermission);

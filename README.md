## 权限组件

## 前言
在大型网站中，不管是前台还是后台都涉及到用户权限，不同权限用户页面显示不一样，目前在React中通常的做法是需要权限控制的组件，每个组件一个固定的Id，Id命名规范可随意（`建议层级化`），在页面初始化或者服务端渲染时调用接口获取权限列表，该列表是`banedList`，是所有无权限组件ID集合，代码中根据匹配权限列表结果来控制显示结果。此种方法略显复杂，不够通用，且在权限表特别大时ID会出现很多冗余字符串，增加了网络开销，并且ID设计太过扁平化，不能更好的控制组件的显示方式，例如是控制disable还是visible或者display.

## 设计
- 权限数据：`json化`（支持多种显示方式，便于扩展）
```json
{
  "pageName1": {
      "container1": {
          "component1": {
              "action1": true
          },
      },
      "container2": true
  },
  "pageName2": true,
  "pageName3": {
    "action1": {
        "prop": "visibility",
        "style": {}
    }
  }
}
```
Interface：
```typescript
    type IPermissionControlProps = {
        prop?:"visibility"|"disable"|"display";
        style?:React.CSSProperties;
    }
    type IPermissionChildren = {
        [K in Exclude<string,"prop"|"style">]?: IPermissionJSON
    }
    type IPermissionJSON = true|(IPermissionControlProps&IPermissionChildren);
```

## 使用
在需要进行权限控制的组件上Wrap一个`Permission`组件，配置其`pId`，并将权限JSON传递给`PermissionProvider`,同时可以设置pid是层级模式还是扁平模式


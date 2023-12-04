import type { RouteRecordRaw } from "vue-router";
// 定义小仓库数据state类型
export interface UserState {
    token:string|null;
    menuRoutes:RouteRecordRaw[],
    username:string,
    avatar:string
}
// 定义分类仓库state对象的ts类型
export interface CategoryState{
    c1Id:string|number,
    c1Arr:[],
    c2Id:string|number,
    c2Arr:[],
    c3Id:string|number,
    c3Arr:[],
    allArr:[]
}
export interface AllData{ 
    "code": number|string,
    "message":string,
    "data": [{
        "id": number,
        "createTime": null,
        "updateTime": null,
        "attrName": string,
        "categoryId": number,
        "categoryLevel": number,
        "attrValueList": [
            {
                "id": number,
                "createTime": null,
                "updateTime": null,
                "valueName": string,
                "attrId": number
            },
        ]
    }]
    "ok": boolean
}
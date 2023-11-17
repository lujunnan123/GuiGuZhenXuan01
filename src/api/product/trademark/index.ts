import request from "@/utils/request";
import { trademark, trademarkResData } from "./type";
enum API{
    TRADEMARK_URL="/admin/product/baseTrademark",
    ADDTADEMARK = "/admin/product/baseTrademark/save",
    EDITTADEMARK = "/admin/product/baseTrademark/update"
}
// 获取已有品牌的信息
export const reqHasTrademark = (page:number,limit:number)=>request.get<any,trademarkResData>(API.TRADEMARK_URL+`/${page}/${limit}`)
// 新增/修改品牌信息
export const reqAddTrademark = (data:trademark)=>{
    if (data.id) {
        // 修改对应id数据
        return request.put<any,any>(API.EDITTADEMARK,data);
    }else{
        // 新增数据
        return request.post<any,any>(API.ADDTADEMARK,data);
    }
}

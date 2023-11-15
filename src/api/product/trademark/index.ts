import request from "@/utils/request";
import { trademarkResData } from "./type";
enum API{
    TRADEMARTK_URL="/admin/product/baseTrademark"
}
// 获取已有品牌的信息
export const reqHasTrademark = (page:number,limit:number)=>request.get<any,trademarkResData>(API.TRADEMARTK_URL+`/${page}/${limit}`)
import request from "@/utils/request";
import { CategoryResponse } from "./type";
enum API {
    GETC1_URL="/admin/product/getCategory1",
    GETC2_URL="/admin/product/getCategory2/",
    GETC3_URL="/admin/product/getCategory2/"
}
// 获取一级分类列表接口
export const reqC1 = ()=>request.get<any,CategoryResponse>(API.GETC1_URL);
// 获取二级分类列表接口 
export const reqC2 = (category1Id:number|string)=>request.get<any,CategoryResponse>(API.GETC2_URL+category1Id)
// 获取三级分类列表接口 
export const reqC3 = (category2Id:number|string)=>request.get<any,CategoryResponse>(API.GETC3_URL+category2Id)
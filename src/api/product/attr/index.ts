import request from "@/utils/request";
enum API {
    GETC1_URL="/admin/product/getCategory1"
}
export const reqC1 = ()=>request.get(API.GETC1_URL)
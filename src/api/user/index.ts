// 统一管理项目用户相关的接口
import request from '@/utils/request'
import { Attr, loginFormData, loginResponseData, userInfoResponseData } from './type';

// 统一管理接口
enum API{
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout",
    ADDORUPDATAATTR_URL="/admin/product/saveAttrInfo"
}
// 登录接口方法
export const reqLogin = (data:loginFormData) => request.post<any,loginResponseData>(API.LOGIN_URL,data);
// 获取用户信息接口方法
export const reqUserInfo = ()=>request.get<any,userInfoResponseData>(API.USERINFO_URL);
// 退出登录post
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)
// 新增or修改属性方法
export const reqAddOrUpdata = (data:Attr)=>{
    request.post<any,any>(API.ADDORUPDATAATTR_URL,data)
}
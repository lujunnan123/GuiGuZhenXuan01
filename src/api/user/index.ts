// 统一管理项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API{
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}
// 登录接口方法
export const reqLogin = (data:any) => request.post<any,any>(API.LOGIN_URL,data);
// 获取用户信息接口方法
export const reqUserInfo = ()=>request.get<any,any>(API.USERINFO_URL);
// 退出登录post
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)
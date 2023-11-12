export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
// 用户登录接口携带参数的ts数据类型
export interface loginFormData{
    username:string,
    password:string
}
// 定义登录接口返回的数据类型
export interface loginResponseData extends ResponseData{
    data:string
}
// 定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData{
     data:{
        avatar:string,
        buttons:string[],
        roles:string[],
        routes:string[],
        name:string
     }                                                                
}
// 登录接口 需要携带参数数据类型
export interface loginForm{
    username:string,
    password:string
}

interface dataType{
    token?:string,
    message?:string
}
// 登录接口返回数据类型
export interface loginResponseData{
    code:number,
    data:dataType
}
interface userinfo{
    userId:number,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:string[],
    buttons:string[],
    routers:string[],
    token:string
}
interface user{
    checkUser:userinfo
}
// 服务器返回用户信息相关的数据类型
export interface userResponseData{
    code:number,
    data:user
}
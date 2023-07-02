// 登录接口 需要携带参数数据类型
export interface loginForm{
    username:String,
    password:String
}

interface dataType{
    token:String
}
// 登录接口返回数据类型
export interface loginResponseData{
    code:number,
    data:dataType
}
interface userinfo{
    userId:number,
    avatar:String,
    username:String,
    password:String,
    desc:String,
    roles:String[],
    buttons:String[],
    routers:String[],
    token:String
}
interface user{
    checkUser:userinfo
}
// 服务器返回用户信息相关的数据类型
export interface userResponseData{
    code:number,
    data:user
}
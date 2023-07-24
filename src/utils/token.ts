// 封装本地存储数据与读取数据方法
export const SET_TOKEN = (token:string)=>{
    localStorage.setItem("TOKEN",token)
}
export const GET_TOKEN = ()=>{
    return localStorage.getItem('TOKEN');
}
// 封装本地存储数据删除方法
export const REMOVE_TOKEN = ()=>{
    return  localStorage.removeItem('TOKEN');
}
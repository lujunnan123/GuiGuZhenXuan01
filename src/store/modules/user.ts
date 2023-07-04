// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入数据类型
import {loginForm} from "@/api/user/type"
// 引入接口
import { reqLogin } from "@/api/user";
// 创建用户小仓库
let useUserStore = defineStore('User',{
    // 存储数据地方
    state:()=>{
        return {
            token:localStorage.getItem("TOKEN"),// 用户唯一标识
        }
    },
    // 异步|逻辑地方
    actions:{
        // 用户登录的方法
        async userLogin(data:loginForm){
            let result:any = await reqLogin(data);   
            // 登录成功：200 -> token
            // 登录失败：201 -> 显示登录失败信息
            if(result.code == 200){
                // pinia存储一下token
                // 由于pinia|vuex存储数据其实利用的是js对象（js对象存储数据并非持久化）
                this.token = result.data.token;
                // 因此还需利用localStorage进行本地存储
                localStorage.setItem("TOKEN",result.data.token)   
            }else{
                // 请求失败，则返回一个失败的promise
                return Promise.reject(new Error(result.data.message))
            }                   
        }
    },
    getters:{

    }
})
// 对外暴露获取小仓库的方法
export default useUserStore;
// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入数据类型
import type {UserState} from "./types/type"
// 引入接口
import { reqLogin,reqUserInfo,reqLogout } from "@/api/user";
// 引入操作存储本地数据工具方法
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from "@/utils/token";
// 引入路由(常量路由)
import { constantRoute } from "@/router/routes";
import { loginFormData, loginResponseData, userInfoResponseData } from "@/api/user/type";
// 创建用户小仓库
let useUserStore = defineStore('User',{
    // 存储数据地方
    state:():UserState => {
        return {
            token:GET_TOKEN(),// 用户唯一标识
            menuRoutes:constantRoute,
            username:'',
            avatar:''
        }
    },
    // 异步|逻辑地方
    actions:{
        // 用户登录的方法
        async userLogin(data:loginFormData){
            let result:loginResponseData = await reqLogin(data);   
            console.log(result);            
            // 登录成功：200 -> token
            // 登录失败：201 -> 显示登录失败信息
            if(result.code == 200){
                // pinia存储一下token
                // 由于pinia|vuex存储数据其实利用的是js对象（js对象存储数据并非持久化）
                this.token = (result.data as string);
                // 因此还需利用localStorage进行本地存储
                SET_TOKEN(result.data as string);  
            }else{
                // 请求失败，则返回一个失败的promise
                return Promise.reject(new Error(result.message))
            }                   
        },
        // 获取用户信息的方法
        async userInfo(){
           let result:userInfoResponseData = await reqUserInfo();
           // 如果获取用户信息成功，存储一下用户信息
           if(result.code == 200){
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                return 'ok'
           }else{
                return Promise.reject(result.message);
           }
            
        },
        // 退出登录
        uesrLogout(){
            this.username = '';
            this.avatar = '';
            this.token = '';
            REMOVE_TOKEN();
        }
    },
    getters:{

    }
})
// 对外暴露获取小仓库的方法
export default useUserStore;
// 关于 layout组件 相关配置仓库
import { defineStore } from "pinia";
let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return {
            fold:false, //用于控制菜单折叠还是收起控制
        }
    }
})
export default useLayOutSettingStore;
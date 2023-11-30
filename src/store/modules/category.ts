import { defineStore } from "pinia";
import { reqC1 } from "@/api/product/attr";
// 关于 category组件  的相关配置仓库
let useCategoryStore = defineStore('CategoryStore',{
    state:()=> {
        return {
            // 存储一级分类数据
            c1Arr:[],
            // 存储一级分类id
            c1Id:''
        }
    },
    actions:{
        // 获取一级分类方法
        async getC1 (){
            let result:any = await reqC1();
            if(result.code == 200){
                this.c1Arr=result.data;
            }
            
        }
    }
})
export default useCategoryStore;
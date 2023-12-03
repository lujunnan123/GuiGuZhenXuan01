import { defineStore } from "pinia";
import { reqAll, reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { CategoryResponse } from "@/api/product/attr/type";
import { CategoryState } from "./types/type";
// 关于 category组件  的相关配置仓库
let useCategoryStore = defineStore('CategoryStore',{
    state:():CategoryState=> {
        return {
            // 存储一级分类数据
            c1Arr:[],
            // 存储一级分类id
            c1Id:'',
            // 存储二级分类数据
            c2Arr:[],
            // 存储二级分类id
            c2Id:'',
            // 存储三级分类数据
            c3Arr:[],
            // 存储三级分类id
            c3Id:'',
            allArr:[]
        }
    },
    actions:{
        // 获取一级分类方法
        async getC1 (){
            let result:CategoryResponse = await reqC1();
            if(result.code == 200){
                this.c1Arr=result.data;
            }            
        },
        // 获取二级分类列表的方法
        async getC2(){
            let result:CategoryResponse = await reqC2(this.c1Id);
            if(result.code == 200){
                this.c2Arr = result.data;
            }            
        },
        // 获取三级分类列表的方法
        async getC3(){
            let result:CategoryResponse = await reqC3(this.c2Id);
            if(result.code == 200){
                this.c3Arr = result.data;
            }            
        },
        // 获取分类筛选后的数据
        async getAllData(){
            let result:any = await reqAll(this.c1Id,this.c2Id,this.c3Id)
            if(result.code == 200){
                this.allArr = result.data
            }
            
        }

    }
})
export default useCategoryStore;

function reqALl() {
    throw new Error("Function not implemented.");
}

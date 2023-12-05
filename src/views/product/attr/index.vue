<template>
    <div>
        <Category :sence="sence" />
        <el-card  v-if="sence==0" shadow="always" :body-style="{ padding: '20px' }" style="margin:10px">
            <div slot="header">
                <el-button type="primary" size="default" icon="Plus" @click="addAttr" :disabled="categoryStore.c3Id?false:true">添加平台属性</el-button>
            </div>
            <el-table border style="margin:10px 0" :data="categoryStore.allArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName"> </el-table-column>
                <el-table-column label="属性值名称" >
                    <template #="{row,$index}">
                        <el-tag style="margin: 2px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </template>    
                </el-table-column>
                <el-table-column label="操作"  width="120px">
                    <template #="{row,$index}">
                        <el-button type="primary" size="small" icon="Edit" @click="updata"></el-button>
                        <el-button type="primary" size="small" icon="Delete" @click=""></el-button>
                    </template> 
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加属性展示 -->
        <el-card v-if="sence == 1" shadow="always" :body-style="{ padding: '20px' }" style="margin:10px">
            <div slot="header">
                <div style="margin: 15px 0;">
                    <span>属性名称</span>
                    <el-input style="width: 200px;margin-left: 10px;" placeholder="请输入属性名" size="normal" clearable @change=""></el-input>
                </div>
                <el-button type="primary" size="default" icon="Plus" @click="addAttr" :disabled="categoryStore.c3Id?false:true">添加平台属性</el-button>
                <el-button  size="default"  @click="cancel">取消</el-button>
            </div>             
            <el-table border stripe :data="categoryStore.allArr" style="margin: 10px 0;">
                <el-table-column label="序号" type="index" align="center" width="80" ></el-table-column>
                <el-table-column label="属性值" prop="attrName">
                    <template #="{row,$index}">
                        <el-tag style="margin: 2px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </template>    
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template #="{row ,$index}">                        
                        <el-button type="danger" size="small" @click="" icon="Delete"></el-button>                        
                    </template>    
                </el-table-column>
            </el-table>
            <div>
                <el-button type="primary" size="default" @click="">保存</el-button>
                <el-button  size="default" @click="cancel">取消</el-button>                
            </div>
        </el-card>
        
        
    </div>
</template>

<script setup lang="ts">
// 获取分类仓库
import useCategoryStore from '@/store/modules/category';
import { reactive, ref } from 'vue';
import { Attr } from '@/api/user/type';
let categoryStore = useCategoryStore();
// 场景切换变量
let sence = ref<number>(0);
//收集新增的属性的数据
let attrParams = reactive<Attr>({
    attrName:"",// 新增的属性名字
    attrValueList:[],// 新增的属性值数组
    categoryId:0,// 三级分类ID
    categoryLevel:0,// 代表是三级分类
})
// 添加属性按钮回调
const addAttr =()=>{
    sence.value = 1
}
// 编辑按钮回调
const updata = ()=>{
    sence.value = 1
}
// 取消按钮回调
const cancel = ()=>{
    sence.value = 0
}
</script>

<style scoped lang="scss"></style>
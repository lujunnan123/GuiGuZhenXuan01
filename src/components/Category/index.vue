<template>
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin:20px 10px">
        <el-form inline="true">
            <el-form-item label="一级分类" size="normal">
                <!-- value即为select下拉选择的数据 -->
                <el-select :disabled="sence==0?false:true" v-model="categoryStore.c1Id" @change="handle">
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" size="normal">
                <el-select :disabled="sence==0?false:true" v-model="categoryStore.c2Id" @change="handle2">
                    <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" size="normal">
                <el-select :disabled="sence==0?false:true" v-model="categoryStore.c3Id" @change="handle3">
                    <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
// 引入分类数据相关仓库
import useCategoryStore from '@/store/modules/category';
import { onMounted } from 'vue';
let categoryStore = useCategoryStore();
// 组件加载完毕后，通知仓库发请求
onMounted(() => {
  getC1()  
})
// 通知仓库获取一级分类数据
const getC1 = ()=>{
    categoryStore.getC1();
}
// 当一级选项发生变化时函数回调（即获取到了二级分类列表发请求的参数id）
const handle = ()=>{
    // 清空二三级分类数据
    categoryStore.c2Arr=[];
    categoryStore.c2Id = '';
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';
    
    categoryStore.getC2();
}
// 当二级选项发生变化时函数回调（即获取到了三级分类列表发请求的参数id）
const handle2 = ()=>{
    // 清空二三级分类数据
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';    
    categoryStore.getC3();
}
// 当三级select组件选项发生变化时函数回调（即获取到了所有分类列表发请求的参数id）
const handle3 = ()=>{
    categoryStore.getAllData()
}
// 获取父组件传入的参数
defineProps(['sence'])
</script>

<style scoped></style>
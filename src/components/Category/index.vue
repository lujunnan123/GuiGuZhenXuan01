<template>
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin:20px 10px">
        <el-form inline="true">
            <el-form-item label="一级分类" size="normal">
                <!-- value即为select下拉选择的数据 -->
                <el-select v-model="categoryStore.c1Id">
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" size="normal">
                <el-select value-key="" placeholder="" clearable filterable @change="">
                    <el-option>ALL</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" size="normal">
                <el-select value-key="" placeholder="" clearable filterable @change="">
                    <el-option>ALL</el-option>
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
</script>

<style scoped></style>
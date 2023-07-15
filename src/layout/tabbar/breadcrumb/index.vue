<template>
    <el-icon style="margin-right: 20px;" @click="changeIcon">
        <component :is="LayoutSettingStore.fold?'Fold':'Expand'"></component>
        <!-- <Expand /> -->
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">

import { ArrowRight } from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting'
// 获取layout配置相关的仓库
let LayoutSettingStore = useLayOutSettingStore();

// 点击图标方法
const changeIcon = ()=>{
    // 图标切换
    LayoutSettingStore.fold = !LayoutSettingStore.fold ;
}
</script>
<script lang="ts">
export default {
    name: 'Breadcrumb'
}
</script>
<style scoped></style>
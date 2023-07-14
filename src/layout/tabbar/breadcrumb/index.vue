<template>
    <el-icon style="margin-right: 20px;">
        <Expand />
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">

import { ArrowRight } from '@element-plus/icons-vue'
</script>

<style scoped></style>
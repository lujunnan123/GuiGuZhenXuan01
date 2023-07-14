<template>
    <el-button type="primary" icon="Refresh" circle />
    <el-button type="primary" icon="FullScreen" circle />
    <el-button type="primary" icon="Setting" circle />
    <img src="../../../../public/vite.svg" alt="" style="width:24px;height:24px;margin:0 10px;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
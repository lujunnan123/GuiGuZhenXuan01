<template>
    <el-button type="primary" icon="Refresh" circle @click="updateRef" />
    <el-button type="primary" icon="FullScreen" circle @click="fullScreen" />
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
import useLayOutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayOutSettingStore();
// 刷新按钮点击回调
const updateRef = ()=>{
    layoutSettingStore.refsh = !layoutSettingStore.refsh;
}
// 全屏按钮点击回调
const fullScreen = ()=>{
    // DOM对象的一个属性：可以用来判断当前是不是全屏模式【全部：返回true；不是全屏：放回false】
    let full = document.fullscreenElement;
    if(!full){
        // 切换为全屏模式
        document.documentElement.requestFullscreen();
    }else{
        // 退出全屏模式
        document.exitFullscreen();
    }
}
</script>

<script lang="ts">
export default {
    name: 'Setting'
}
</script>
<style scoped></style>
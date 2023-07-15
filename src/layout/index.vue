<template>
    <div>
        <div class="layout_container">
            <!-- 左侧菜单 -->
            <div class="layout_slider" :class="{fold:LayoutSettingStore.fold?true:false}">
                <Logo />
                <!-- 展示菜单 -->
                <el-scrollbar  class="scrollbar">
                    <el-menu :collapse="LayoutSettingStore.fold" class="el-menu" background-color="#001529" text-color="#fff" :default-active="$route.path">
                        <Menu :menuList="userStore.menuRoutes"></Menu>
                    </el-menu>
                </el-scrollbar>

            </div>
            <!-- 顶部导航 -->
            <div class="layout_tabble"  :class="{fold:LayoutSettingStore.fold?true:false}">
                <Tabbar></Tabbar>
            </div>
            <!-- 内容展示区 -->
            <div class="layout_main" :class="{fold:LayoutSettingStore.fold?true:false}">
                <Main></Main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

// 引入左侧菜单logo子组件
import Logo from './logo/index.vue';
// 引入左侧菜单列表
import Menu from './menu/index.vue';
// 引入右侧主体内容
import Main from './main/index.vue';
// 引入顶部栏
import Tabbar from './tabbar/index.vue';

// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
import { useRoute } from 'vue-router';

import useLayOutSettingStore from '@/store/modules/setting';
let LayoutSettingStore = useLayOutSettingStore()


let $route = useRoute()
let userStore = useUserStore();

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        background: $base-menu-background;
        width: $base-menu-width;
        height: 100vh;
        color: white;
        transition: all 0.3s;
        &.fold{
            width: $base-menu-min-width;
        }

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabble {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        color: #000000;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        &.fold{
            width:calc(100vw - $base-menu-min-width);
            left:$base-menu-min-width ;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background: green;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        &.fold{
            width:calc(100vw - $base-menu-min-width);
            left:$base-menu-min-width ;
            transition:all 0.3s;
        }
    }
}
</style>
<script lang="ts">
export default {
    name: 'Layout'
}
</script>
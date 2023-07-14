<template>
    <div>
        <div class="layout_container">
            <!-- 左侧菜单 -->
            <div class="layout_slider">
                <Logo />
                <!-- 展示菜单 -->
                <el-scrollbar class="scrollbar">
                    <el-menu class="el-menu" background-color="#001529" text-color="#fff" :default-active="$route.path">
                        <Menu :menuList="userStore.menuRoutes"></Menu>
                    </el-menu>
                </el-scrollbar>

            </div>
            <!-- 顶部导航 -->
            <div class="layout_tabble">
                <Tabbar></Tabbar>
            </div>
            <!-- 内容展示区 -->
            <div class="layout_main">
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
    }
}
</style>
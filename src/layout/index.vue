<template>
    <div>
        <div class="layout_container">
            <!-- 左侧菜单 -->
            <div class="layout_slider">
                <Logo />
                <!-- 展示菜单 -->
                <scrollbar class="scrollbar">
                    <el-menu class="el-menu" background-color="#001529" text-color="#fff" active-text-color>
                        <Menu :menuList="userStore.menuRoutes"></Menu>
                    </el-menu>
                </scrollbar>

            </div>
            <!-- 顶部导航 -->
            <div class="layout_tabble">
                2!!!
            </div>
            <!-- 内容展示区 -->
            <div class="layout_main">3###</div>
        </div>
    </div>
</template>

<script setup lang="ts">

// 引入左侧菜单logo子组件
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';

// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();

</script>

<style scoped lang="scss">
.layout_container {
    background: yellow;
    width: 100%;
    height: 100vh;
    color: white;

    .layout_slider {
        background: $base-menu-background;
        width: $base-menu-width;
        height: 100vh;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu{
                border-right: none;
            }
        }
    }

    .layout_tabble {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        background: blue;
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
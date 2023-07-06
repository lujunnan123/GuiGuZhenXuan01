<template>
    <div>
        <div class="layout_container">
            <!-- 左侧菜单 -->
            <div class="layout_slider">
                1@@@
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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped lang="scss">
    .layout_container{
        background: yellow;
        width: 100%;
        height: 100vh;
        .layout_slider{
            background: $base-menu-background;
            width: $base-menu-width;
            height: 100vh;
        }
        .layout_tabble{           
            position: fixed;
            top: 0;
            left: $base-menu-width; 
            background: blue;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
        }
        .layout_main{
            position: absolute;
            width: calc(100% - $base-menu-width);
            height:calc(100vh - $base-tabbar-height);
            background: green;
            left: $base-menu-width; 
            top: $base-tabbar-height;
            padding: 20px;
            overflow: auto;
        }
    }
</style>
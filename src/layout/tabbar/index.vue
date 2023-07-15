<template>
    <div class="contain">
        <!-- 顶部左侧静态 -->
        <div class="bar_left">
            <Breadcrumb/>
        </div>
        <!-- 顶部右侧按钮 -->
        <div class="bar_right">
           <Setting/>
        </div>
    </div>
</template>

<script setup lang="ts">

import Breadcrumb from './breadcrumb/index.vue';
import Setting from './setting/index.vue';
</script>
<script lang="ts">
export default {
    name: 'Tabbar'
}
</script>
<style scoped lang="scss">
.contain {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 10px rgb(0, 0, 0);

    .bar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .bar_right{
        display:flex;
        align-items:center;
    }

}
</style>
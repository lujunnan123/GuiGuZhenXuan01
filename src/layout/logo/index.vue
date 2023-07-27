<template>
    <div class="logo" >
        <img  :src="setting.logo" alt="">
        <p>{{setting.title}}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo{
    width:100%;
    height:$base-menu-logo-height;
    display:flex;
    align-items:center;
    color:white;
    margin-left: 5px;
    img{
        width:40px;
        height:40px;
    }
    p{
        margin-left:10px;
        font-size:$base-menu-title-size;
    }
}
</style>
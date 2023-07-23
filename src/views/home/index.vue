<template>
    <div>
        <h1>我是一级路由-登录成功后的数据</h1>
    </div>
</template>

<script lang="ts" setup>
// 引入组合式API函数 生命周期函数
import { onMounted } from 'vue';
// 引入仓库
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
// 首页挂载完毕发送请求 获取用户信息
onMounted(() => {
    useStore.userInfo()
})

</script>

<style scoped>

</style>
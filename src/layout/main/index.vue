<template>
    <div >
        <transition>
            <!-- <router-view></router-view> -->
            <router-view v-slot="{Component}">
                <transition name="fade">
                    <component :is="Component" v-if="flag"></component>
                </transition>
            </router-view>
        </transition>
    </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { nextTick, ref, watch } from 'vue';
let layoutSettingStore  = useLayOutSettingStore();

// 控制当前组件是否销毁重建
let flag = ref(true);

// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(()=>layoutSettingStore.refsh,()=>{
    console.log('123');
    // 点击刷新按钮：路由组件销毁
    flag.value = false;
    nextTick(()=>{
        flag.value = true
    })
})
</script>

<style lang="scss" scoped>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
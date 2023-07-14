<template>
    <template v-for="(item) in menuList" :key="item.path">
        <!-- 情况一：没有子路由 -->
        <el-menu-item :index="item.path" v-if="!item.children && !item.meta.hidden" @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 情况二：有且仅有一个子路由 -->
        <el-menu-item :index="item.path" v-if="item.children && item.children.length == 1 && !item.meta.hidden"
            :key="item.children[0].path" @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>
                    {{ item.children[0].meta.title }}
                </span>
            </template>
        </el-menu-item>
        <!-- 情况三：有一个以上的子路由 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1 && !item.meta.hidden"
            @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>
                    {{ item.meta.title }}
                </span>
            </template>
            <Menu :menuList="item.children"></Menu>

        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
// 获取路由器对象
let $router = useRouter();

defineProps(['menuList'])
const goRoute = (vc: any) => {
    console.log(vc.index);
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped></style>
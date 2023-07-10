<template>
        <template v-for="(item, index) in menuList" :key="item.path">
            <!-- 情况一：没有子路由 -->
            <el-menu-item v-if="!item.children&&item.meta.hidden">
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 情况二：有且仅有一个子路由 -->
            <el-menu-item v-if="item.children&&item.children.length==1&&item.meta.hidden" :key="item.children[0].path">
                <template #title>
                    <span>
                        {{ item.children[0].meta.title }}
                    </span>
                </template>
            </el-menu-item>
            <!-- 情况三：有一个以上的子路由 -->
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1&&item.meta.hidden">
                <template #title>
                    <span>
                        {{ item.meta.title }}        
                    </span>
                </template>
                <Menu :menuList="item.children"></Menu>
                
            </el-sub-menu>
        </template>

</template>

<script setup lang="ts">
    defineProps(['menuList'])
</script>
<script lang="ts">
export desfault{
    name:'Menu'
}
</script>
<style scoped>

</style>
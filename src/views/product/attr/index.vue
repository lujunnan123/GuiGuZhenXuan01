<template>
    <div>
        <Category />
        <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin:10px">
            <div slot="header">
                <el-button type="primary" size="default" icon="Plus" @click="" :disabled="categoryStore.c3Id?false:true">添加平台属性</el-button>
            </div>
            <el-table border style="margin:10px 0" :data="categoryStore.allArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName"> </el-table-column>
                <el-table-column label="属性值名称" >
                    <template #="{row,$index}">
                        <el-tag style="margin: 2px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </template>    
                </el-table-column>
                <el-table-column label="操作"  width="120px">
                    <template #="{row,$indx}">
                        <el-button type="primary" size="small" icon="Edit" @click=""></el-button>
                        <el-button type="primary" size="small" icon="Delete" @click=""></el-button>
                        
                    </template> </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 获取分类仓库
import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore();
</script>

<style scoped lang="scss"></style>
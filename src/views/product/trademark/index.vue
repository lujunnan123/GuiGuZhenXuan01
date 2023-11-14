<template>
    <div class="trademark">
        <el-card class="box-card">
            <!-- 品牌添加按钮 -->
            <el-button type="primary" size="default" @click="" icon="Plus">添加商品</el-button>
            <!-- 表格组件：用于展示已有的平台数据 -->
            <el-table :data="tableData" border style="width: 100%;margin: 10px 0;">
                <el-table-column prop="date" label="序号" width="80px" align="center"/>
                <el-table-column prop="name" label="品牌名称" align="center" />
                <el-table-column prop="address" label="品牌LOGO" align="center" />
                <el-table-column  label="品牌操作" align="center">
                    <el-button type="success" size="small" @click="" icon="Edit"></el-button>
                    <el-button type="danger" size="small" @click="" icon="Delete"></el-button>                  
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="demo-pagination-block">
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
                    :page-sizes="[3, 6, 9, 12]"  background="true"
                    layout="prev, pager, next, jumper,->,sizes" :total="400" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// 定义该页面所需的变量
let pageNo = ref<number>(1);
let pageSize = ref<number>(3)
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
onMounted(() => {
    
})
</script>

<style scoped lang="scss">
.trademark{
    .box-card{
        margin: 20px;
    }
}
</style>
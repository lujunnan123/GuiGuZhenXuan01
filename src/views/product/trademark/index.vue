<template>
    <div class="trademark">
        <el-card class="box-card">
            <!-- 品牌添加按钮 -->
            <el-button type="primary" size="default" @click="" icon="Plus">添加商品</el-button>
            <!-- 表格组件：用于展示已有的平台数据 -->
            <el-table :data="trademarkArr" border style="width: 100%;margin: 10px 0;">
                <el-table-column prop="id" label="序号" width="80px" align="center"/>
                <el-table-column prop="tmName" label="品牌名称" align="center" />
                <el-table-column prop="address" label="品牌LOGO" align="center">
                    <!-- 什么时候使用插槽？展示内容为 非div结构 -->
                    <!-- <img :src="tableData.logoUrl" alt="" srcset=""> -->
                    <template #="{row,$index}">
                        <img :src="row.logoUrl" alt="" style="width:100px;height:100px;" >
                    </template>
                </el-table-column>
                <el-table-column  label="品牌操作" align="center">
                        <el-button type="success" size="small" @click="" icon="Edit"></el-button>
                        <el-button type="danger" size="small" @click="" icon="Delete"></el-button> 
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="demo-pagination-block">
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
                    :page-sizes="[3, 6, 9, 12]"  background="true"
                    layout="prev, pager, next, jumper,->,sizes" :total="total" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import {reqHasTrademark} from '@/api/product/trademark/index'
import { Records, trademarkResData } from '@/api/product/trademark/type';
// 定义该页面所需的变量
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0)
let trademarkArr = reactive<Records>([])
onMounted(() => {
    getHasTrademark()
})
const getHasTrademark = async()=>{
    let result:trademarkResData = await reqHasTrademark(pageNo.value,pageSize.value);
    if(result.code == 200){
        total.value = result.data.total
        trademarkArr = result.data.records
    }
}
</script>

<style scoped lang="scss">
.trademark{
    .box-card{
        margin: 20px;
    }
}
</style>
<template>
    <div>
        <Category />
        <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin:10px">
            <div slot="header">
                <el-button type="primary" size="default" icon="Plus" @click="">添加平台属性</el-button>
            </div>

            <el-table border style="margin:10px 0">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px"> </el-table-column>
                <el-table-column label="属性值名称" > </el-table-column>
                <el-table-column label="操作"  width="120px"> </el-table-column>
            </el-table>

        </el-card>


    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss"></style>
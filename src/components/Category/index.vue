<template>
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin:20px 10px">
        <el-form inline="true">
            <el-form-item label="一级分类" size="normal">
                <el-select value-key="" placeholder="" clearable filterable @change="">
                    <el-option>ALL</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" size="normal">
                <el-select value-key="" placeholder="" clearable filterable @change="">
                    <el-option>ALL</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" size="normal">
                <el-select value-key="" placeholder="" clearable filterable @change="">
                    <el-option>ALL</el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
<template>
    <div class="trademark">
        <el-card class="box-card">
            <!-- 品牌添加按钮 -->
            <el-button type="primary" size="default" @click="" icon="Plus">添加商品</el-button>
            <!-- 表格组件：用于展示已有的平台数据 -->
            <el-table :data="trademarkArr" border style="width: 100%;margin: 10px 0;">
                <el-table-column prop="id" label="序号" width="80px" align="center" />
                <el-table-column prop="tmName" label="品牌名称" align="center" />
                <el-table-column prop="address" label="品牌LOGO" align="center">
                    <!-- 什么时候使用插槽？展示内容为 非div结构 -->
                    <!-- <img :src="tableData.logoUrl" alt="" srcset=""> -->
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" alt="" style="width:100px;height:100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作" align="center">
                    <el-button type="success" size="small" @click="dialogVisible = true" icon="Edit"></el-button>
                    <el-button type="danger" size="small" @click="" icon="Delete"></el-button>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="demo-pagination-block">
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 6, 9, 12]"
                    background="true" layout="prev, pager, next, jumper,->,sizes" :total="total"
                    @current-change="changePageNo" @size-change="changePageSize" />
            </div>
            <!-- 对话框 -->
            <div class="dialog">

                <el-dialog v-model="dialogVisible" title="请上传">
                <el-form ref="form"  style="width:80%" :inline="false" size="normal"  > 
                    <el-form-item label="品牌名称" label-width="80px" >
                        <el-input placeholder="请输入品牌名称"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌LOGO" size="normal" >
                        <el-upload class="avatar-uploader"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img style="width: 100px;height:100px;" v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </template>

            </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { reqHasTrademark } from '@/api/product/trademark/index'
import { Records, trademarkResData } from '@/api/product/trademark/type';
// 定义该页面所需的变量
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0)
let trademarkArr = reactive<Records>([])
let dialogVisible = ref(false)
onMounted(() => {
    getHasTrademark()
})
// 获取已有品牌数据
const getHasTrademark = async (page = 1) => {
    pageNo.value = page;
    let result: trademarkResData = await reqHasTrademark(pageNo.value, pageSize.value);
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr = result.data.records
    }
}
// 分页器-页码发生变化
const changePageNo = (page: number) => {
    console.log(pageNo.value, pageSize.value);

    getHasTrademark(page);
}
// 分页器-数据size
const changePageSize = () => {
    getHasTrademark();
}
// 对话框-取消按钮
const cancel = ()=>{
    dialogVisible.value = false;
}
// 对话框-取消按钮
const onSubmit = ()=>{
    dialogVisible.value = false;
}
</script>

<style scoped lang="scss">
.trademark {
    .box-card {
        // margin: 20px;
        .dialog{
           
        }   
    }
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
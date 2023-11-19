<template>
    <div class="trademark">
        <el-card class="box-card">
            <!-- 品牌添加按钮 -->
            <el-button type="primary" size="default" @click="AddTrademark" icon="Plus">添加商品</el-button>
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
                    <template #="{ row, $index }">
                        <el-button type="success" size="small" @click="editRow(row)" icon="Edit"></el-button>
                        <el-button type="danger" size="small" @click="" icon="Delete"></el-button>
                    </template>
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

                <el-dialog v-model="dialogVisible" :title="trademarkParams.id?'修改':'新增'">
                    <el-form ref="form" style="width:80%" :inline="false" size="normal">
                        <el-form-item label="品牌名称" label-width="80px">
                            <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌LOGO" size="normal">
                            <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                                :show-file-list="false"  :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img style="width: 100px;height:100px;" v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
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
import { reqAddTrademark, reqHasTrademark } from '@/api/product/trademark/index'
import { Records, trademark, trademarkResData } from '@/api/product/trademark/type';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
// 定义该页面所需的变量
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0)
let trademarkArr = reactive<Records>([])
let trademarkParams = reactive<trademark>({
    "tmName": '',
    "logoUrl": ''
})
let dialogVisible = ref(false)
onMounted(() => {
    getHasTrademark()
})
// 修改按钮
const editRow = (row:trademark)=>{
    dialogVisible.value = true;
    trademarkParams =  Object.assign(trademarkParams,row)
    
}
// 添加按钮回调
const AddTrademark = ()=>{
    dialogVisible.value = true;
    // 清空对话框内容
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    trademarkParams.id = 0;
}
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
const cancel = () => {
    dialogVisible.value = false;
}
// 对话框-确定按钮
const onSubmit = async() => {
    let result:any =await reqAddTrademark(trademarkParams);
    if(result.code == 200){
        ElMessage({
            type:'success',
            message:trademarkParams.id?'修改图片成功':'添加图片成功'
        })
        // 重新获取数据 如果是修改，完成后留在当前页面；如果是新增，完成后回到第一页
        getHasTrademark(trademarkParams.id?pageNo.value:1);
    }else{
        ElMessage({
            type:'error',
            message:trademarkParams.id?'修改图片失败':'添加图片失败'
        })
    }
    dialogVisible.value = false;
    
}
// 对话框-上传文件-上传之前回调
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile:any) => {
    // 要求上传文件格式 png/jpg/gif 4M
    if (['image/png', 'image/jpeg', 'image/gif'].includes(rawFile.type)) {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: "文件超出上传限制"
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '文件格式不正确'
        })
        return false
    }
    console.log(rawFile);

}
// 对话框-上传文件-成功回调 ！！！！待解决！！！文件上传成功回调函数未执行
const handleAvatarSuccess: UploadProps['onSuccess'] = (response:any, uploadFile:any) => {
    // response:即为当前这次上传图片的额post请求服务器返回的数据
    // 收集上传图片的地址
    trademarkParams.logoUrl = response.data;    
} 



</script>

<style scoped lang="scss">
.trademark {
    .box-card {

        margin: 20px;
        .dialog {}
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
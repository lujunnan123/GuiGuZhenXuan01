<template>
    <div>
        <Category :sence="sence" />
        <el-card v-if="sence == 0" shadow="always" :body-style="{ padding: '20px' }" style="margin:10px">
            <div slot="header">
                <el-button type="primary" size="default" icon="Plus" @click="addAttr"
                    :disabled="categoryStore.c3Id ? false : true">添加平台属性</el-button>
            </div>
            <el-table border style="margin:10px 0" :data="categoryStore.allArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName"> </el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row, $index }">
                        <el-tag style="margin: 2px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{
                            item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Edit" @click="updata"></el-button>
                        <el-button type="primary" size="small" icon="Delete" @click=""></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加属性展示 -->
        <el-card v-if="sence == 1" shadow="always" :body-style="{ padding: '20px' }" style="margin:10px">
            <div slot="header">
                <div style="margin: 15px 0;">
                    <span>属性名称</span>
                    <el-input style="width: 200px;margin-left: 10px;" placeholder="请输入属性名" size="normal"
                        v-model="attrParams.attrName"></el-input>
                </div>
                <el-button type="primary" size="default" icon="Plus" @click="addAttrValue"
                    :disabled="!attrParams.attrName">添加属性值</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </div>
            <el-table border stripe :data="attrParams.attrValueList" style="margin: 10px 0;">
                <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                <el-table-column label="属性值" prop="attrName">
                    <template #="{ row, $index }">
                        <el-input v-if="row.flag" v-model="row.valueName" placeholder="请输入属性值名称" size="normal" clearable
                            @blur="inpBlur(row,$index)"></el-input>
                        <div v-else @click="toEdit(row)">{{ row.valueName }}</div>

                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template #="{ row, $index }">
                        <el-button type="danger" size="small" @click="" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 获取分类仓库
import useCategoryStore from '@/store/modules/category';
import {  reactive, ref } from 'vue';
import { Attr } from '@/api/user/type';
import { reqAddOrUpdata } from '@/api/user';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore();
// 场景切换变量
let sence = ref<number>(0);
//收集新增的属性的数据
let attrParams = reactive<Attr>({
    attrName: "",// 新增的属性名字
    attrValueList: [],// 新增的属性值数组
    categoryId: 0,// 三级分类ID
    categoryLevel: 0,// 代表是三级分类
})

// 添加属性按钮回调
const addAttr = () => {
    // 每一次进入场景，先清空一些数据再收集数据
    Object.assign(attrParams, {
        attrName: "",// 新增的属性名字
        attrValueList: [],// 新增的属性值数组
        categoryId: 0,// 三级分类ID
        categoryLevel: 0,// 代表是三级分类
    })
    // 切换场景
    sence.value = 1
    // 收集新增属性的三级分类id
    attrParams.categoryId = categoryStore.c3Id;
}
// 编辑按钮回调
const updata = () => {
    sence.value = 1
}
// 取消按钮回调
const cancel = () => {
    sence.value = 0
}
// 添加属性值回调
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag:true
    });
}
// 保存属性值回调
const save = async () => {
    let result: any = await reqAddOrUpdata(attrParams);
    if (result.code == 200 ) {
        // 场景切换
        sence.value = 0
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }

}
// 输入框失焦回调
const inpBlur = (rowinfo:any,index:number)=>{
    // 如果输入框内容为空，则提示用户 并且移除该条属性
    // 非法情况1：输入框为空
    if(rowinfo.valueName.trim()==''){
        attrParams.attrValueList.splice(index,1)
        ElMessage({
            type:'error',
            message:'属性值不能为空！'
        })
        return
    }
    // 非法情况2：属性值重复
    let repeat = attrParams.attrValueList.find((item) => {
        // ？切记把失去焦点属性值对象从当前数组中扣除在判断
        if(rowinfo!=item){            
            return item.valueName === rowinfo.valueName
        }
    })
    if(repeat){
        attrParams.attrValueList.splice(index,1)
        ElMessage({
            type:'error',
            message:'属性值不能重复！'
        })
        return
    }
    
    

    rowinfo.flag = false   
}
const toEdit = (rowinfo:any)=>{
    rowinfo.flag = true
}
</script>

<style scoped lang="scss"></style>
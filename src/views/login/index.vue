<template>
    <div class="loginbg">
        <el-row>
            <el-col :span="12" :xs="0">左侧占位</el-col>
            <el-col :span="12" xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password"  :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
let useStore = useUserStore();
// 收集账号与密码
let loginForm = reactive({username:'admin',password:'111111'})
// 获取路由器
let $router = useRouter();
// 定义变量控制按钮加载效果
let loading = ref(false);
// 登录按钮回调
const login = async ()=>{
    // 加载效果
    loading.value = true;
    // 点击按钮后
        // 通知仓库发登录请求
        // 请求成功->首页展示数据的地方
        // 请求失败-> 弹出登录失败信息
        try{
            loading.value = false
            // 保证登录成功
            await useStore.userLogin(loginForm);
            // 编程式导航，跳转到展示数据首页
            $router.push('/')
            // 登录成功提示信息
            ElNotification({
                type:'success',
                message:'登录成功'
            })
        }  catch(error){
            loading.value = false
            ElNotification({
                type:'error',
                message:(error as Error).message
            })
        }
}

</script>

<style lang="scss" scoped>
.loginbg {
    background: url('@/assets/images/background.jpg') no-repeat;
    width: 100%;
    height: 100vh;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;
        h1{
            color: #fff;
            font-size: 40px;
        }
        h2{
            color: #fff;
            font-size: 20px;
            padding: 10px 0;
        }
        .login_btn{
            width: 100%;
        }
    }
}
</style>
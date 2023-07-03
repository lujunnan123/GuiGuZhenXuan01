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
                        <el-button class="login_btn" type="primary" size="default" @click="">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue'
import { reactive } from 'vue';

// 收集账号与密码
let loginForm = reactive({username:'admin',password:'111111'})


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
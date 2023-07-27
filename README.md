# 硅谷甄选

[视频地址]: https://www.bilibili.com/video/BV1Xh411V7b5?p=1&amp;vd_source=2ccb7e5a1b69378347d040ab14ab1fea

**技术栈：Vue3+TS+Element Plus**

## 搭建后台管理系统

### 项目初始化

#### 项目配置

##### eslint配置

安装

```
pnpm i eslint -D
```

生成配置文件：eslint.cjs

```
npx eslint --init
```

###  项目集成

#### element plus 集成

安装element plus

 ``pnpm i element-plus``



安装 element 图标库 element icon

​	 ``pnpm i @element-plus/icons-vue``

导入：

```vue
<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
```

#### src别名修改

```tsx
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve("./src") // 相对路径别名的配置，使用@ 替代src
    }
  }
})

```

```json
// tsconfig.json
"compilerOptions": {
  	...
    "baseUrl": "./", // 解析非相对模块的基础地址，默认是当前目录
    "paths": {  // 路径映射，相对baseUrl
      "@/*":["src/*"]
    }
```

#### 环境变量的配置

开发环境（development）

开发使用的环境

测试环境（testing）

测试同时干活的环境

生产环境（production）

正式提供对外服务的



项目根目录分别添加 开发 测试 生产 环境的文件：

```
.env.development
.env.test
.env.production
```



#### SVG图标的配置

1.安装SVG依赖插件

```
pnpm install vite-plugin-svg-icons
```

2.在 vite.config.ts中配置插件

```
 pnpm install vite-plugin-svg-icons
```

3.修改vite.config.ts文件

```ts
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs:[path.resolve(process.cwd(),'src/assets/icons')],
      symbolId:'icon-[dir]-[name]',
    }),
    vue()
  ],
 ......
})
```

若报错：Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'fast-glob'

```
 pnpm install fast-glob -D
```

4.入口文件导入

```
// svg插件需要配置的代码
import 'virtual:svg-icons-register'
```

5.使用：

1. assets文件下新建icons文件并创建svg文件

2. 将复制到的svg代码复制到svg文件中

   ```svg
   // assets/icons/test.svg
   <svg t="1687877325223" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1806" width="200" height="200"><path d="M516.32 285.28A98.56 98.56 0 1 0 614.88 384a98.56 98.56 0 0 0-98.56-98.72z m0 164.96A66.56 66.56 0.......></path></svg>
   ```

3. 在组件中使用

   ```vue
   <template>
     <div>
       svg测试
       <svg>
         <use xlink:href="#icon-project"></use>
       </svg>
     </div>
   </template>
   ```

   
   
   #### svg封装为全局组件
   
   因为项目很多模块需要使用图标,因此把它封装为全局组件！！！
   
   **在src/components目录下创建一个SvgIcon组件:代表如下**
   
   ```vue
   <template>
     <div>
       <svg :style="{ width: width, height: height }">
         <use :xlink:href="prefix + name" :fill="color"></use>
       </svg>
     </div>
   </template>
   
   <script setup lang="ts">
   defineProps({
     //xlink:href属性值的前缀
     prefix: {
       type: String,
       default: '#icon-'
     },
     //svg矢量图的名字
     name: String,
     //svg图标的颜色
     color: {
       type: String,
       default: ""
     },
     //svg宽度
     width: {
       type: String,
       default: '16px'
     },
     //svg高度
     height: {
       type: String,
       default: '16px'
     }
   
   })
   </script>
   <style scoped></style>
   ```
   
   在src文件夹目录下创建一个index.ts文件：用于注册components文件夹内部全部全局组件！！！
   
   ```
   import SvgIcon from './SvgIcon/index.vue';
   import type { App, Component } from 'vue';
   const components: { [name: string]: Component } = { SvgIcon };
   export default {
       install(app: App) {
           Object.keys(components).forEach((key: string) => {
               app.component(key, components[key]);
           })
       }
   }
   ```
   
   在入口文件引入src/index.ts文件,通过app.use方法安装自定义插件
   
   ```
   import gloablComponent from './components/index';
   app.use(gloablComponent);
   ```
   

#### 集成Sass

我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang="scss"

```
<style scoped lang="scss"></style>
```

接下来我们为项目添加一些全局的样式

在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，因此在index.scss引入reset.scss

```
@import './reset.scss';
```

在入口文件引入

```
import '@/styles/index.scss'
```

但是你会发现在src/styles/index.scss全局样式文件中没有办法使用$变量.因此需要给项目中引入全局变量$.

在style/variable.scss创建一个variable.scss文件！

在vite.config.ts文件配置如下:

```js
export default defineConfig((config) => {
	css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
	}
}
```

**`@import "./src/styles/variable.less";`后面的`;`不要忘记，不然会报错**!

配置完毕你会发现scss提供这些全局变量可以在组件样式中使用了！！！

#### mock数据

安装依赖:https://www.npmjs.com/package/vite-plugin-mock

```
pnpm install -D vite-plugin-mock mockjs
```

在 vite.config.js 配置文件启用插件。

```js
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
export default ({ command })=> {
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
  }
}
```

在**根目录**创建mock文件夹:去创建我们需要mock数据与接口！！！

在mock文件夹内部创建一个user.ts文件

```ts
//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: {checkUser} }
        },
    },
]
```

**安装axios**

```
pnpm install axios
```

最后通过axios测试接口！！！

#### API接口统一管理

在开发项目的时候,接口可能很多需要统一管理。在src目录下去创建api文件夹去统一管理项目的接口；

比如:下面方式

```ts
//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import type {

 loginFormData,

 loginResponseData,

 userInfoReponseData,

} from './type'

//项目用户相关的请求地址

enum API {

 LOGIN_URL = '/admin/acl/index/login',

 USERINFO_URL = '/admin/acl/index/info',

 LOGOUT_URL = '/admin/acl/index/logout',

}
//登录接口
export const reqLogin = (data: loginFormData) =>
 request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息

export const reqUserInfo = () =>

 request.get<any, userInfoReponseData>(API.USERINFO_URL)

//退出登录

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
```

### 项目构建

#### login登录组件

##### 创建仓库

安装pinia

```
pnpm i pinia@2.0.34
```

创建大仓库

```ts
src\store\index.ts
// 大仓库
import { createPinia } from "pinia";
// 创建大仓库
let pinia = createPinia();
// 对外暴露：入口文件需要安装仓库
export default pinia;
```

引入pinia

```ts
main.ts
// 引入仓库
import pinia from './store';
app.use(pinia)
```

创建小仓库

```ts
src\store\modules\user.ts
// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 创建用户小仓库
let useUserStore = defineStore('User',{
    // 存储数据地方
    state:()=>{
        return {}
    },
    // 异步|逻辑地方
    actions:{

    },
    getters:{

    }
})
// 对外暴露获取小仓库的方法
export default useUserStore;
```

##### 绑定方法

给按钮绑定方法（并将表单数据传到仓库），点击按钮后通知仓库发登录请求

```ts
const login = ()=>{
    // 点击按钮后
        // 通知仓库发登录请求
        // 请求成功->首页展示数据的地方
        // 请求失败-> 弹出登录失败信息
        useStore.userLogin(loginForm)    
}
```

给仓库中的actons添加发送请求

```tsx
// 引入数据类型
import {loginForm} from "@/api/user/type"
// 引入接口
import { reqLogin } from "@/api/user";
let useUserStore = defineStore('User',{
	......
    // 异步|逻辑地方
    actions:{
        // 用户登录的方法
        async userLogin(data:loginForm){
            let res = await reqLogin(data);   
            console.log(res);                     
        }
    },
    ......
})
```

------

完整代码：

```ts
// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入数据类型
import {loginForm} from "@/api/user/type"
// 引入接口
import { reqLogin } from "@/api/user";
// 创建用户小仓库
let useUserStore = defineStore('User',{
    // 存储数据地方
    state:()=>{
        return {
            token:localStorage.getItem("TOKEN"),// 用户唯一标识
        }
    },
    // 异步|逻辑地方
    actions:{
        // 用户登录的方法
        async userLogin(data:loginForm){
            let result = await reqLogin(data);   
            // 登录成功：200 -> token
            // 登录失败：201 -> 显示登录失败信息
            if(result.code == 200){
                // pinia存储一下token
                // 由于pinia|vuex存储数据其实利用的是js对象（js对象存储数据并非持久化）
                this.token = result.data.token;
                // 因此还需利用localStorage进行本地存储
                localStorage.setItem("TOKEN",result.data.token)   
            }else{

            }                   
        }
    },
    getters:{

    }
})
// 对外暴露获取小仓库的方法
export default useUserStore;
```

##### 输入校验

:model  表单收集，收集到哪个地方

:rules	校验规则

prop 	`model` 的键名，它可以是一个路径数组

```vue
<el-form class="login_form" :model="loginForm" :rules="rules">
	...
	<el-form-item prop="username">
	...
	<el-form-item prop="password">
        
<script setup lang='ts'>
// 收集账号与密码
let loginForm = reactive({username:'admin',password:'111111'})

// 表单校验需要配置的对象 (校验规则)
const rules ={
    username:[
        { required:true, min:5,message:'用户名格式不正确',trigger:'blur'}
    ],
    password:[{required: true, min: 6, max: 15, message: '密码格式不正确', trigger: 'change'}]
 }
</script>
```

统一验证：只有表单数据格式都正确的情况下，才能发送请求

```vue
<el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
	...
<script setup>
// 获取el-form组件
let loginForms = ref();
// 登录按钮回调
const login = async () => {
    // 发送请求之前，保证全部表单项校验通过
    await loginForms.value.validate(); 
    ...
}
</script>
```

###### 自定义校验

（使用正则）

```vue

<script setup>
// 自定义校验规则函数
// 自定义校验规则函数
const validatorUserName = (rule:any,value:any,callback:any)=>{
    // 形参可以不用，但是必须写 占位
    // 参数 rule:即为校验规则对象
    // 参数 value:即为表单元素文本内容
    // 参数 callback:即为规则放行函数 符合条件通过callback放行；不符合通过callback注入错误信息
    if(value.length >= 5){ // 正则：if(/^/d{5,9}$/.test(value))
        callback()
    }else{
        callback(new Error('账号长度>5'))
    }  
}
// 表单校验需要配置的对象 (校验规则)
const rules ={
    username:[
        // validator定义一个校验规则函数
       {trigger:'change',validator:validatorUserName}
    ],
    password:[
       {trigger:'change',validator:validatorUserName}]
 }
</script>
```



#### 主页搭建

##### layout静态搭建

##### logo组件的封装

创建setting文件 用于项目 logo|标题的配置 ，方便后期项目作为模板使用。



##### 递归组件生成动态菜单

将路由组件信息存储到pinia仓库中

```ts
src\store\modules\user.ts
// 引入路由(常量路由)
import { constantRoute } from "@/router/routes";
....
state:():UserState => {
        return {
            token:GET_TOKEN(),// 用户唯一标识
            menuRoutes:constantRoute
        }
    },
```

定义路由信息数据类型

```ts
import type { RouteRecordRaw } from "vue-router";
// 定义小仓库数据state类型
export interface UserState {
    token:string|null;
    menuRoutes:RouteRecordRaw[]
}
```

父组件引入数据并传给需要使用的子组件

```vue
src\layout\index.vue
<template> 
	<Menu :menuList="userStore.menuRoutes"></Menu></template>
<script>
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
</script>
```

子组件中使用

```vue

<template>
        <template v-for="(item, index) in menuList" :key="item.path">
            <!-- 情况一：没有子路由 -->
            <el-menu-item v-if="!item.children&&item.meta.hidden">
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 情况二：有且仅有一个子路由 -->
            <el-menu-item v-if="item.children&&item.children.length==1&&item.meta.hidden" :key="item.children[0].path">
                <template #title>
                    <span>
                        {{ item.children[0].meta.title }}
                    </span>
                </template>
            </el-menu-item>
            <!-- 情况三：有一个以上的子路由 -->
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1&&item.meta.hidden">
                <template #title>
                    <span>
                        {{ item.meta.title }}        
                    </span>
                </template>
                <Menu :menuList="item.children"></Menu>
                
            </el-sub-menu>
        </template>

</template>

<script setup lang="ts">
    defineProps(['menuList'])
</script>
<script lang="ts">
export desfault{
    name:'Menu'
}
</script>
<style scoped>

</style>
```

##### 菜单折叠效果实现

- 图标变换

创建pinia仓库，创建fold变量，用于是否展示左侧菜单

```ts
src\layout\tabbar\breadcrumb\index.vue
// 关于 layout组件 相关配置仓库
import { defineStore } from "pinia";
let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return {
            fold:false, //用于控制菜单折叠还是收起控制
        }
    }
})
export default useLayOutSettingStore;
```

导入使用

```js

import useLayOutSettingStore from '@/store/modules/setting'
// 获取layout配置相关的仓库
let LayoutSettingStore = useLayOutSettingStore();

// 点击图标方法
const changeIcon = ()=>{
    // 图标切换
    LayoutSettingStore.fold = !LayoutSettingStore.fold ;
}
```

- 折叠效果实现

```vue
src\layout\index.vue

 <!-- 为左侧菜单添加一个动态类 -->
<div class="layout_slider" :class="{fold:LayoutSettingStore.fold?true:false}">
<style lang="scss">
&.fold{
   	width:calc(100vw - $base-menu-min-width);
    left:$base-menu-min-width ;
}    
</style>
```

##### 面包屑动态展示

导入route 利用route中的matched属性获取当前路由路径

```vue
src\layout\tabbar\breadcrumb\index.vue

<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">
       <span>{{item.meta.title}}</span>
</el-breadcrumb-item>

import { useRoute } from 'vue-router';
let $route = useRoute();
```



小细节：当点击一级菜单（没有子菜单的菜单）只展示一级菜单，而不展示其它菜单标题。例：首页

```vue
<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title">
```



##### 刷新业务实现

因为刷新按钮和内容展示页面不同属于一个组件，因此涉及组件间通信。

实现：点击刷新按钮后，把对应的路由组件进行销毁再创建，再向服务器重新发送请求，请求展示数据。

步骤：

在pinia仓库中创建refsh变量，用于标记刷新状态。

```ts
src\store\modules\setting.ts
// 关于 layout组件 相关配置仓库
import { defineStore } from "pinia";
let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return {
            refsh:false,// 仓库这个属性用于控制刷新效果
        }
    }
})
export default useLayOutSettingStore;
```

点击刷新按钮后，对刷新状态（refsh变量）进行置反。

```vue
src\layout\tabbar\setting\index.vue
<template>
    <el-button type="primary" icon="Refresh" circle @click="updateRef" />
	......
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayOutSettingStore();
const updateRef = ()=>{
    layoutSettingStore.refsh = !layoutSettingStore.refsh;
}
</script>
```

在内容展示组件中，监听刷新状态（refsh变量）的变化。当变化时，对组件进行 销毁再创建，请求展示数据。

```vue
src\layout\main\index.vue
<template>
    <div >
        <transition>
            <router-view v-slot="{Component}">
                <transition name="fade">
                    <component :is="Component" v-if="flag"></component>
                </transition>
            </router-view>
        </transition>
    </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { nextTick, ref, watch } from 'vue';
let layoutSettingStore  = useLayOutSettingStore();

// 控制当前组件是否销毁重建
let flag = ref(true);

// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(()=>layoutSettingStore.refsh,()=>{
    console.log('123');
    // 点击刷新按钮：路由组件销毁
    flag.value = false;
    nextTick(()=>{
        flag.value = true
    })
})
</script>
```

##### 获取用户信息与token理解

实现：首页挂载时，向服务器发送请求，将数据存储在仓库中。

步骤：

首页挂载时，调用仓库中的数据请求方法userInfo()

```vue
src\views\home\index.vue
<template>
    <div>
        <h1>我是一级路由-登录成功后的数据</h1>
    </div>
</template>
<script lang="ts" setup>
// 引入组合式API函数 生命周期函数
import { onMounted } from 'vue';
// 引入仓库
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
// 首页挂载完毕发送请求 获取用户信息
onMounted(() => {
    useStore.userInfo()
}),
</script>
```

在仓库中请求数据，并进行保存

```tsx
 // 存储数据地方
    state:():UserState => {
        return {
            token:GET_TOKEN(),// 用户唯一标识
            menuRoutes:constantRoute,
            username:'',
            avatar:''
        }
    }, 
// 异步|逻辑地方
    actions:{
        // 用户登录的方法
        async userLogin(data:loginForm){
    	....
    	},
        // 获取用户信息的方法
        async userInfo(){
           let result = await reqUserInfo();
           console.log(result);         
            
        }
    },
```

请求到token后，请求拦截器中需要将token设置为响应头。用于区分不同的响应用户。

```ts
src\utils\request.ts
// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config)=>{
    // 获取用户相关的小仓库：获取仓库内部token，登录成功以后携带给服务器
    let userStore = useUserStore();
    if(userStore.token){
        config.headers.token = userStore.token;
    }
    // 返回配置对象
    return config;
})
```

##### 退出登录业务

给退出按钮绑定点击事件， 事件需要完成：

 // 1.需要向服务器发请求（退出登录接口）

  // 2.清楚仓库中有关用户的数据

  // 3.跳转登录页面



##### 路由鉴权之进度条业务

创建permisstion.ts文件，创建全局路由守卫。

```ts
src\permission.ts
// 路由鉴权：鉴权，项目当中路由能不能被访问的权限设置（某个路由什么条件下可以访问、什么条件下不可以访问）
import router from "./router";

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // to ：将要访问的那个路由
    // from :你从那个路由而来
    // next ：路由的放行函数
})

// 全局后置守卫
router.afterEach((to, from) => {
    // to and from are both route objects.
})
```

在入口文件main.ts中进行引入

```ts
// 引入路由鉴权文件
import './permisstion.ts';
```



添加进度条

安装 ： ``pnpm i nprogress``

导入使用：

```ts
src\permission.ts
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"
// 全局前置守卫
router.beforeEach((to, from, next) => {
    nprogress.start();
    next();
    
})
// 全局后置守卫
router.afterEach((to, from) => {
    nprogress.done()
})
```

##### 路由鉴权

业务：未登录状态不能进入其他模块组件，只能留在 /login ； 登录成功后不能访问 /login

实现：根据苍鹭仓库中的token判断用户是否登录。在permisstion文件中进行路由限制。

步骤：

在组件外部，使用pinia仓库，需要重新导入pinia。

```ts
src\permisstion.ts
// 引入pinia仓库
import pinia from "./store";
import useUserStore from "./store/modules/user";
let userStore = useUserStore(pinia);
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    // to ：将要访问的那个路由
    // from :你从那个路由而来
    // next ：路由的放行函数
    nprogress.start();
    // 获取token判断用户是否登录
    let token = userStore.token;
    if(token){
        // 登录成功后，不能再访问login
        if(to.path=='/login'){
            next({path:'/'})
        }else{
            next();
        }
    }else{
        // 未登录状态 只能访问login
        if(to.path=='/login'){
            next();
        }else{
            next({path:'/login',query:{redirect:to.path}})
        }
    }  
})
```



解决不同组件中刷新后，用户信息丢失问题。

原本解决方案，在每个组件加载时，重新发送数据请求，重复代码多。

现在全局路由守卫中，在前置路由守卫中进行判断是否含有用户信息，在发请求，写一遍代码即可。

```ts

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    nprogress.start();
    // 获取token判断用户是否登录
    let token = userStore.token;
    // 获取用户名字
    let username = userStore.username;
    if (token) {
        if (to.path == '/login') {
            // 登录成功后，不能再访问login
            next({ path: '/' })
        } else {
            // 登录成功状态，可以访问其它路由
            if (username) {
                // 该组件有用户信息
                next();
            } else {
                try {
                    // 如果该组件没有用户信息，发请求获取用户信息后，再放行
                    await userStore.userInfo();
                    next()
                } catch (error) {

                }
            }
        }
    } else {
        // 未登录状态 只能访问login
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
```



优化：token过期问题

```ts
try {
    // 如果该组件没有用户信息，发请求获取用户信息后，再放行
    await userStore.userInfo();
    next()
} catch (error) {
    // 两种情况
    // 1.token过期：获取不到用户信息
    // 2.用户手动修改本地存储的token
    // 进行操作：退出登录 -> 清除用户相关数据
    userStore.uesrLogout();
    next({path:'/login'})
}
```



优化：浏览器标签名字变化

```ts

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    document.title = '硅谷甄选-'+to.meta.title;
    ......
}
```



##### 真实接口替换mock接口

> 接口文档：
>
> 服务器域名：http://sph-api.atguigu.cn
>
> swagger文档：
>
> http://39.98123.211:8510/swagger-ui.html
>
> http://139.198.104.58:8212/swagger-ui.html#/

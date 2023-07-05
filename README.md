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
   
   ```
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

```
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

```
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

```
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

```
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


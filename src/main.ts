import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
//  测试假接口能否使用
import axios from 'axios';
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store';
// svg插件需要配置的代码
import 'virtual:svg-icons-register'
// 引入模板的全局样式
import "@/styles/index.scss"
// 引入ELPLUS图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入路由鉴权文件
import './permisstion.ts';
// 引入项目中的全局组件
import Category from '@/components/Category/index.vue'
// 登录接口
axios({
    url:'/api/user/login',
    method:'post',
    data:{
        username:'admin',
        password:'111111'
    }
})
// createApp(App).mount('#app')
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 注册路由
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.component('Category',Category);
app.mount('#app')

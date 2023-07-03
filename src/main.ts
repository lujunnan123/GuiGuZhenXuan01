import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
//  测试假接口能否使用
import axios from 'axios';
// 引入路由
import router from './router'
// svg插件需要配置的代码
import 'virtual:svg-icons-register'
// 引入模板的全局样式
import "@/styles/index.scss"

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

// 注册路由
app.use(router);
app.use(ElementPlus)
app.mount('#app')

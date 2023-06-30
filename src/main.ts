import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'


// createApp(App).mount('#app')
const app = createApp(App)

app.use(ElementPlus)
// svg插件需要配置的代码
import 'virtual:svg-icons-register'
// 引入模板的全局样式
import "@/styles/index.scss"
app.mount('#app')
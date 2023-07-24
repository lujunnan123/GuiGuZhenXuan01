// 路由鉴权：鉴权，项目当中路由能不能被访问的权限设置（某个路由什么条件下可以访问、什么条件下不可以访问）
import router from "./router";
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    // to ：将要访问的那个路由
    // from :你从那个路由而来
    // next ：路由的放行函数
    nprogress.start();
    next();
    
})

// 全局后置守卫
router.afterEach((to, from) => {
    // to and from are both route objects.
    nprogress.done()
})
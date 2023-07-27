// 路由鉴权：鉴权，项目当中路由能不能被访问的权限设置（某个路由什么条件下可以访问、什么条件下不可以访问）
import router from "./router";
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css";
nprogress.configure({showSpinner:false});
// 引入pinia仓库
import pinia from "./store";
import useUserStore from "./store/modules/user";
let userStore = useUserStore(pinia);
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    document.title = '硅谷甄选-'+to.meta.title;
    // to ：将要访问的那个路由
    // from :你从那个路由而来
    // next ：路由的放行函数
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
                    next();
                } catch (error) {
                    // 两种情况
                        // 1.token过期：获取不到用户信息
                        // 2.用户手动修改本地存储的token
                    // 进行操作：退出登录 -> 清除用户相关数据
                    userStore.uesrLogout();
                    next({path:'/login',query:{redirect:to.path}});
                }
            }
        }
    } else {
        // 未登录状态 只能访问login
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.path } });
        }
    }
})

// 全局后置守卫
router.afterEach((to, from) => {
    // to and from are both route objects.
    nprogress.done()
})
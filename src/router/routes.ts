// 对外暴露路由(常量路由)
export const constantRoute = [
    {
        path:'/login',
        component:()=>import('@/views/login/index.vue'),
        name:'login' //命名路由
    },
    {
        path:'/',
        component:()=>import('@/layout/index.vue'),
        name:'layout' //命名路由
    },
    {
        path:'/404',
        component:()=>import('@/views/404/index.vue'),
        name:'404' //命名路由
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'Any'
    }
]
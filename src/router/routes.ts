// 对外暴露路由(常量路由)
export const constantRoute = [
    {
        path:'/login',
        component:()=>import('@/views/login/index.vue'),
        name:'login' ,//命名路由
        meta:{
            title:'登录',
            hidden:true,   // 决定路由标题在菜单中是否隐藏 true隐藏 false不隐藏
            icon:'Position'
        }
    },
    {
        path:'/',
        component:()=>import('@/layout/index.vue'),
        name:'layout', //命名路由
        meta:{
            title:'layout',
            hidden:true,
            icon:'UserFilled'
        },
        children:[
            {
                path:'/home',
                component:()=>{'@/views/home/index.vue'},
                meta:{
                    title:'首页',
                    hidden:true,
                    icon:'HomeFilled'
                },
            },
            {
                path:'/test',
                component:()=>{'@/views/home/index.vue'},
                meta:{
                    title:'测试',
                    hidden:true,
                    icon:'View'
                }
            }
        ]
    },
    {
        path:'/404',
        component:()=>import('@/views/404/index.vue'),
        name:'404', //命名路由
        meta:{
            title:'404',
            hidden:false,
            icon:'Close'
        },
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'Any', //命名路由
        meta:{
            title:'任意路由',
            hidden:false,
            icon:'Connection'
        },
    }
]
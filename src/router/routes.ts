// 对外暴露路由(常量路由)
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',//命名路由
        meta: {
            title: '登录',
            hidden: false,   // 决定路由标题在菜单中是否隐藏 true隐藏 false不隐藏
            icon: 'Position'
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout', //命名路由
        meta: {
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                },
            }
        ]
    },
     {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Monitor'
        }
     },
    {
        path: '/acl',
        component: () => import( '@/layout/index.vue' ),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Trophy'
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import ('@/views/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                component: () =>import('@/views/acl/role/index.vue' ),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'Lock'
                }
            },
            {
                path: '/acl/permission',
                component: () =>import('@/views/acl/permission/index.vue' ),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Grid'
                }
            },
        ]
    },
    {
        path: '/product',
        component: () =>import('@/layout/index.vue' ),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'ShoppingCartFull'
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'StarFilled'
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'sku管理',
                    icon: 'Lock'
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'  ),
                name: 'Spu',
                meta: {
                    title: 'spu管理',
                    icon: 'MagicStick'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'  ),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'InfoFilled'
                }
            },
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404', //命名路由
        meta: {
            title: '404',
            hidden: true,
            icon: 'Close'
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any', //命名路由
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'Connection'
        },
    }
]
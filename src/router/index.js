import { createWebHistory, createRouter } from 'vue-router'
// 创建路由
const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
      {
        // 页面逻辑
        path: '/',
        name: 'login',
        component: () => import('../components/home.vue'),
      },
      {
        // 页面逻辑
        path: '/navigation',
        name: 'navigation',
        component: () => import('../components/navigation.vue'),
        children: [
          {
            path: '/index',
            name: '首页',
            component: () => import('@/page/index.vue')
        },
        {
          path: '/cast',
          name: '花费',
          component: () => import('@/page/castEveryday.vue')
      },
      {
        path: '/statistics',
        name: '统计',
        component: () => import('@/page/statistics.vue')
    }
        ]
      },
    
    ]
  })

  export default router
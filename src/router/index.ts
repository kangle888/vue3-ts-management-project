import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
      // children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () => import('../views/main/analysis/overview/overview.vue')
      //   },
      //   {
      //     path: '/main/analysis/dashboard',
      //     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
      //   },
      //   {
      //     path: '/main/system/role',
      //     component: () => import('../views/main/system/role/role.vue')
      //   },
      //   {
      //     path: '/main/system/user',
      //     component: () => import('../views/main/system/user/user.vue')
      //   }
      // ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-font/not-font.vue')
    }
  ]
})

// 导航守卫

router.beforeEach((to, from, next) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return next('/login')
  }
  if (to.path === '/main') {
    return next(firstMenu?.url)
  }
})

export default router

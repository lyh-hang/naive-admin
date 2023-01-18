import type { RouteRecordRaw } from 'vue-router'
import { token } from '@/composables/token'
import { createRouter, createWebHistory } from 'vue-router'

import Layuot from '@/layout/Layout.vue'

type TRoutes = RouteRecordRaw & {
  children?: TRoutes[]
  meta?: {
    menu?: boolean
    title?: string
    icon?: string
  }
}

const routes: TRoutes[] = [
  {
    path: '/',
    component: Layuot,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/Dashboard.vue'),
        meta: { menu: true, title: '仪表盘', icon: 'SpeedometerOutline' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/NestedMenus/NestedMenus.vue'),
        meta: { menu: true, title: '组合菜单', icon: 'MenuOutline' },
        children: [
          {
            path: 'menu1',
            name: 'Menu1',
            component: () => import('@/views/NestedMenus/Menu1/Menu1.vue')
          }
        ]
      },
      {
        path: 'system_setting',
        name: 'SystemSetting',
        component: () => import('@/views/Setting/Setting.vue'),
        meta: { menu: true, title: '系统设置', icon: 'SettingsOutline' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: import('@/views/Error/NotFound.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: () => ({
    top: 0,
    left: 0
  })
})

router.beforeEach((to, form) => {
  window.$loadingBar.start()
  if (token.value) {
    if (to.path === '/login') {
      return { path: '/' }
    }
  } else {
    return '/login'
  }
})

router.afterEach(() => {
  window.$loadingBar.finish()
})

router.onError(() => {
  window.$loadingBar.finish()
})

export default router

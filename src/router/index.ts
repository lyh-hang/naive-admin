import type { RouteRecordRaw } from 'vue-router'
import { token } from '@/composables/token'
import { createRouter, createWebHistory } from 'vue-router'

import Layuot from '@/layout/Layout.vue'

type TRoutes = RouteRecordRaw & {
  children?: TRoutes[]
  meta?: {
    menu?: boolean
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
        meta: { menu: true, icon: 'SpeedometerOutline' }
      },
      {
        path: 'nested',
        name: 'Nested',
        redirect: { name: 'Menu1' },
        component: () => import('@/views/NestedMenus/NestedMenus.vue'),
        meta: { menu: true, icon: 'MenuOutline' },
        children: [
          {
            path: 'menu1',
            name: 'Menu1',
            component: () => import('@/views/NestedMenus/Menu1/Menu1.vue')
          },
          {
            path: 'menu2',
            name: 'Menu2',
            component: () => import('@/views/NestedMenus/Menu2/Menu2.vue'),
            children: [
              {
                path: 'menu2_1',
                name: 'Menu2_1',
                component: () =>
                  import('@/views/NestedMenus/Menu2/Menu2_1/Menu2_1.vue')
              },
              {
                path: 'menu2_2',
                name: 'Menu2_2',
                component: () =>
                  import('@/views/NestedMenus/Menu2/Menu2_2/Menu2_2.vue')
              }
            ]
          },
          {
            path: 'menu3',
            name: 'Menu3',
            component: () => import('@/views/NestedMenus/Menu3/Menu3.vue'),
            children: [
              {
                path: 'menu3_1',
                name: 'Menu3_1',
                component: () =>
                  import('@/views/NestedMenus/Menu3/Menu3_1/Menu3_1.vue'),
                children: [
                  {
                    path: 'menu3_1_1',
                    name: 'Menu3_1_1',
                    component: () =>
                      import(
                        '@/views/NestedMenus/Menu3/Menu3_1/Menu3_1_1/Menu3_1_1.vue'
                      )
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'system_setting',
        name: 'SystemSetting',
        component: () => import('@/views/Setting/Setting.vue'),
        meta: { menu: true, icon: 'SettingsOutline' }
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
  if (!token.value && to.name !== 'Login') return '/login'

  if (token.value && to.name === 'Login') return '/'
})

router.afterEach(() => {
  window.$loadingBar.finish()
})

router.onError(() => {
  window.$loadingBar.finish()
})

export default router

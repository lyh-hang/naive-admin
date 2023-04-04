import type { RouteRecordRaw } from 'vue-router'
import Layuot from '@/layout/Layout.vue'

type TRoutes = RouteRecordRaw & {
  children?: TRoutes[]
  meta?: {
    menu?: boolean
    icon?: string
    customIcon?: string
  }
}

export const routes: TRoutes[] = [
  {
    path: '/',
    component: Layuot,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/Dashboard.vue'),
        meta: { menu: true, icon: 'ion:speedometer-outline' }
      },
      {
        path: 'nested',
        name: 'Nested',
        redirect: { name: 'Menu1' },
        component: () => import('@/views/NestedMenus/NestedMenus.vue'),
        meta: { menu: true, icon: 'ion:menu' },
        children: [
          {
            path: 'menu1',
            name: 'Menu1',
            component: () => import('@/views/NestedMenus/Menu1/Menu1.vue'),
            meta: { icon: 'ion:menu' }
          },
          {
            path: 'menu2',
            name: 'Menu2',
            component: () => import('@/views/NestedMenus/Menu2/Menu2.vue'),
            meta: { icon: 'ion:menu' },
            children: [
              {
                path: 'menu2_1',
                name: 'Menu2_1',
                component: () =>
                  import('@/views/NestedMenus/Menu2/Menu2_1/Menu2_1.vue'),
                meta: { icon: 'ion:menu' }
              },
              {
                path: 'menu2_2',
                name: 'Menu2_2',
                component: () =>
                  import('@/views/NestedMenus/Menu2/Menu2_2/Menu2_2.vue'),
                meta: { icon: 'ion:menu' }
              }
            ]
          },
          {
            path: 'menu3',
            name: 'Menu3',
            component: () => import('@/views/NestedMenus/Menu3/Menu3.vue'),
            meta: { icon: 'ion:menu' },
            children: [
              {
                path: 'menu3_1',
                name: 'Menu3_1',
                component: () =>
                  import('@/views/NestedMenus/Menu3/Menu3_1/Menu3_1.vue'),
                meta: { icon: 'ion:menu' },
                children: [
                  {
                    path: 'menu3_1_1',
                    name: 'Menu3_1_1',
                    component: () =>
                      import(
                        '@/views/NestedMenus/Menu3/Menu3_1/Menu3_1_1/Menu3_1_1.vue'
                      ),
                    meta: { icon: 'ion:menu' }
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        path: 'system_setting',
        name: 'SystemSetting',
        component: () => import('@/views/Setting/Setting.vue'),
        meta: { menu: true, icon: 'ion:settings-outline' }
      }
    ]
  },
  {
    path: '/error',
    name: 'Error',
    component: Layuot,
    redirect: { name: 'NotFound' },
    meta: { menu: true, icon: 'ion:alert-circle-outline' },
    children: [
      {
        path: '404',
        name: 'NotFound',
        component: () => import('@/views/Error/NotFound.vue'),
        meta: { icon: 'bi:emoji-dizzy' }
      }
    ]
  },
  {
    path: '/login/:redirect?',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'NotFound' } }
]

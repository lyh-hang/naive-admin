import type { RouteRecordRaw } from 'vue-router'
import { token } from '@/composables/token'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import Layuot from '@/layout/Layout.vue'

NProgress.configure({ showSpinner: false })

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layuot
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
  NProgress.start()
  if (token.value) {
    if (to.path === '/login') {
      return { path: '/' }
    }
  } else {
    return '/login'
  }
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(() => {
  NProgress.done()
})

export default router

import { getStorage } from '@/utils/localStorage'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: () => ({
    top: 0,
    left: 0
  })
})

router.beforeEach(to => {
  window.$loadingBar.start()
  if (!getStorage('token') && to.path !== '/login') {
    return { path: '/login', query: { redirect: to.path } }
  }
  if (getStorage('token') && to.path === '/login') return '/'
})

router.afterEach(() => {
  window.$loadingBar.finish()
})

router.onError(() => {
  window.$loadingBar.finish()
})

export default router

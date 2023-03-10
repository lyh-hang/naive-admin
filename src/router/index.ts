import { getToken } from '@/utils/token'
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
  const token = getToken()
  if (!token && to.path !== '/login') {
    return { path: '/login', query: { redirect: to.path } }
  }
  if (token && to.path === '/login') return '/'
  useUserStore().getInfo()
})

router.afterEach(() => {
  window.$loadingBar.finish()
})

router.onError(() => {
  window.$loadingBar.finish()
})

export default router

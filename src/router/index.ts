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

router.beforeEach(() => {
  window.$loadingBar.start()
})

router.afterEach(() => {
  window.$loadingBar.finish()
})

router.onError(() => {
  window.$loadingBar.finish()
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: { template: '<div>home</div>' }
    },
    {
      path: '/login',
      component: () => import('@/views/Login/Login.vue')
    }
  ],
  history: createWebHistory(),
  scrollBehavior: () => ({
    top: 0,
    left: 0
  })
})

export default router

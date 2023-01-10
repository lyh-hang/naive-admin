import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: { template: '<div>home</div>' }
    },
    {
      path: '/about',
      component: { template: '<div>About</div>' }
    }
  ],
  history: createWebHistory(),
  scrollBehavior: () => ({
    top: 0,
    left: 0
  })
})

export default router

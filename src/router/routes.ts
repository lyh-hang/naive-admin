import type { RouteRecordRaw } from 'vue-router'
import Layuot from '@/layout/Layout.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layuot
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  }
]

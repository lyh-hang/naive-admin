import router from '@/router'
import { removeStorage, setStorage } from '@/utils/localStorage'

export const useUserStore = defineStore('user', () => {
  function login(username: string) {
    setStorage('token', username)
    
    router.push(router.currentRoute.value.query.redirect as string || '/')
  }

  function logout() {
    removeStorage('token')
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path
      }
    })
  }

  return {
    login,
    logout
  }
})

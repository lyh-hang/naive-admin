import router from '@/router'

export const useUserStore = defineStore('user', () => {
  function login() {
    router.push('/')
  }

  function logout() {
    router.push('/login')
  }

  return {
    login,
    logout
  }
})

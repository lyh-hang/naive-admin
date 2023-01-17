import { login } from '@/api/user'
import { token, setToken } from '@/composables/token'

export const useUserStore = defineStore('user', {
  state() {
    return {
      token
    }
  },
  actions: {
    async login(userForm: UserForm) {      
      const res = await login(userForm)
      setToken(res.token)
    }
  }
})

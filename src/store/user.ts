import { login } from '@/api/user'
import { token, setToken } from '@/composables/token'
import { RemovableRef } from '@vueuse/core'

interface userState {
  token: RemovableRef<string | null>
  userInfo: {
    avatar?: string
  }
}

export const useUserStore = defineStore('user', {
  state(): userState {
    return {
      token,
      userInfo: {}
    }
  },
  actions: {
    async login(userForm: UserForm) {      
      const res = await login(userForm)
      this.userInfo = res.userInfo
      setToken(res.token)
    }
  }
})

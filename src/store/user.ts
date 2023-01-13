import { login } from '@/api/user'

interface User {
  username: string | undefined
  password: string | undefined
}

export const useUserStore = defineStore('user', {
  actions: {
    async login(data: User) {
      const res = await login(data)
      console.log(res)
    }
  }
})

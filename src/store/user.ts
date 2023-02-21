import { login as loginApi, userInfo } from '@/api/user'
import { token, setToken, removeToken } from '@/composables/token'
import router from '@/router'
import { getStorage, removeStorage, setStorage } from '@/utils/localStorage'
import { RemovableRef } from '@vueuse/core'

interface userState {
  token: RemovableRef<string | null>
  userInfo: UserInfo
  loginNow: number
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<userState>({
    token,
    userInfo: JSON.parse(getStorage('userinfo') as string) || {},
    loginNow: Number(getStorage('login-timer')) || 0
  })

  async function login(data: UserForm) {
    const { token, username, loginNow } = await loginApi(data)
    state.token = token
    state.userInfo.username = username

    setToken(token)
    setStorage('login-timer', String(loginNow))
    info({ username, token })
  }

  async function info(data: { username: string; token: string }) {
    const { userinfo } = await userInfo(data)
    state.userInfo = userinfo
    setStorage('userinfo', JSON.stringify(userinfo))
  }

  function logout() {
    removeToken()
    removeStorage('userinfo')
    removeStorage('login-timer')
    state.token = ''
    state.userInfo = {} as UserInfo
    router.push('/login')
  }

  return {
    ...toRefs(state),
    login,
    info,
    logout
  }
})

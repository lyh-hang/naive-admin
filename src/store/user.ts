import router from '@/router'
import { setToken, removeToken, getToken } from '@/utils/token'
import { reqLogin, reqInfo } from '@/api/user'
import { removeStorage, setStorage } from '@/utils/localStorage'

interface UserState {
  token: string | null
  username: string
  avatar: string
  desc: string
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<UserState>({
    token: getToken(),
    username: '',
    avatar: '',
    desc: '111'
  })

  async function login(username: string) {
    const res = await reqLogin(username)
    state.token = res.token
    setToken(res.token)
    setStorage('login-timer', String(res.loginNow))
    await getInfo()
  }

  async function getInfo() {
    const res = await reqInfo(state.token as string)
    state.username = res.username
    state.avatar = res.avatar
    state.desc = res.desc
  }

  function logout() {
    removeToken()
    removeStorage('login-timer')
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path
      }
    })
  }

  return {
    ...toRefs(state),
    login,
    getInfo,
    logout
  }
})

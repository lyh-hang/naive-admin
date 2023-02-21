import request from '@/utils/request'

interface LoginRes {
  code: number
  token: string
  username: string
  loginNow: number
}

interface InfoRes {
  code: number
  userinfo: UserInfo
}

export function login(data: UserForm) {
  return request<LoginRes>({
    url: '/login',
    method: 'post',
    data
  })
}

export function userInfo(data: object) {
  return request<InfoRes>({
    url: '/info',
    method: 'post',
    data
  })
}

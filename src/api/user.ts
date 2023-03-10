import request from '@/utils/request'

interface LoginRes {
  token: string
  loginNow: number
}

interface InfoRes {
  username: string
  avatar: string
  desc: string
}

export function reqLogin(username: string) {
  return request<LoginRes>({
    url: '/login',
    method: 'post',
    data: { username }
  })
}

export function reqInfo(token: string) {
  return request<InfoRes>({
    url: '/info',
    method: 'post',
    data: { token }
  })
}

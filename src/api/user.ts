import request from '@/utils/request'

interface LoginResult {
  code: number
  token: string
  userInfo: UserInfo
}

export function login(data: object) {
  return request<LoginResult>({
    url: '/login',
    method: 'post',
    data
  })
}

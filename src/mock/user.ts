import type { MockOption } from './type'

const tokens = {
  admin: 'admin-token',
  editer: 'editer-token'
}

const userMocks: MockOption[] = [
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      
      // @ts-ignore
      const token = tokens[username]
      if (!token) {
        return {
          code: 204,
          message: '账号和密码错误'
        }
      } else {
        return {
          code: 200,
          token
        }
      }
    }
  }
]

export default userMocks

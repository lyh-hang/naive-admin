import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const Random = Mock.Random

const tokens: { [key: string]: string } = {
  admin: 'admin-token',
  editor: 'editor-token'
}

const userInfo: { [key: string]: UserInfo } = {
  'admin-token': {
    username: 'admin',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0r48f9CkTG83hXwacaS8FzL0iqiPK4wtew&usqp=CAU',
    desc: 'supper admin'
  },
  'editor-token': {
    username: 'editor',
    avatar: Random.image(),
    desc: 'general editor'
  },
  other: {
    username: 'other',
    avatar: Random.image(),
    desc: 'other user'
  }
}

export default [
  {
    url: '/api/login',
    method: 'post',
    response: (req: any) => {
      const { username } = req.body
      const token = tokens[username]

      return {
        code: 200,
        token: token || Random.string('upper', 32, 32),
        username,
        loginNow: Date.now()
      }
    }
  },
  {
    url: '/api/info',
    method: 'post',
    response: (req: any) => {
      const { username, token } = req.body
      const info = userInfo[token]

      return {
        code: 200,
        userinfo: info || { ...(userInfo.other), username }
      }
    }
  }
] as MockMethod[]

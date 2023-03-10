import mock from 'mockjs';
import { MockMethod } from 'vite-plugin-mock'

const Random = mock.Random

const tokens: { [key: string]: string } = {
  admin: 'admin-token',
  editor: 'editor-token'
}

const users: { [key: string]: object } = {
  'admin-token': {
    username: 'admin',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0r48f9CkTG83hXwacaS8FzL0iqiPK4wtew&usqp=CAU',
    // avatar: '@image(50x50, @color, @color, Admin)',
    desc: 'supper admin'
  },
  'editor-token': {
    username: 'editor',
    avatar: 'https://tupian.qqw21.com/article/UploadPic/2019-9/201991922552458264.jpg',
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
        loginNow: Date.now()
      }
    }
  },
  {
    url: '/api/info',
    method: 'post',
    response: (req: any) => {
      const { token } = req.body
      const info = users[token]

      return {
        code: 200,
        ...(info || users.other)
      }
    }
  }
] as MockMethod[]

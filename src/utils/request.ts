import axios from 'axios'
import { getToken } from './token'

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

const message = window.$message

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token && typeof config.headers?.set === 'function') {
      config.headers?.set('user-token', token)
    }
    return config
  },
  error => error
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 200) {
      message.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    message.error(error.message)
    return Promise.reject(new Error(error))
  }
)

export default service

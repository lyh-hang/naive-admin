import axios, { AxiosRequestConfig } from 'axios'
import { token } from '@/composables/token'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (token.value && typeof config.headers?.set === 'function') {
      config.headers?.set('user-access-token', token.value)
    }
    return config
  },
  error => error
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    window.$message.error(error.message)
    return Promise.reject(new Error(error))
  }
)

export default async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await service<T>(config)

    if ((data as any).code !== 200) {
      window.$message.error((data as any).msg)
      return Promise.reject(new Error((data as any).msg))
    } else {
      return Promise.resolve(data)
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

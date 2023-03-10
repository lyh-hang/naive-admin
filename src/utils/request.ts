import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_GLOB_BASE_API,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    //   if (token.value && typeof config.headers?.set === 'function') {
    //     config.headers?.set('user-access-token', token.value)
    //   }
    return config
  },
  error => error
)

instance.interceptors.response.use(
  response => response,
  error => {
    window.$message.error(error.message)
    return Promise.reject(error)
  }
)

export default async function <T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await instance<T>(config)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

import { getStorage, setStorage, removeStorage } from './localStorage'

export function getToken() {
  return getStorage('token')
}

export function setToken(token: string) {
  setStorage('token', token)
}

export function removeToken() {
  removeStorage('token')
}

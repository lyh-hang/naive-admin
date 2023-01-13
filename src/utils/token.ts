import { getLocalStorage, setLocalStorage, removeLocalStorage } from './storage'

export function getToken(): string | null {
  return getLocalStorage('token')
}

export function setToken(token: string): void {
  setLocalStorage('token', token)
}

export function removeToken(): void {
    removeLocalStorage('token')
}
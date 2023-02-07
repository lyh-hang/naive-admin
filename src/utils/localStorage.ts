export function setItem(key: string, value: string) {
  window.localStorage.setItem(key, value)
}

export function getItem(key: string) {
  return window.localStorage.getItem(key)
}

export function removeItem(key: string) {
  window.localStorage.removeItem(key)
}

import { getStorage, setStorage } from '@/utils/localStorage'

interface StateType {
  locale: string | null
  sidebar: boolean
}

export const useLayoutStore = defineStore('layout', () => {
  const state = reactive<StateType>({
    locale: getStorage('locale'),
    sidebar: getStorage('sidebar') === 'true' || false
  })

  function setLocale(locale: string) {
    state.locale = locale
    setStorage('locale', locale)
  }

  function setSidebar(sidebar: boolean) {
    state.sidebar = sidebar
    setStorage('sidebar', `${sidebar}`)
  }

  return {
    state,
    setLocale,
    setSidebar
  }
})

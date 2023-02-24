import { getStorage, setStorage } from '@/utils/localStorage'

interface StateType {
  device: string
  locale: string | null
  sidebar: boolean
}

export const useLayoutStore = defineStore('layout', () => {
  const state = reactive<StateType>({
    device: 'desktop',
    locale: getStorage('locale'),
    sidebar: getStorage('sidebar') === 'true' || false
  })

  function setDevice(device: string = 'desktop') {
    state.device = device
  }

  function setLocale(locale: string) {
    state.locale = locale
    setStorage('locale', locale)
  }

  function setSidebar(sidebar: boolean) {
    state.sidebar = sidebar
    setStorage('sidebar', `${sidebar}`)    
  }

  return {
    ...toRefs(state),
    setDevice,
    setLocale,
    setSidebar
  }
})

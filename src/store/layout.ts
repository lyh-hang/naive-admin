import { getStorage, setStorage } from '@/utils/localStorage'

interface StateType {
  device: string
  locale: string
  sidebar: boolean
  tags: boolean
  logo: boolean
}

export const useLayoutStore = defineStore('layout', () => {
  const state = reactive<StateType>({
    device: 'desktop',
    locale: getStorage('locale') || 'zh-CN',
    sidebar: getStorage('sidebar') === 'true' || false,
    tags: getStorage('tags') === 'true' || false,
    logo: getStorage('logo') === 'true' || false
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

  function toogleLogo() {
    state.logo = !state.logo
    setStorage('logo', String(state.logo))
  }

  function toogleTags() {
    state.tags = !state.tags
    setStorage('tags', String(state.tags))
  }

  return {
    ...toRefs(state),
    setDevice,
    setLocale,
    setSidebar,
    toogleLogo,
    toogleTags
  }
})

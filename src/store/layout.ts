import { getStorage, setStorage } from '@/utils/localStorage'

interface IState {
  device: string
  sidebar: boolean
  menuStyle: string
  menuMode: string
  tagsView: boolean
  logo: boolean
}

export const useLayoutStore = defineStore('app-layout', () => {
  const state = reactive<IState>({
    device: 'desktop',
    sidebar: getStorage('sidebar') === 'true',
    menuStyle: getStorage('menuStyle') || 'lightSide',
    menuMode: getStorage('menuMode') || 'left',
    tagsView: !(getStorage('tagsView') === 'false'),
    logo: !(getStorage('logo') === 'false')
  })

  function setDevice(device: string = 'desktop') {
    state.device = device
  }

  function setSidebar(sidebar: boolean) {
    state.sidebar = sidebar
    setStorage('sidebar', `${sidebar}`)
  }

  function setMenuStyle(style: string) {
    state.menuStyle = style
    setStorage('menuStyle', style)
  }

  function setMenuMode(mode: string) {
    if (state.device === 'desktop') {
      state.menuMode = mode
      setStorage('menuMode', mode)
    }
  }

  function toogleLogo() {
    state.logo = !state.logo
    setStorage('logo', String(state.logo))
  }

  function toogleTags() {
    state.tagsView = !state.tagsView
    setStorage('tagsView', String(state.tagsView))
  }

  return {
    ...toRefs(state),
    setDevice,
    setSidebar,
    toogleLogo,
    toogleTags,
    setMenuStyle,
    setMenuMode
  }
})

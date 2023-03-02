import { getStorage, setStorage } from '@/utils/localStorage'

interface StateType {
  device: string
  sidebar: boolean
}

export const useLayoutStore = defineStore('layout', () => {
  const state = reactive<StateType>({
    device: 'desktop',
    sidebar: getStorage('sidebar') === 'true' || false
  })

  function setDevice(device: string = 'desktop') {
    state.device = device
  }

  function setSidebar(sidebar: boolean) {
    state.sidebar = sidebar
    setStorage('sidebar', `${sidebar}`)    
  }

  return {
    ...toRefs(state),
    setDevice,
    setSidebar
  }
})

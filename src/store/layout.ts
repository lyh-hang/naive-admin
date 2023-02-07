import { getItem, setItem } from "@/utils/localStorage"
// import { isDark } from '@/composables/theme'

interface StateType {
  // theme: string | null
  locale: string | null
  sidebar: boolean
}

export const useLayoutStore = defineStore('layout', () => {
  const state = reactive<StateType>({
    // theme: getItem('theme') || isDark.value ? 'dark' : 'light',
    locale: getItem('locale'),
    sidebar: getItem('sidebar') === 'true'|| false
  })  

  // function setTheme() {
  //   state.theme = ''
  //   setItem('theme', 'theme')
  // }
  
  function setLocale(locale: string){
    state.locale = locale
    setItem('locale', locale)
  }

  function setSidebar(sidebar: boolean) {
    state.sidebar = sidebar
    setItem('sidebar', `${sidebar}`)
  }

  return {
    state,
    // setTheme,
    setLocale,
    setSidebar
  }
})

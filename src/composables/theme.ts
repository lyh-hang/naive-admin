import { colorLighten } from '@/utils'
import { getStorage, setStorage } from '@/utils/localStorage'
import { darkTheme, GlobalThemeOverrides, GlobalTheme } from 'naive-ui'

interface IColor {
  primaryColor: string
  primaryColorHover: string
  primaryColorPressed: string
  primaryColorSuppl: string
}

const isPreferredDark = usePreferredDark()
const isDark = useDark()

export const toggleDark = useToggle(isDark)

export const theme = computed<GlobalTheme | null>(() =>
  isDark.value ? darkTheme : null
)

const systemTheme: IColor[] = [
  {
    primaryColor: '#18a058',
    primaryColorHover: '#36ad6a',
    primaryColorPressed: '#0c7a43',
    primaryColorSuppl: '#36ad6a'
  },
  {
    primaryColor: '#2080f0',
    primaryColorHover: '#4098fc',
    primaryColorPressed: '#1060c9',
    primaryColorSuppl: '#4098fc'
  },
  {
    primaryColor: '#f0a020',
    primaryColorHover: '#fcb040',
    primaryColorPressed: '#c97c10',
    primaryColorSuppl: '#fcb040'
  },
  {
    primaryColor: '#d03050',
    primaryColorHover: '#de576d',
    primaryColorPressed: '#ab1f3f',
    primaryColorSuppl: '#de576d'
  },
  {
    primaryColor: '#316c72',
    primaryColorHover: '#487c82',
    primaryColorPressed: '#2b4c5a',
    primaryColorSuppl: '#487c82'
  }
]

const initTheme = JSON.parse(
  getStorage('theme') ||
    `{
        common: ${systemTheme[0]},
        LoadingBar: {
          colorLoading: ${systemTheme[0].primaryColor}
        }
    }`
)

export const themeOverrides = ref<GlobalThemeOverrides>(initTheme)

export function setThemeOverrides(color: string) {
  let common = systemTheme.find(i => i.primaryColor === color)
  themeOverrides.value = {
    common: common || {
      primaryColor: color,
      primaryColorHover: colorLighten(color, 5),
      primaryColorPressed: colorLighten(color, -9),
      primaryColorSuppl: colorLighten(color, 5)
    },
    LoadingBar: {
      colorLoading: color
    }
  }
  setStorage('theme', JSON.stringify(themeOverrides.value))
}

export const stop = watch(isPreferredDark, isPreferredDark => {
  toggleDark(isPreferredDark)
})

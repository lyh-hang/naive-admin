import { darkTheme, GlobalThemeOverrides, GlobalTheme } from 'naive-ui'

const isPreferredDark = usePreferredDark()
const isDark = useDark()

export const toggleDark = useToggle(isDark)

export const theme = computed<GlobalTheme | null>(() =>
  isDark.value ? darkTheme : null
)

export const themeOverrides = ref<GlobalThemeOverrides>({
  common: {
    primaryColor: '#18a058',
    primaryColorHover: '#36ad6a',
    primaryColorPressed: '#0c7a43',
    primaryColorSuppl: '#36ad6a'
  },
  LoadingBar: {
    colorLoading: '#18a058'
  }
})

export const stop = watch(isPreferredDark, isPreferredDark => {
  toggleDark(isPreferredDark)
})

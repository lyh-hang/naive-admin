import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

const isPreferredDark = usePreferredDark()
const isDark = useDark()

export const toggleDark = useToggle(isDark)

export const theme = computed<GlobalTheme | null>(() =>
  isDark.value ? darkTheme : null
)

export const stop = watch(isPreferredDark, isPreferredDark => {
  toggleDark(isPreferredDark)
})

import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

const isDark = usePreferredDark()

export const theme = ref<GlobalTheme | null>(isDark.value ? darkTheme : null)

export const toggleTheme = () => {
  theme.value = theme.value === null ? darkTheme : null
}

export const stop = watch(
  isDark,
  () => {
    theme.value = isDark.value ? darkTheme : null
  },
  { immediate: true }
)

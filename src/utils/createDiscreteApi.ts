import { createDiscreteApi, lightTheme, darkTheme, ConfigProviderProps } from 'naive-ui'
import { theme, themeOverrides } from '@/composables/theme'

export default function useDiscreteApi() {
  const configProviderProps = computed<ConfigProviderProps>(() => ({
    theme: theme.value === null ? lightTheme : darkTheme,
    themeOverrides: themeOverrides.value
  }))
  
  const { message, loadingBar, notification, dialog } = createDiscreteApi(
    ['message', 'loadingBar', 'notification', 'dialog'],
    { configProviderProps }
  )

  window.$message = message
  window.$loadingBar = loadingBar
  window.$notification = notification
  window.$dialog = dialog
}

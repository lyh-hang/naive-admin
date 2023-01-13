import { createDiscreteApi } from 'naive-ui'

export default function useDiscreteApi() {
  const { message, loadingBar, notification, dialog } = createDiscreteApi([
    'message',
    'loadingBar',
    'notification',
    'dialog'
  ])
  
  window.$message = message
  window.$loadingBar = loadingBar
  window.$notification = notification
  window.$dialog = dialog
}

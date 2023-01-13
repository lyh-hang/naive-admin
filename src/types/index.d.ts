import type { MessageApi, LoadingBarApi, NotificationApi, DialogApi } from 'naive-ui'

declare global {
  declare interface Window {
    $message: MessageApi
    $loadingBar: LoadingBarApi
    $notification: NotificationApi
    $dialog: DialogApi
  }
}

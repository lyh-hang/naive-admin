import type {
  MessageApi,
  LoadingBarApi,
  NotificationApi,
  DialogApi
} from 'naive-ui'
import * as echarts from 'echarts/core'
import type { LineSeriesOption, BarSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption
} from 'echarts/components'

declare global {
  declare interface Window {
    $message: MessageApi
    $loadingBar: LoadingBarApi
    $notification: NotificationApi
    $dialog: DialogApi
  }

  declare type EchartsOptions = echarts.ComposeOption<
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | GridComponentOption
    | BarSeriesOption
  >
}

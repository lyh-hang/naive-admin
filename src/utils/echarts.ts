import * as echarts from 'echarts/core'
import { ECharts } from 'echarts'
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
  LegendComponentOption,
  ToolboxComponent,
  ToolboxComponentOption
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { Ref } from 'vue'
import { Fn } from '@vueuse/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
>

export interface Charts extends ECharts {}

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent
])

export function chartInit(dom: HTMLDivElement) {
  return echarts.init(dom) as any as Charts
}

export function useCharts(dom: Ref<HTMLDivElement>) {
  let chart: echarts.ECharts | null = null
  let removeEventListener: Fn = useEventListener('resize', resize)

  function resize() {
    chart?.resize()
  }

  function setOptions(options: ECOption) {
    chart === null && (chart = echarts.init(unref(dom)))
    chart.clear()
    chart?.setOption(options)
  }

  watch(dom, () => {
    if (!dom) {
      removeEventListener()
    }
  })

  return {
    setOptions
  }
}

export default echarts

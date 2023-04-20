<template>
  <v-chart :option="option" autoresize :loading="loading" />
</template>

<script setup lang="ts">
import { use, registerTheme } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
} from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
} from 'echarts/components';
import VChart, { THEME_KEY, LOADING_OPTIONS_KEY } from 'vue-echarts'
import { useThemeVars } from 'naive-ui'
// import theme from './chartTheme.json'

interface IProps {
  option: EchartsOptions
  loading?: boolean
}

const themeVars = useThemeVars()
// registerTheme('dark', theme)
provide(THEME_KEY, 'light')
// provide(LOADING_OPTIONS_KEY, {
//   text: 'loading',
//   color: themeVars.value.primaryColor,
//   textColor: themeVars.value.textColorBase,
//   maskColor: 'rgba(0, 0, 0, 0.5)',
//   //   zlevel: 0,

//   // Font size. Available since `v4.8.0`.
//   fontSize: 12,
//   // Show an animated "spinner" or not. Available since `v4.8.0`.
//   showSpinner: true,
//   // Radius of the "spinner". Available since `v4.8.0`.
//   //   spinnerRadius: 10,
//   // Line width of the "spinner". Available since `v4.8.0`.
//   lineWidth: 5,
//   // Font thick weight. Available since `v5.0.1`.
//   fontWeight: 'normal',
//   // Font style. Available since `v5.0.1`.
//   fontStyle: 'normal',
//   // Font family. Available since `v5.0.1`.
//   fontFamily: 'sans-serif'
// })

use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  SVGRenderer,
  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  ScatterChart,
]);

const {option} = defineProps<IProps>()
onMounted(() => {
  let common: EchartsOptions = {
    yAxis: {
      splitLine: {
        lineStyle: {
          opacity: 0.5
        }
      }
    }
  }
//   console.log(Object.assign(option, common))
})
</script>

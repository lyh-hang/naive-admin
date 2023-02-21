<script setup lang="ts">
import { useCharts, ECOption } from '@/utils/echarts'
import { People, LogoYen, Cart, DocumentText } from '@vicons/ionicons5'
import { Ref } from 'vue'
import { reqDashboardData, Chart } from '@/api/dashboard'

const storeInfo = [
  {
    id: 1,
    comp: People,
    desc: '访问人数',
    count: 12039,
    name: 'newVisits',
    color: ['color-green', 'group-hover:bg-green']
  },
  {
    id: 2,
    comp: DocumentText,
    desc: '订单数',
    count: 4239,
    name: 'order',
    color: ['color-yellow', 'group-hover:bg-yellow']
  },
  {
    id: 3,
    comp: Cart,
    desc: '加购数量',
    count: 7345,
    name: 'car',
    color: ['color-blue', 'group-hover:bg-blue']
  },
  {
    id: 4,
    comp: LogoYen,
    desc: '购买额',
    count: 6532,
    name: 'purchases',
    color: ['color-red', 'group-hover:bg-red']
  }
]

const storeChart = ref<HTMLDivElement>()
const barChart = ref<HTMLDivElement>()

const chartData = ref<Chart>()

const option = ref<ECOption>({
  xAxis: {
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    axisLine: { show: true },
    splitLine: { lineStyle: { opacity: 0.5, type: 'dashed' } }
  },
  series: [],
  legend: {
    show: true,
    top: 15
  },
  grid: {
    left: 50,
    right: 35,
    bottom: '10%',
    top: '12%'
  },
  color: ['#ee6666', '#5470c6'],
  tooltip: {
    show: true,
    trigger: 'axis'
  }
})

const { setOptions } = useCharts(storeChart as Ref<HTMLDivElement>)
const bar = useCharts(barChart as Ref<HTMLDivElement>)

const currentChart = ref<string>()
const toggleChart = useToggle(currentChart)

watch(currentChart, name => {
  option.value.series = []
  for (const key in chartData.value![name as string]) {
    const item = chartData.value![name as string]
    option.value.series.push({
      type: 'line',
      smooth: true,
      data: item[key],
      name: key
    })
  }
  setOptions(option.value)
})

onMounted(async () => {
  const { data } = await reqDashboardData()
  chartData.value = data
  toggleChart('newVisits')
  var xAxisData = []
  var data1 = []
  var data2 = []
  for (var i = 0; i < 100; i++) {
    xAxisData.push('A' + i)
    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  }
  bar.setOptions({
    legend: {
      data: ['bar', 'bar2']
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      splitLine: {
        show: false
      }
    },
    yAxis: {},
    series: [
      {
        name: 'bar',
        type: 'bar',
        data: data1,
        emphasis: {
          focus: 'series'
        },
        animationDelay: function (idx) {
          return idx * 10
        }
      },
      {
        name: 'bar2',
        type: 'bar',
        data: data2,
        emphasis: {
          focus: 'series'
        },
        animationDelay: function (idx) {
          return idx * 10 + 100
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: number) {
      return idx * 5
    }
  })
  window.addEventListener('', () => {console.log(1);
  })
})

</script>

<template>
  <div class="bg-gray-100 dark:bg-dark-500" h-full>
    <n-scrollbar>
      <n-grid
        p-8
        cols="1 s:2 m:2 l:4 xl:4 2xl:4"
        responsive="screen"
        y-gap="30"
        x-gap="30"
      >
        <n-gi
          v-for="item in storeInfo"
          :key="item.id"
          class="group p-3 bg-white dark:bg-dark-9 flex justify-between items-center cursor-pointer"
          @click="toggleChart(item.name)"
        >
          <n-icon
            :component="item.comp"
            :size="58"
            class="rd-2 group-hover:color-white dark:group-hover:color-dark-9"
            :class="item.color"
          />
          <n-statistic :label="item.desc" tabular-nums>
            <n-number-animation :from="0" :to="item.count" />
          </n-statistic>
        </n-gi>
      </n-grid>
      <div ref="storeChart" h-400px bg-white mx-8 dark:bg-dark-9></div>
      <n-grid p-8 cols="1 s:3" responsive="screen" y-gap="30" x-gap="30">
        <n-gi>
          <n-card :bordered="false" segmented title="Bar Animation Delay">
            <div ref="barChart" h-300px></div>
          </n-card>
        </n-gi>
      </n-grid>
    </n-scrollbar>
  </div>
</template>

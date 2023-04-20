<template>
  <Chart :option="option" :loading="loading" />
</template>

<script setup lang="ts">
const option = ref<EchartsOptions>({
  title: {
    text: 'Traffic Sources',
    left: 'center'
  },
  grid: {
    left: 0,
    top: 0,
    right: 0
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    // splitLine: {
    //     lineStyle: {
    //         opacity: 0.5
    //     }
    // }
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})

const loading = ref(true)

onMounted(() => setTimeout(() => {
    loading.value = false
}, 5000))
</script>

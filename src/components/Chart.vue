<template>
  <div ref="el" h-500px></div>
</template>

<script setup lang="ts">
import { Charts, chartInit, ECOption } from '@/utils/echarts'

interface Props {
  ECOption: ECOption
}

const el = ref<HTMLDivElement>()
const chart = shallowRef<Charts>()

const props = defineProps<Props>()

function resize() {
  chart.value?.resize()
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})

onMounted(() => {
  chart.value = chartInit(el.value!)
  chart.value?.setOption(props.ECOption)
  window.addEventListener('resize', resize)
})
</script>

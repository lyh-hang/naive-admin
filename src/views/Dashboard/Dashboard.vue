<script setup lang="ts">
import ControlPanel from './components/ControlPanel.vue'
</script>

<template>
  <n-card h-full embedded :bordered="false">
    <ControlPanel />
    <Chart h-300px />
  </n-card>
</template>

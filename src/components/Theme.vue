<script setup lang="ts">
import { theme, toggleTheme } from '@/composables/theme'

const { size } = defineProps({
  size: {
    type: [Number, String],
    default: 20
  }
})
</script>

<template>
  <n-icon
    class="center cursor-pointer select-none"
    :size="size"
    @click="toggleTheme"
  >
    <ViconSunnyOutline v-show="theme === null" />
    <ViconMoonOutline v-show="theme !== null" />
  </n-icon>
</template>

<script setup lang="ts">
import { theme, toggleDark } from '@/composables/theme'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'

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
    @click="toggleDark()"
  >
    <SunnyOutline v-show="theme === null" />
    <MoonOutline v-show="theme !== null" />
  </n-icon>
</template>

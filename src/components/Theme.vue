<script setup lang="ts">
import { theme, toggleDark } from '@/composables/theme'

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
    <icon-ion:sunny-outline v-show="theme === null" />
    <icon-ion:moon-outline v-show="theme !== null" />
  </n-icon>
</template>

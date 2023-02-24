<script setup lang="ts">
import { theme } from '@/composables/theme'
</script>

<template>
  <slot
    :classList="[
      { 'hover-bg-white': theme },
      { 'hover-bg-black': !theme },
      'center',
      'h-full',
      'hover-bg-op-10'
    ]"
  />
</template>

<script setup lang="ts">
import { theme } from './composables/theme'
</script>

<template>
  <n-config-provider abstract :theme="theme">
    <n-message-provider>
      <RouterView />
      <n-global-style />
    </n-message-provider>
  </n-config-provider>
</template>

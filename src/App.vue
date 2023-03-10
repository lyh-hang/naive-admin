<script setup lang="ts">
import { theme, themeOverrides } from './composables/theme'
import { language } from './locales'
</script>

<template>
  <n-config-provider abstract :theme="theme" :theme-overrides="themeOverrides" v-bind="language">
    <n-message-provider>
      <RouterView />
      <n-global-style />
    </n-message-provider>
  </n-config-provider>
</template>

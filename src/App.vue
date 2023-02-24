<script setup lang="ts">
import { theme } from './composables/theme'
import { language } from './locales'
</script>

<template>
  <n-config-provider
    abstract
    :theme="theme"
    :locale="language.locale"
    :date-locale="language.dateLocale"
  >
    <n-message-provider>
      <RouterView />
      <n-global-style />
    </n-message-provider>
  </n-config-provider>
</template>

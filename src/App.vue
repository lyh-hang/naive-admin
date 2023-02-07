<script setup lang="ts">
import { enUS, dateEnUS, zhCN, dateZhCN } from 'naive-ui'
import { theme } from './composables/theme'
const { locale } = useI18n()

const language = computed(() => ({
  locale: locale.value === 'en' ? enUS : zhCN,
  dateLocale: locale.value === 'en' ? dateEnUS : dateZhCN
}))
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

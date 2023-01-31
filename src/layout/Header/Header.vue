<script setup lang="ts">
import { theme, toggleTheme } from '@/composables/theme'

const { t, locale } = useI18n()
const router = useRouter()
const breadcrumbs = computed(() =>
  router.currentRoute.value.matched.filter(i => i.name)
)

function languageToggle() {
  locale.value = locale.value === 'en' ? 'zh-CN' : 'en'
}
</script>

<template>
  <n-layout-header
    class="header-container flex items-center pl-4 pr-4 justify-between"
  >
    <n-breadcrumb>
      <n-breadcrumb-item
        v-show="router.currentRoute.value.path !== '/'"
        @click="router.push('/')"
      >
        {{ t(`layout.Dashboard`) }}
      </n-breadcrumb-item>
      <n-breadcrumb-item
        v-for="b in breadcrumbs"
        :key="b.name"
        @click="router.push({ name: b.name })"
      >
        {{ t(`layout.${String(b.name)}`) }}
      </n-breadcrumb-item>
    </n-breadcrumb>
    <div class="flex items-center">
      <n-icon
        class="ml-4 cursor-pointer select-none"
        :size="20"
        @click="toggleTheme"
      >
        <ViconSunnyOutline v-show="theme === null" />
        <ViconMoonOutline v-show="theme !== null" />
      </n-icon>
      <n-icon
        class="ml-4 cursor-pointer select-none"
        :size="20"
        @click="languageToggle"
      >
        <ViconLanguage />
      </n-icon>
      <n-avatar class="ml-4 cursor-pointer select-none" size="medium">
        avatar
      </n-avatar>
    </div>
  </n-layout-header>
</template>

<style scoped lang="scss">
.header-container {
  height: 50px;
  border-bottom: 1px solid var(--n-border-color);
}
</style>

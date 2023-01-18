<script setup lang="ts">
import { Component } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import * as vicons from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'

const router = useRouter()
const routes = router.getRoutes()
console.log(routes)

const current = computed(() => router.currentRoute.value.path)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = routes
  .filter(route => route.meta.menu)
  .map(i => ({
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: i.path
          }
        },
        { default: () => i.meta.title }
      ),
    icon: renderIcon((vicons as { [key: string]: any })[i.meta.icon as string]),
    key: i.path
  }))
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    h-screen
    :native-scrollbar="false"
  >
    <n-menu
      :value="current"
      :accordion="true"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

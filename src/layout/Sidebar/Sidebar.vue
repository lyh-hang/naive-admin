<script setup lang="ts">
import { Component } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import * as vicons from '@vicons/ionicons5'
import { RouteRecordNormalized, RouteRecordRaw, RouterLink } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const routes = router.getRoutes()

const current = computed(() => {
  const pathArr = router.currentRoute.value.path.split('/')
  return pathArr[pathArr.length - 1]
})

function renderIcon(icon: Component) {
  return icon ? () => h(NIcon, null, { default: () => h(icon) }) : undefined
}

function routes2MenuOption(
  routes: RouteRecordNormalized[] | RouteRecordRaw[]
): MenuOption[] {
  return routes.map(route => {
    const label = route.children?.length
      ? () => t(`layout.${String(route.name)}`)
      : () =>
          h(
            RouterLink,
            {
              to: {
                name: route.name
              }
            },
            { default: () => t(`layout.${String(route.name)}`) }
          )
    const key = route.path.replace('/', '')
    const icon = renderIcon(
      (vicons as { [key: string]: any })[route.meta?.icon as string]
    )
    const children = route.children?.length
      ? routes2MenuOption(route.children)
      : undefined
    return {
      label,
      key,
      icon,
      children
    }
  })
}

const menuOptions: MenuOption[] = routes2MenuOption(
  routes.filter(i => i.meta.menu)
)
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

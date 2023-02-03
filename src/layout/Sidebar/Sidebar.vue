<script setup lang="ts">
import { Component } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import * as vicons from '@vicons/ionicons5'
import { RouteRecordNormalized, RouteRecordRaw, RouterLink } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const routes = router.getRoutes()

const isCollapsed = ref<boolean>(false)

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

function collapsedHandle(collapsed: boolean) {
  isCollapsed.value = collapsed
}

function resizeHandle(e: UIEvent) {
  const rect = document.body.getBoundingClientRect()
  if(rect.width < 992) {
    isCollapsed.value = true
  }
}

onBeforeMount(() => {
  window.addEventListener('resize', resizeHandle)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandle)
})
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    :collapsed="isCollapsed"
    collapse-mode="width"
    :collapsed-width="64"
    h-full
    :native-scrollbar="false"
    :on-update:collapsed="collapsedHandle"
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

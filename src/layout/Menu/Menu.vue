<script setup lang="ts">
import { MenuOption } from 'naive-ui'
import { RouteRecordNormalized, RouteRecordRaw, RouterLink } from 'vue-router'
import { renderIcon, renderCustomIcon } from '@/utils/icon'

interface IProps {
  mode?: 'vertical' | 'horizontal'
  inverted: boolean
}

const router = useRouter()
const routes = router.getRoutes()
const { t } = useI18n()

const props = withDefaults(defineProps<IProps>(), {
  mode: 'vertical'
})

const current = computed(() => {
  const pathArr = router.currentRoute.value.path.split('/')
  return pathArr[pathArr.length - 1]
})

function getIcon(meta: any) {
  if (meta.icon) return renderIcon(meta.icon as string, { size: 20 })
  if (meta.customIcon)
    return renderCustomIcon(meta.customIcon as string, { size: 20 })
  return undefined
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
            { to: { name: route.name } },
            { default: () => t(`layout.${String(route.name)}`) }
          )

    const key = route.path.replace('/', '')
    const icon = getIcon(route.meta)

    const children = route.children?.length
      ? routes2MenuOption(route.children)
      : undefined

    return { label, key, icon, children }
  })
}

const menuOptions: MenuOption[] = routes2MenuOption(
  routes.filter(i => i.meta.menu)
)
</script>

<template>
  <n-menu
    :mode="props.mode"
    :value="current"
    :accordion="true"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :inverted="props.inverted"
  />
</template>

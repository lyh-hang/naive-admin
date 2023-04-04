<script lang="ts" setup>
import { renderCustomIcon, renderIcon } from '@/utils/icon';

const router = useRouter()
const { t } = useI18n()

const breadcrumbs = computed(() =>
  router.currentRoute.value.matched.filter(i => i.name)
)

function getIcon(meta: any) {
  if (meta.icon) return renderIcon(meta.icon as string, { size: 16 })
  if (meta.customIcon)
    return renderCustomIcon(meta.customIcon as string, { size: 16 })
  return undefined
}
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-show="router.currentRoute.value.path !== '/'" @click="router.push('/')">
      <component :is="renderIcon('ion:speedometer-outline')" />
      {{ t(`layout.Dashboard`) }}
    </n-breadcrumb-item>
    <n-breadcrumb-item v-for="b in breadcrumbs" :key="b.name" @click="router.push({ name: b.name })">
      <component :is="getIcon(b.meta)" />
      {{ t(`layout.${String(b.name)}`) }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

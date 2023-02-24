<script lang="ts" setup>
const router = useRouter()
const { t } = useI18n()

const breadcrumbs = computed(() =>
  router.currentRoute.value.matched.filter(i => i.name)
)
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-show="router.currentRoute.value.path !== '/'" @click="router.push('/')">
      {{ t(`layout.Dashboard`) }}
    </n-breadcrumb-item>
    <n-breadcrumb-item v-for="b in breadcrumbs" :key="b.name" @click="router.push({ name: b.name })">
      {{ t(`layout.${String(b.name)}`) }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

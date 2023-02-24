<script setup lang="ts">
const layoutStore = useLayoutStore()
</script>

<template>
  <n-icon :size="20" @click="() => layoutStore.setSidebar(!layoutStore.sidebar)">
    <SvgMenufoldOutlined v-show="layoutStore.sidebar" />
    <SvgMenuUnfoldOutlined v-show="!layoutStore.sidebar" />
  </n-icon>
</template>

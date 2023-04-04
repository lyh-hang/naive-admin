<script setup lang="ts">
const layout = useLayoutStore()
</script>

<template>
  <n-icon :size="20" @click="() => layout.setSidebar(!layout.sidebar)">
    <icon-ant-design:menu-fold-outlined v-show="layout.sidebar" />
    <icon-ant-design:menu-unfold-outlined v-show="!layout.sidebar" />
  </n-icon>
</template>

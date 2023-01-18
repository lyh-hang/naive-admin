<script setup lang="ts">
const nameRef = ref(1)
const message = window.$message
const panelsRef = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
function handleClose(name: number) {
  const { value: panels } = panelsRef
  if (panels.length === 1) {
    message.error('最后一个了')
    return
  }
  message.info('关掉 ' + name)
  const index = panels.findIndex(v => name === v)
  panels.splice(index, 1)
  if (nameRef.value === name) {
    nameRef.value = panels[index]
  }
}
</script>

<template>
  <n-layout-header class="tabs p-1 pl-4">
    <n-tag size="small" type="primary" cursor-pointer>首页</n-tag>
    <n-tag size="small" class="ml-2 cursor-pointer" closable>登录</n-tag>
  </n-layout-header>
</template>

<style scoped lang="scss">
.tabs {
  border-bottom: 1px solid var(--n-border-color);
}
</style>

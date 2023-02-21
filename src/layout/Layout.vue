<script setup lang="ts">
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'
import Tabs from './Tabs/Tabs.vue'

onMounted(() => {
  const resizeObserver = new ResizeObserver((entries, observer) => {
    console.log(entries)
    console.log('-------------')
    console.log(observer)
  })
  resizeObserver.observe(document.querySelector('.layout-wrap') as Element)
})
</script>

<template>
  <div class="layout">
    <n-layout h-full has-sider>
      <Sidebar />
      <n-layout h-full>
        <Header />
        <Tabs />
        <n-layout-content class="layout-wrap">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" :key="$route.path" />
            </Transition>
          </RouterView>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .layout-wrap {
    width: 100%;
    height: calc(100% - 82px);
  }
}
</style>

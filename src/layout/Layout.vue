<script setup lang="ts">
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'
import Tabs from './Tabs/Tabs.vue'
</script>

<template>
  <div class="layout">
    <n-layout has-sider>
      <Sidebar />
      <n-layout>
        <Header />
        <Tabs />
        <n-layout-content class="layout-wrap">
          <RouterView />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .layout-wrap {
    width: 100%;
    height: calc(100% - 82px);
  }
}
</style>

<script setup lang="ts">
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'
import Tabs from './Tabs/Tabs.vue'
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
              <Suspense>
                <component :is="Component" :key="$route.path" />
                <template #fallback>
                  <n-spin
                    class="h-full flex justify-center items-center"
                    size="large"
                    description="loading..."
                  />
                </template>
              </Suspense>
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
  overflow: hidden;
  .layout-wrap {
    width: 100%;
    height: calc(100% - 82px);
    overflow: hidden;
  }
}
</style>

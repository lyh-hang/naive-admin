<script setup lang="ts">
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'
import Tabs from './Tabs/Tabs.vue'
import Setting from './Setting/Setting.vue'

const route = useRoute()
const layoutStore = useLayoutStore()

function isMobile() {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < 992
}

function resizeHandle() {
  layoutStore.setDevice(isMobile() ? 'mobile' : 'desktop')  
}

watch(route, () => {
  if(layoutStore.device === 'mobile' && layoutStore.sidebar) layoutStore.setSidebar(false)
})

onBeforeMount(() => window.addEventListener('resize', resizeHandle))

onMounted(() => resizeHandle())

onUnmounted(() => window.removeEventListener('resize', resizeHandle))
</script>

<template>
  <n-layout h-full has-sider>
    <Sidebar />
    <n-layout h-full>
      <Header inverted />
      <Tabs v-if="layoutStore.tags" />
      <n-layout-content class="layout-wrap">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path" />
          </Transition>
        </RouterView>
      </n-layout-content>
    </n-layout>
    <Setting />
  </n-layout>
</template>

<style lang="scss" scoped>
.layout-wrap {
  width: 100%;
  height: calc(100% - 82px);
}
</style>

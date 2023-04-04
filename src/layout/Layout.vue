<script setup lang="ts">
import Menu from './Menu/Menu.vue'
import Header from './Header/Header.vue'
import Tabs from './Tabs/Tabs.vue'
import Setting from './Setting/Setting.vue'
import Logo from './Logo/Logo.vue'

const route = useRoute()
const layout = useLayoutStore()

function isMobile() {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < 992
}

function resizeHandle() {
  if(isMobile()) {
    layout.setMenuMode('left')
  }
  layout.setDevice(isMobile() ? 'mobile' : 'desktop')
}

watch(
  route,
  () => layout.device === 'mobile' && layout.sidebar && layout.setSidebar(false)
)

onBeforeMount(() => window.addEventListener('resize', resizeHandle))

onMounted(() => resizeHandle())

onUnmounted(() => window.removeEventListener('resize', resizeHandle))
</script>

<template>
  <n-layout h-full has-sider>
    <!-- 大屏模式导航 -->
    <n-layout-sider
      v-if="layout.device === 'desktop' && layout.menuMode !== 'top'"
      bordered
      :collapsed="layout.sidebar"
      collapse-mode="width"
      :collapsed-width="64"
      :native-scrollbar="false"
      h-full
      :inverted="layout.menuStyle !== 'lightSide'"
    >
      <Logo v-if="layout.logo" :collapsed="layout.sidebar" />
      <Menu :inverted="layout.menuStyle !== 'lightSide'" />
    </n-layout-sider>
    <!-- 主体 -->
    <n-layout h-full>
      <!-- 顶部栏 -->
      <Header />
      <!-- 标签页 -->
      <Tabs v-if="layout.tags" />
      <!-- 路由 -->
      <n-layout-content class="layout-wrap">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path" />
          </Transition>
        </RouterView>
      </n-layout-content>
    </n-layout>
    <Setting />
    <!-- 小屏模式导航 -->
    <n-drawer
      v-if="layout.device === 'mobile'"
      placement="left"
      v-model:show="layout.sidebar"
      default-height="100%"
      :on-update:show="layout.setSidebar"
    >
      <n-drawer-content body-content-style="padding: 0">
        <n-layout-sider position="absolute" :inverted="layout.menuStyle !== 'lightSide'">
          <Menu :inverted="layout.menuStyle !== 'lightSide'" />
        </n-layout-sider>
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<style lang="scss" scoped>
.layout-wrap {
  width: 100%;
  height: calc(100% - 82px);
}
</style>

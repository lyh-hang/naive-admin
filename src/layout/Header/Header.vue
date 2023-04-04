<script setup lang="ts">
import Menu from '../Menu/Menu.vue'
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import RightMenu from './components/RightMenu.vue'
import IconWrap from './components/IconWrap.vue'
import Logo from '../Logo/Logo.vue'

const layout = useLayoutStore()
const { menuStyle, menuMode, device, logo } = toRefs(layout)
</script>

<template>
  <n-layout-header :inverted="menuStyle === 'darkHead'" class="relative flex items-center h-50px border-bottom-1">
    <IconWrap v-if="menuMode !== 'top'" #default="{ classList }">
      <Hamburger :class="classList" class="absolute left-0 w-50px cursor-pointer select-none" />
    </IconWrap>

    <Breadcrumb v-if="menuMode === 'left' && device === 'desktop'" absolute left-50px />

    <div absolute left-150px flex items-center>
      <Logo v-if="menuMode === 'top' && logo" />
      <Menu v-if="menuMode !== 'left'" mode="horizontal" :inverted="menuStyle === 'darkHead'" />
    </div>

    <RightMenu class="absolute right-0 top-0" />
  </n-layout-header>
</template>

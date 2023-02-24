<script setup lang="ts">
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import RightMenu from './components/RightMenu.vue'
import IconWrap from './components/IconWrap.vue'
</script>

<template>
  <n-layout-header class="relative h-50px center border-bottom-1">
    <IconWrap #default="{classList}">
      <Hamburger :class="classList" class="absolute left-0 w-50px cursor-pointer select-none" />
    </IconWrap>

    <Breadcrumb class="absolute left-50px" />

    <RightMenu class="absolute right-0" />
  </n-layout-header>
</template>

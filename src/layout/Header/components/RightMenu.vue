<script setup lang="ts">
import IconWrap from './IconWrap.vue'
import { toggleFullscreen, isFullscreen } from '@/composables/fullscreen'
import { DropdownOption } from 'naive-ui'
import { ExpandOutline, ContractOutline } from '@vicons/ionicons5'
import img from '@/assets/avatar.jpg'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const options = ref<DropdownOption[]>([
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Dashboard' }),
    key: 1
  },
  {
    label: () => h('a', { href: 'https://github.com/lyh-hang/naive-admin', target: '_blank' }, { default: () => 'GitHub' }),
    key: 2
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: () => 'logout',
    key: 3,
    props: {
      onClick: userStore.logout
    }
  }
])
</script>

<template>
  <div center h-full>
    <IconWrap v-if="layoutStore.device === 'desktop'" #default="{ classList }">
      <n-icon
        :size="20"
        @click="toggleFullscreen"
        :class="classList"
        cursor-pointer
        w-35px
      >
        <ExpandOutline v-show="!isFullscreen" />
        <ContractOutline v-show="isFullscreen" />
      </n-icon>
    </IconWrap>
    <IconWrap #default="{ classList }">
      <Theme :class="classList" w-35px />
    </IconWrap>
    <n-dropdown trigger="click" show-arrow :options="options">
      <n-avatar
        cursor-pointer
        mx-2
        size="medium"
        object-fit="cover"
        :src="img"
      />
    </n-dropdown>
  </div>
</template>

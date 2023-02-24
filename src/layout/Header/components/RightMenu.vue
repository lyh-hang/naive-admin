<script setup lang="ts">
import IconWrap from './IconWrap.vue'
import { toggleFullscreen, isFullscreen } from '@/composables/fullscreen'
import { DropdownOption } from 'naive-ui'
import { ExpandOutline, ContractOutline } from '@vicons/ionicons5'
import img from '@/assets/avatar.jpg'

const { t } = useI18n()
const userStore = useUserStore()
const layoutStore = useLayoutStore()
const options = ref<DropdownOption[]>([
  {
    label: () => t('layout.git'),
    key: 1
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: () => t('layout.logout'),
    key: 2
  }
])
function handleSelect(key: string | number) {
  switch (key) {
    case 1:
      window.open('https://github.com/lyh-hang/naive-admin')
      break
    case 2:
      userStore.logout()
      break
    default:
      break
  }
}
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
    <IconWrap #default="{ classList }">
      <Language :class="classList" w-35px />
    </IconWrap>
    <n-dropdown trigger="click" show-arrow :options="options" @select="handleSelect">
      <n-avatar cursor-pointer mx-2 size="medium" object-fit="cover" :src="img" />
    </n-dropdown>
  </div>
</template>

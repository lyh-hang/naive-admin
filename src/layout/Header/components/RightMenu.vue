<script setup lang="ts">
import IconWrap from './IconWrap.vue'
import { toggleFullscreen, isFullscreen } from '@/composables/fullscreen'
import { DropdownOption } from 'naive-ui'
import { ExpandOutline, ContractOutline } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const { t } = useI18n()

const options = ref<DropdownOption[]>([
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => t('layout.Dashboard') }),
    key: 1
  },
  {
    label: () => h('a', { href: 'https://github.com/lyh-hang/naive-admin', target: '_blank' }, { default: () => t('layout.git') }),
    key: 2
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: () => t('layout.logout'),
    key: 3,
    props: {
      onClick: userStore.logout
    }
  }
])
</script>

<template>
  <div center h-full mr-4>
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
      <Language :class="classList" w-35px />
    </IconWrap>
    <n-dropdown trigger="click" show-arrow :options="options">
      <div h-full cursor-pointer>
        <IconWrap #default="{ classList }">
          <div :class="classList"  px-2>
            <n-avatar
              size="small"
              round
              object-fit="cover"
              :src="userStore.avatar"
            />
            <span pl-1>{{ userStore.username }}</span>
          </div>
        </IconWrap>
      </div>
    </n-dropdown>
  </div>
</template>
